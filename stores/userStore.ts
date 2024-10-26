import { useLocalStorage } from '@vueuse/core';

export const useUserStore = defineStore('userStore', () => {
  const route = useRoute();

  const isAuthorized = ref(false);
  const user = ref(null);
  const type = ref(null);
  const id = ref(null);
  const token = ref<string | null>();
  const loading = ref(false);

  const profileData = ref({});

  const getProfileData = async (token: string) => {
    return await useAPI('/api/public/profile', {
      options: {
        method: 'GET',
        // headers: { token },
      },
      auth: true,
    });
  };

  const resetData = () => {
    isAuthorized.value = false;
    user.value = null;
    type.value = null;
    id.value = null;
    token.value = null;
    profileData.value = {};
  };

  async function init() {
    try {
      const auth = JSON.parse(localStorage.getItem('Auth') || '');
      if (auth && auth.token) {
        isAuthorized.value = true;
        user.value = auth.login;
        type.value = auth.type;
        id.value = auth._id;
        token.value = auth.token;
        const resp = await getProfileData(token.value);
        profileData.value = resp.result;
      }
    } catch (error) {
      logOut();
      console.log(error);
    }
  }

  async function register({
    login,
    email,
    password,
  }: {
    login: string;
    email: string;
    password: string;
  }) {
    loading.value = true;
    const referer = useLocalStorage('referer', null);
    const { data, error } = await useAPI<any>('/api/public/auth/register', {
      options: {
        method: 'POST',
        body: {
          login,
          email,
          password,
          referal: referer.value || null,
        },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) {
      resetData();
      throw new Error(error.value.data);
    }

    token.value = data.value.token;
    useCookie('Auth').value = token.value;
    isAuthorized.value = true;
    user.value = data.value.login;
    type.value = data.value.type;
    id.value = data.value._id;
    if (!token.value) return;
    const resp = await getProfileData(token.value);
    profileData.value = resp.result;
  }

  async function logIn({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) {
    loading.value = true;
    const { data, error } = await useAPI<any>('/api/public/auth/login', {
      options: {
        method: 'POST',
        body: {
          login,
          password,
        },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) {
      resetData();
      throw new Error(error.value.data);
    }

    token.value = data.value.token;
    useCookie('Auth').value = token.value;
    isAuthorized.value = true;
    user.value = data.value.login;
    type.value = data.value.type;
    id.value = data.value._id;
    if (!token.value) return;
    const resp = await getProfileData(token.value);
    profileData.value = resp.result;
  }

  async function editProfile(body) {
    loading.value = true;
    const { data, error } = await useAPI<any>('/api/public/profile', {
      options: {
        method: 'POST',
        body,
        // headers: { token: token.value },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) {
      throw new Error(error.value.data);
    }

    const resp = await getProfileData(token.value);
    profileData.value = resp.result;
  }

  async function restore({ email }: { email: string }) {
    loading.value = true;
    const { data, error } = await useAPI<any>('/api/public/auth/restore', {
      options: {
        method: 'POST',
        body: {
          email,
        },
      },
      auth: true,
    });
    loading.value = false;
    if (error.value) throw new Error(error.value.data);
  }

  async function sendOutputFormData(body) {
    loading.value = true;
    const { data, error } = await useAPI<any>(
      '/api/public/profile/balance-output',
      {
        options: {
          method: 'POST',
          body,
          // headers: { token: token.value },
        },
        auth: true,
      },
    );
    loading.value = false;
    if (error.value) {
      throw new Error(error.value.data);
    }
    if (!token.value) return;
    const resp = await getProfileData(token.value);
    profileData.value = resp.result;
  }

  function logOut() {
    useCookie('Auth').value = null;
    resetData();
    if (route.name === 'profile') return navigateTo({ path: `/` });
  }

  return {
    isAuthorized,
    user,
    type,
    id,
    token,
    loading,
    profileData,
    register,
    logIn,
    logOut,
    restore,
    init,
    editProfile,
    sendOutputFormData,
  };
});
