<template>
  <div>
    <div class="flex space-x-10 items-center">
      <h1>Films List</h1>

      <div>
        <label for="dataFormat" class="mr-3">Data Format:</label>
        <select id="dataFormat" v-model="contentType" class="select select-bordered max-w-xs">
          <option disabled selected>Type</option>
          <option value="json">Json</option>
          <option value="xml">Xml</option>
        </select>
      </div>

      <span>Page: {{ currentPage }}</span>
    </div>

    <table class="table table-pin-rows">
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
        <tr v-for="film in getFilmsForCurrentPage()" :key="film.id" class="hover">
          <td>{{ film.title }}</td>
          <td>{{ film.year }}</td>
          <td>{{ film.director }}</td>
          <td>{{ film.stars }}</td>
          <td>{{ film.review }}</td>
          <td class="flex space-x-2">
            <router-link :to="'/edit/' + film.id" class="btn btn-primary">Edit</router-link>
            <button class="btn btn-error" @click="deleteFilm(film.id!)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="join grid grid-cols-4">
      <button @click="currentPage = 1" class="join-item btn btn-outline">First page</button>
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="join-item btn btn-outline"
      >
        Previous page
      </button>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="join-item btn btn-outline"
      >
        Next
      </button>
      <button @click="currentPage = totalPages" class="join-item btn btn-outline">Last page</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed, type Ref } from 'vue'
import { type FilmData } from '@/types/filmDataInterface'
import FilmDataService from '@/services/filmDataService'
import { parse } from 'fsp-xml-parser'

const contentType: Ref<string> = ref('json')
const films = ref([] as FilmData[])
const jsonFilmDataService = new FilmDataService('json')
const xmlFilmDataService = new FilmDataService('xml')

const pageSize = 10
const currentPage: Ref<number> = ref(1)
const totalPages = computed(() => Math.ceil(films.value.length / pageSize))

onMounted(() => {
  getAllFilms(contentType.value)
})

watch(contentType, (newType) => {
  getAllFilms(newType)
})

// fetch all films from the API
async function getAllFilms(type: string) {
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

// delete a film from the API
async function deleteFilm(filmId: number) {
  let result
  try {
    result = await jsonFilmDataService.delete(filmId)
    if (result.status === 200) {
      await getAllFilms(contentType.value)
    }
  } catch (error) {
    console.error(error)
  } finally {
    currentPage.value = totalPages.value
  }
}

// change the data format to fit the FilmData interface
function changeDataFormat(data: any) {
  const newData: any = {}

  data.children.forEach((child: any) => {
    newData[child.name] = child.content
  })

  return newData as FilmData
}

// pagination functions
function goToPreviousPage() {
  if (currentPage.value > 1) currentPage.value--
}

function goToNextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function getFilmsForCurrentPage() {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return films.value.slice(start, end)
}
</script>
