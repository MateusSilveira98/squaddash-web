import axios from 'axios'
export default {
  uploadImageToStorage(file) {
    const storage = config.IMG_STORAGE;
    let formData = new FormData();
    formData.append('image', file);
    delete axios.defaults.headers.common["Authorization"];
    return axios({
      url: storage.url,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
  },
  post(url, payload) {
    return axios.post(url, payload)
  },
  edit(url, payload) {
    return axios.put(`${url}/${payload.id}`, payload)
  },
  getAll(url) {
    return axios.get(url)
  },
  getById(url, id) {
    return axios.get(`${url}/${id}`)
  }
}
