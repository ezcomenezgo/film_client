import axios, { type AxiosInstance } from 'axios'

const devBaseUrl = process.env.VUE_APP_DEV_BASE_URL

const apiClient: AxiosInstance = axios.create({
  baseURL: devBaseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
