import service from '@/store/services';
const state = {
  all: []
}
const mutations = {
  'GET_ALL_CLIENTS'(state, {result}) {
    state.all = result;
  }
}
const actions = {
 async getAllClients({commit}) {
    commit('LOADING');
    let response = await service.getAll('/clients');
    commit('GET_ALL_CLIENTS', {result: response.data});
    commit('LOADING');
  }
}

export default { state, mutations, actions }
