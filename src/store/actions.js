import services from './services'
export default {
  async uploadImageToCloudinary({ commit }, file) {
    commit('LOADING')
    try {
      let response = await services.uploadImageToCloudinary(file)
      if (response.data) {
        let image = response.data
        commit('LOADING')
        commit('IMAGE_UPLOADED_SUCCESS', { image })
      }
    } catch (error) {
      commit('LOADING')
      console.log(error.request)
    }
  },
  setHeader({ commit }) {
    commit('SET_HEADER')
  },
  async create({ commit }, payload) {
    commit('LOADING')
    payload.status = true
    let response = await service.create(payload)
    if (response.data.id) {
      commit('LOADING')
      commit('SUCCESS_MESSAGE')
    } else {
      commit('LOADING')
      commit('FAIL_MESSAGE', { response })
    }
  },
  async edit({ commit }, payload) {
    commit('LOADING')
    let response = await service.edit(payload)
    if (response.data.id) {
      commit('LOADING')
      commit('SUCCESS_MESSAGE')
    } else {
      commit('LOADING')
      commit('FAIL_MESSAGE', { response })
    }
  },
  async delete({ commit }, payload) {
    commit('LOADING')
    let response = await service.delete(payload)
    if (response.data.id) {
      commit('LOADING')
      commit('SUCCESS_MESSAGE')
    } else {
      commit('LOADING')
      commit('FAIL_MESSAGE', { response })
    }
  },
  async getAll({ commit }) {
    let response = await service.getAll()
    let payload = response.data
    commit('GET_ALL_SUCCESS', { payload })
  },
  async getById({ commit }, id) {
    let response = await service.getById(id)
    let payload = response.data
    if (payload.id) {
      commit('GET_BY_ID_SUCCESS', { payload })
    } else {
      commit('FAIL_MESSAGE', { response })
    }
  }
}
