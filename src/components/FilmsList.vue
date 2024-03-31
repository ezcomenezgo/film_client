<template>
  <div>
    <h1>Films List</h1>
    <select v-model="contentType" class="select select-bordered w-full max-w-xs">
      <option disabled selected>Type</option>
      <option value="json">Json</option>
      <option value="xml">Xml</option>
    </select>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Director</th>
          <th>Stars</th>
          <th>Review</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="film in films" :key="film.id">
          <td>{{ film.title }}</td>
          <td>{{ film.year }}</td>
          <td>{{ film.director }}</td>
          <td>{{ film.stars }}</td>
          <td>{{ film.review }}</td>
          <td class="flex space-x-2">
            <button class="btn btn-primary">Edit</button>
            <button class="btn btn-error" @click="deleteFilm(film.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { type FilmData } from '@/types/filmDataInterface'
import FilmDataService from '@/services/filmDataService'
import { parse } from 'fsp-xml-parser'

const contentType = ref('json')
const films = ref([] as FilmData[])
const jsonFilmDataService = new FilmDataService('json')
const xmlFilmDataService = new FilmDataService('xml')

onMounted(() => {
  console.log('mounted')
  getAllFilms(contentType.value)
})

watch(contentType, (newType, oldType) => {
  console.log(oldType, ' contentType changed to ', newType)
  getAllFilms(newType)
})

async function getAllFilms(type: string) {
  // Fetch all films from the API
  try {
    let data
    if (type === 'json') {
      data = await jsonFilmDataService.getAll(type)
      data = data.data
    } else {
      data = await xmlFilmDataService.getAll(type)
      let parsed = parse(data.data)
      data = parsed.root?.children?.map(changeDataFormat)
    }

    films.value = data
  } catch (error) {
    console.error(error)
  }
}

async function deleteFilm(filmId: number) {
  // Delete a film from the API
  let result
  try {
    result = await jsonFilmDataService.delete(filmId)
    console.log(result)
    getAllFilms(contentType.value)
  } catch (error) {
    console.error(error)
  }
}

function changeDataFormat(data: any) {
  const newData: any = {}

  data.children.forEach((child: any) => {
    newData[child.name] = child.content
  })

  return newData as FilmData
}
</script>

<style scoped>
/* Add your component styles here */
</style>
