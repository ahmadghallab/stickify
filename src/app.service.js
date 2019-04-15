import axios from 'axios'

axios.defaults.baseURL = 'https://flashcards-backend.herokuapp.com/api/v1'

axios.interceptors.request.use(function (config) {
  const token = '626014c7db3b7d64a93a8d8102e9d4f157f368a2'
  // const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

const appService = {
  listStudySets (page) {
    return new Promise((resolve, reject) => {
      axios.get(`/studysets/?page=${page}`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  createStudySet (data) {
    return new Promise((resolve, reject) => {
      axios.post('/studysets/', data)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  listCards (studySetId, page) {
    return new Promise((resolve, reject) => {
      axios.get(`/studysets/${studySetId}/cards/?page=${page}`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  createCard (data) {
    return new Promise((resolve, reject) => {
      axios.post(`/studysets/${data.studyset}/cards/`, data)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
}

export default appService
