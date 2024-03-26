<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="navbar bg-base-100">
    <button class="btn btn-secondary">Secondary</button>
    <a class="btn btn-ghost text-xl">daisyUI</a>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
  </div>

  <RouterView />
</template>

<style scoped></style>
