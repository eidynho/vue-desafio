<script setup lang="ts">
import { useRoute } from 'vue-router'
import Divider from 'primevue/divider'

import SearchItemsList from '@/components/SearchItemsList.vue'

const route = useRoute()

const title = route.params.title as string
</script>

<template>
  <div class="mt-7 px-4 flex-1">
    <h1 class="mb-2 pl-6 font-bold">Dados encontrados para a busca "{{ title }}":</h1>
    <p class="text-gray-400 pl-6 mb-8">
      A API retornará todos os itens que contém o texto informado
    </p>

    <Divider />

    <SearchItemsList :title="title" />
  </div>
</template>
