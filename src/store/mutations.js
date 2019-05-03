export default {
  'LOADING'(state) {
    state.loading = !state.loading;
  },
  'SUCCESS'(state) {
    state.success = true;
    setTimeout(() => {
      state.success = false;
    }, 500);
  },
  'PUSH_NOTIFICATION'(state) {
    state.toNotify = true;
    setTimeout(() => {
      state.toNotify = false;
    }, 500);
  },
  'IMAGE_UPLOADED_SUCCESS'(state, { image }) {
    state.image = image.data;
  },
  'IMAGE_UPLOADED_FAIL'(state) {
    state.image = 'Falha ao fazer o upload';
  },
  'SUCCESS_MESSAGE'(state, { response }) {
    state.message = response.message;
    state.messageClass = 'success';
  },
  'FAIL_MESSAGE'(state, { response }) {
    state.message = response.message;
    state.messageClass = 'danger';
  }
}
