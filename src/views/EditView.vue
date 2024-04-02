<template>
  <div>
    <EditFilm :id="id" />
  </div>
</template>

<script setup lang="ts">
import EditFilm from '@/components/EditFilm.vue'

const props = defineProps({
  id: String
})
</script>
