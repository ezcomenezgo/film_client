<template>
  <form @submit.prevent="updateFilm" class="flex flex-col space-y-4">
    <label for="title">Title:</label>
    <input
      type="text"
      id="title"
      v-model="film.title"
      required
      class="input input-bordered w-full"
    />

    <label for="director">Director:</label>
    <input
      type="text"
      id="director"
      v-model="film.director"
      required
      class="input input-bordered w-full"
    />

    <label for="year">Year:</label>
    <input
      type="number"
      id="year"
      v-model="film.year"
      required
      class="input input-bordered w-full"
    />

    <label for="stars">Stars:</label>
    <input
      type="text"
      id="stars"
      v-model="film.stars"
      required
      class="input input-bordered w-full"
    />

    <label for="review">Review:</label>
    <input
      type="text"
      id="review"
      v-model="film.review"
      required
      class="input input-bordered w-full"
    />

    <button type="submit" class="btn btn-primary w-full">Edit Film</button>
  </form>

  <div v-if="unValidate" class="toast toast-top toast-end">
    <div class="alert alert-warning">
      <span>There's something wrong!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { type FilmData } from '@/types/filmDataInterface'
import FilmDataService from '@/services/filmDataService'

const router = useRouter()
const jsonFilmDataService = new FilmDataService('json')
let unValidate = ref(false)
const film: Ref<FilmData> = ref({
  title: '',
  director: '',
  year: 0,
  stars: '',
  review: ''
})

const props = defineProps({
  id: String
})

onMounted(() => {
  getFilm(props.id!)
})

async function getFilm(id: string) {
  // get the film data
  try {
    const filmData = await jsonFilmDataService.get(id)
    console.log('filmData', filmData)
    film.value = filmData.data
  } catch (error) {
    unValidate.value = true
    console.error(error)
  } finally {
    unValidate.value = false
  }
}

// handle form submission
async function updateFilm() {
  // validation
  if (
    !film.value.title ||
    !film.value.director ||
    !film.value.year ||
    !film.value.stars ||
    !film.value.review
  ) {
    console.log('Please fill in all fields')
    unValidate.value = true
    return
  }

  try {
    // update the film data
    await jsonFilmDataService.update(film.value)
    // redirect to HomeView
    router.push('/')
  } catch (error) {
    unValidate.value = true
    console.error('Error adding film:', error)
  } finally {
    unValidate.value = false
  }
}
</script>
