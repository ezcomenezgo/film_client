<template>
  <form @submit.prevent="addFilm" class="flex flex-col space-y-4">
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

    <button type="submit" class="btn btn-primary w-full">Add Film</button>
  </form>

  <div v-if="unValidate" class="toast toast-top toast-end">
    <div class="alert alert-warning">
      <span>There's something wrong!</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { type FilmData } from '@/types/filmDataInterface'
import FilmDataService from '@/services/filmDataService'

const router = useRouter()
let unValidate: Ref<boolean> = ref(false)
const film: Ref<FilmData> = ref({
  title: '',
  director: '',
  year: 0,
  stars: '',
  review: ''
})

// handle form submission
async function addFilm() {
  // validation
  if (!validate()) {
    console.log('Please fill in all fields')
    unValidate.value = true
    return
  }

  try {
    // save the film data
    const filmDataService = new FilmDataService('json')
    await filmDataService.create(film.value)
    // redirect to HomeView
    router.push('/')
  } catch (error) {
    unValidate.value = true
    console.error('Error adding film:', error)
  } finally {
    unValidate.value = false
    // reset the form fields
    film.value = {
      title: '',
      director: '',
      year: 0,
      stars: '',
      review: ''
    }
  }
}

function validate() {
  if (
    !film.value.title ||
    !film.value.director ||
    !film.value.year ||
    !film.value.stars ||
    !film.value.review
  ) {
    return false
  }

  return true
}
</script>
