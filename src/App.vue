<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="navbar bg-base-100 space-x-5">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/add">Add A New Film</RouterLink>
  </div>

  <RouterView />
</template>

<style scoped></style>
