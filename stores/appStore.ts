export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      isDark: useDark(),
      isInit: false,
      isAsideOpen: false,
    };
  },
  actions: {
    toggleColorScheme() {
      this.isDark = !this.isDark;
    },
    toggleAside() {
      this.isAsideOpen = !this.isAsideOpen;
    },
    setDark() {
      this.isDark = true;
    },
    setLight() {
      this.isDark = false;
    },
    setInitComplete() {
      this.isInit = true;
    },
  },
  hydrate(state, initialState) {
    state.isDark = useDark().value;
  },
});
