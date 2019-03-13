import axios from 'axios'
export default {
  uploadImageToCloudinary(file) {
    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ornito-media/image/upload'
    let CLOUDINARY_PRESET_UPLOAD = 'qcvcxjvd'
    let formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET_UPLOAD)
    formData.append('folder', 'squaddash')
    return axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
  },
  create(client, url) {
    return axios.post(url, client)
  },
  edit(client, url) {
    return axios.put(`${url}/${client.id}`, client)
  },
  delete(client, url) {
    return axios.put(`${url}/${client.id}`, client)
  },
  getAll (url) {
    return axios.get(url)
  },
  getById (id, url) {
    return axios.get(`${url}/${id}`)
  }
}
