import service from '@/store/services';
import Utils from '@/utils/index';

const state = {
  loggedUser: {},
  all: []
}
const mutations = {
  'GET_USER'(state, { loggedUser }) {
    state.loggedUser = loggedUser;
  },
  'GET_ALL_USER'(state, { result }) {
    state.all = result;
  }
}
const actions = {
  async getAllUsers({commit}, id) {
    commit('LOADING');
    let response = await service.getById('/users', id);
    commit('GET_ALL_USER', {result: response.data});
    commit('LOADING');
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