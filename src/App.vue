<template>
  <div class="navbar bg-base-100 space-x-5">
    <DocumentationIcon />
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/add">Add A New Film</RouterLink>
  </div>

  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import DocumentationIcon from '@/components/icons/IconDocumentation.vue'
</script>
