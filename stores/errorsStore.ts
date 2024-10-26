export const useErrorsStore = defineStore('errorsStore', () => {
  const errors = ref([]);
  const lastError = ref(null);

  function emitError(error) {
    errors.value = [...errors.value, error];
    lastError.value = error;
  }

  return { errors, lastError, emitError };
});
