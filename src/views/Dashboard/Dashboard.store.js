import service from '@/store/services';

const state = {
  reports: {}
}
const mutations = {
  'GET_ALL_REPORTS'(state, { result }) {
    state.reports = result;
  }
}
const actions = {
  async getAllReports({ commit }) {
    let response = await service.getAll('/reports');
    commit('GET_ALL_REPORTS', { result: response.data });
  }
}

export default { state, mutations, actions }