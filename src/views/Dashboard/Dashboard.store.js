import service from '@/store/services';

const state = {
  reports: {},
  costsByYear: 0
}
const mutations = {
  'GET_ALL_REPORTS'(state, { result }) {
    state.reports = result;
  },
  'GET_COSTS_BY_YEAR'(state, {result}) {
    state.costsByYear = result;
  }
}
const actions = {
  async getAllReports({ commit }) {
    let response = await service.getAll('/reports');
    commit('GET_ALL_REPORTS', { result: response.data });
  },
  async getCostsByYear({ commit }, year) {
    let response = await service.getAll(`/reports/currency/${year}`);
    commit('GET_COSTS_BY_YEAR', { result: response.data });
  }
}

export default { state, mutations, actions }