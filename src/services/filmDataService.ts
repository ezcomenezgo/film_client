import createApiClient from '@/http-base'
import { type FilmData } from '@/types/filmDataInterface'

class FilmDataService {
  private http: any

  constructor(contentType: string) {
    this.http = createApiClient(contentType)
  }

  getAll(type: string) {
    return this.http.get(`/filmapi?type=${type}`)
  }

  get(id: string) {
    return this.http.get(`/filmapi/${id}`)
  }

  create(film: FilmData) {
    return this.http.post('/filmapi', film)
  }

  update(id: string, film: FilmData) {
    return this.http.put(`/filmapi/${id}`, film)
  }

  delete(id: number) {
    // console.log('film', film)
    return this.http.delete(`/filmapi?id=${id}`)
  }

  deleteAll() {
    return this.http.delete('/filmapi')
  }

  findByTitle(title: string) {
    return this.http.get(`/filmapi?title=${title}`)
  }
}

export default FilmDataService
