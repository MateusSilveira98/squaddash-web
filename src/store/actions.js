import services from './services'
import axios from 'axios';
import Utils from '@/utils/index';
export default {
  async uploadImageToStorage({ commit }, file) {
    commit('LOADING');
    try {
      let response = await services.uploadImageToStorage(file);
      if (response.data) {
        let image = response.data;
        commit('LOADING');
        commit('IMAGE_UPLOADED_SUCCESS', { image });
        axios.defaults.headers.common['Authorization'] = `Bearer ${Utils.localstorage.get('token')}`;
      }
    } catch (error) {
      commit('LOADING');
      console.log(error);
    }
  },
  async create({ commit }, {url, payload}) {
    commit('LOADING')
    payload.status = true
    let response = await service.post(url, payload)
    Utils.callback(commit, response);
  },
  async edit({ commit }, {url, payload}) {
    commit('LOADING')
    let response = await service.edit(url, payload)
    Utils.callback(commit, response);
  },
  async getAll({ commit }, url) {
    let response = await service.getAll(url);
    let payload = response.data;
    commit('GET_ALL_SUCCESS', { payload });
  },
  async getById({ commit }, {url, id}) {
    let response = await service.getById(url, id);
    commit('GET_BY_ID_SUCCESS', { payload });
  }
}
