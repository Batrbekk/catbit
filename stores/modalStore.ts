import ModalSignUp from '~/components/Modals/ModalSignUp.vue';
import ModalSignIn from '~/components/Modals/ModalSignIn.vue';
import ModalRestorePass from '~/components/Modals/ModalRestorePass.vue';
import ModalConfirmCancelOrder from '~/components/Modals/ModalConfirmCancelOrder.vue';

export const useModalStore = defineStore('modalStore', () => {
  const opened = ref(null);
  const modals = {
    ModalSignUp: {
      component: ModalSignUp,
      bind: {
        name: 'ModalSignUp',
      },
      on: {
        // event by custom-modal
        confirm(close) {
          console.log('confirm');
          close();
        },
        cancel(close) {
          console.log('cancel');
          close();
        },
        // event by vue-final-modal
        // 'click-outside'() {
        //   console.log('@click-outside')
        // },
        // 'before-open'() {
        //   console.log('@before-open')
        // },
        opened() {
          opened.value = 'ModalSignUp';
        },
        'before-close'() {
          opened.value = null;
        },
        // closed() {
        // }
      },
    },
    ModalSignIn: {
      component: ModalSignIn,
      bind: {
        name: 'ModalSignIn',
      },
      on: {
        // event by custom-modal
        confirm(close) {
          console.log('confirm');
          close();
        },
        cancel(close) {
          console.log('cancel');
          close();
        },
        // event by vue-final-modal
        // 'click-outside'() {
        //   console.log('@click-outside')
        // },
        // 'before-open'() {
        //   console.log('@before-open')
        // },
        opened() {
          opened.value = 'ModalSignIn';
        },
        'before-close'() {
          opened.value = null;
        },
        // closed() {
        // }
      },
    },
    ModalRestorePass: {
      component: ModalRestorePass,
      bind: {
        name: 'ModalRestorePass',
      },
      on: {
        // event by custom-modal
        confirm(close) {
          console.log('confirm');
          close();
        },
        cancel(close) {
          console.log('cancel');
          close();
        },
        // event by vue-final-modal
        // 'click-outside'() {
        //   console.log('@click-outside')
        // },
        // 'before-open'() {
        //   console.log('@before-open')
        // },
        opened() {
          opened.value = 'ModalRestorePass';
        },
        'before-close'() {
          opened.value = null;
        },
        // closed() {
        // }
      },
    },
    ModalConfirmCancelOrder: {
      component: ModalConfirmCancelOrder,
      bind: {
        name: 'ModalConfirmCancelOrder',
      },
      on: {
        // event by custom-modal
        confirm(close) {
          console.log('confirm');
          close();
        },
        cancel(close) {
          console.log('cancel');
          close();
        },
        // event by vue-final-modal
        // 'click-outside'() {
        //   console.log('@click-outside')
        // },
        // 'before-open'() {
        //   console.log('@before-open')
        // },
        opened() {
          opened.value = 'ModalConfirmCancelOrder';
        },
        'before-close'() {
          opened.value = null;
        },
        // closed() {
        // }
      },
    },
  };

  function openModal(component: string | number) {}
  function closeAllModals() {}

  return { opened, openModal, closeAllModals };
});
