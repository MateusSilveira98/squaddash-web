import service from '@/store/services';
import Utils from '@/utils/index';

const state = {
  loggedUser: {}
}
const mutations = {
  'GET_USER'(state, { loggedUser }) {
    state.loggedUser = loggedUser;
  }
}
const actions = {
  async login({ commit }, payload) {
    commit('LOADING');
    let response = await service.post('user/login', payload);
    response = response.data;
    if (response.id) {
      commit('LOADING');
      Utils.localstorage.set('token', response.token);
      delete response.token;
      Utils.localstorage.set('user', response);
      commit('SUCCESS');
    } else {
      commit('LOADING');
      commit('PUSH_NOTIFICATION');
      commit('FAIL_MESSAGE', { response });
    }

  },
  async login({ commit }, payload) {
    commit('LOADING');
    let response = await service.post('user/login', payload);
    response = response.data;
    if (response.id) {
      commit('LOADING');
      Utils.localstorage.set('token', response.token);
      delete response.token;
      Utils.localstorage.set('user', response);
      commit('SUCCESS');
    } else {
      commit('LOADING');
      commit('PUSH_NOTIFICATION');
      commit('FAIL_MESSAGE', { response });
    }

  },
  async editUser({commit}, {payload, url}) {
    commit('LOADING');
    let response = await service.edit(url, payload);
    Utils.localstorage.set('user', response.data.payload);
    Utils.callback(commit, response.data);
  },
  async getLoggedUser({ commit }) {
    const loggedUser = Utils.localstorage.get('user');
    commit('GET_USER', { loggedUser });
  }
}

export default { state, mutations, actions }