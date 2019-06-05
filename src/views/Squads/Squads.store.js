import service from '@/store/services';
const state = {
  all: []
}
const mutations = {
  'GET_ALL_SQUADS'(state, {result}) {
    state.all = result;
  }
}
const actions = {
 async getAllSquads({commit}) {
    commit('LOADING');
    let response = await service.getAll('/squads');
    commit('GET_ALL_SQUADS', {result: response.data});
    commit('LOADING');
  }
}

export default { state, mutations, actions }
