export const useReviewsStore = defineStore('reviewsStore', () => {
  const rawResponse = ref(null);
  const reviews = ref([]);
  const loading = ref(false);
  const page = ref(1);
  const totalPages = ref(null);
  const nextPage = ref(null);
  const prevPage = ref(null);
  const totalDocs = ref(null);
  const limit = ref(10);
  const sort = ref('-_id');
  const fullName = ref('');
  const description = ref('');

  async function getReviews() {
    loading.value = true;
    const { data, error } = await useAPI<any>('/api/public/reviews/paginated', {
      options: {
        params: {
          page: page.value,
          limit: limit.value,
          sort: sort.value,
        },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) throw new Error(error.value.data);

    rawResponse.value = data.value;
    reviews.value = data.value.docs;
    page.value = data.value.page;
    limit.value = data.value.limit;
    totalPages.value = data.value.totalPages;
    nextPage.value = data.value.nextPage;
    prevPage.value = data.value.prevPage;
    totalDocs.value = data.value.totalDocs;

    return data.value;
  }

  async function postReview() {
    loading.value = true;
    const { data, error } = await useAPI<any>('/api/public/reviews', {
      options: {
        method: 'POST',
        body: {
          fullName: fullName.value,
          description: description.value,
        },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) throw new Error(error.value.data);

    fullName.value = '';
    description.value = '';
    page.value = 1;
    await getReviews();
  }

  async function goToPage(p: number) {
    if (p < 0 || p > totalPages.value) return;
    page.value = p;
    await getReviews();
  }

  return {
    rawResponse,
    reviews,
    loading,
    page,
    limit,
    sort,
    totalPages,
    nextPage,
    prevPage,
    totalDocs,
    fullName,
    description,
    getReviews,
    goToPage,
    postReview,
  };
});
