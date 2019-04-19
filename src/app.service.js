import axios from 'axios'

axios.defaults.baseURL = 'https://flashcards-backend.herokuapp.com/api/v1'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Token ${token}`
  }
  return config
})

const appService = {
  listUserStudySets (userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/users/${userId}/studysets/`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  retrieveStudySet (studySetId) {
    return new Promise((resolve, reject) => {
      axios.get(`/studysets/${studySetId}/`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  createStudySet (data) {
    return new Promise((resolve, reject) => {
      axios.post(`/users/${data.user}/studysets/`, data)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  listCards (studySetId) {
    return new Promise((resolve, reject) => {
      axios.get(`/studysets/${studySetId}/cards/`)
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
  updateCard (data) {
    return new Promise((resolve, reject) => {
      axios.patch(`/cards/${data.id}/`, data)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  deleteCard (cardId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/cards/${cardId}/`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  retrieveUser (userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/accounts/${userId}/`)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  login (credentials) {
    return new Promise((resolve, reject) => {
      axios.post('/accounts/auth/', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  },
  createUser (data) {
    return new Promise((resolve, reject) => {
      axios.post('/accounts/create/', data)
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error.response)
        })
    })
  }
}

export default appService
