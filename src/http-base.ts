import axios, { type AxiosInstance } from 'axios'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/filmapi',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiClient
