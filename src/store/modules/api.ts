import axios from 'axios'
import router from '@/router'

export const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  }
})

api.interceptors.request.use(function (config) {
  // Do something before request is sent
  const local = localStorage.getItem('vuex')
  const localStorageData = JSON.parse(local || '')
  config.headers = {
    // eslint-disable-next-line
    'Authorization': `Bearer ${localStorageData.SessionModule.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

api.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log('response', response)
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // console.log(error.response)
  if (error.response.status === 401 || error.response.status === 403) router.push('/login')
  return Promise.reject(error)
})
