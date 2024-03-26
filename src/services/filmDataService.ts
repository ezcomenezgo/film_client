import http from '@/http-base'
import { type FilmData } from '@/types/filmDataInterface'

class FilmDataService {
  getAll() {
    return http.get('/filmapi')
  }

  get(id: string) {
    return http.get(`/filmapi/${id}`)
  }

  create(film: FilmData) {
    return http.post('/filmapi', film)
  }

  update(id: string, film: FilmData) {
    return http.put(`/filmapi/${id}`, film)
  }

  delete(id: string) {
    return http.delete(`/filmapi/${id}`)
  }

  deleteAll() {
    return http.delete('/filmapi')
  }

  findByTitle(title: string) {
    return http.get(`/filmapi?title=${title}`)
  }
}

export default new FilmDataService()
