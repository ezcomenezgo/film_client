import axios, { type AxiosInstance } from 'axios'

const devBaseUrl = import.meta.env.VITE_DEV_BASE_URL

function createApiClient(contentType: string): AxiosInstance {
  return axios.create({
    baseURL: devBaseUrl,
    headers: {
      'Content-Type': `application/${contentType}`
    }
  })
}

export default createApiClient
