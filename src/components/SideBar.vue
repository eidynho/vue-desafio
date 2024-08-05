<script setup lang="ts">
import Button from 'primevue/button'
import Divider from 'primevue/divider'

import { useItemsStore } from '@/stores/items.store'

const itemsStore = useItemsStore()
</script>

<template>
  <div class="border-r w-64 lg:w-80 p-4 border-r-neutral-800 min-h-dvh">
    <div class="flex flex-col gap-2">
      <Button
        icon="pi pi-search"
        label="Nova busca"
        severity="success"
        text
        class="w-full !justify-start !text-sm"
      />
      <Button
        icon="pi pi-trash"
        label="Limpar buscas recentes"
        severity="danger"
        text
        class="w-full !justify-start !text-sm"
      />
    </div>

    <Divider />

    <span class="block mb-3 text-sm px-3 text-gray-400">Buscas recentes</span>

    <template v-if="!itemsStore.fetchedItems.length">
        <span class="text-sm px-3">Nenhuma busca recente.</span>
    </template>
    <template v-else v-for="fetchedItem in itemsStore.fetchedItems" :key="fetchedItem.query">
      <Button
        :label="fetchedItem.query"
        severity="secondary"
        text
        class="w-full mb-2 !justify-start !text-sm !text-white"
      />
    </template>
  </div>
</template>
