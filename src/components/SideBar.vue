<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import Button from 'primevue/button'
import Divider from 'primevue/divider'

import { useItemsStore } from '@/stores/items.store'

const router = useRouter()
const route = useRoute()
const itemsStore = useItemsStore()

function navigateToNewSearch() {
  router.push({ name: 'home' })
}

function navigateToSearchedItem(title: string) {
  router.push({
    name: 'searchItem',
    params: {
      title
    }
  })
}
</script>

<template>
  <div class="border-r w-52 lg:w-80 p-4 border-r-neutral-800 min-h-dvh">
    <div class="flex flex-col gap-2">
      <Button
        icon="pi pi-search"
        label="Nova busca"
        severity="success"
        text
        class="w-full !justify-start !text-sm"
        @click="navigateToNewSearch"
      />

      <Button
        icon="pi pi-trash"
        label="Limpar buscas"
        severity="danger"
        text
        class="w-full !justify-start !text-sm"
        @click="itemsStore.clearItems"
      />
    </div>

    <Divider />

    <span class="block mb-3 text-sm px-3 text-gray-400">Buscas recentes</span>

    <template v-if="!itemsStore.fetchedItems.length">
      <span class="text-sm px-3 block">Nenhuma busca recente.</span>
    </template>

    <template v-else v-for="fetchedItem in itemsStore.fetchedItems" :key="fetchedItem.query">
      <Button
        :label="fetchedItem.query"
        severity="secondary"
        text
        class="w-full mb-2 !justify-start !text-sm !text-white"
        :class="{'!bg-[#27272a]': route.params.title === fetchedItem.query}"
        @click="navigateToSearchedItem(fetchedItem.query)"
      />
    </template>
  </div>
</template>
