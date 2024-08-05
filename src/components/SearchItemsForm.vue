<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'

import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { useItemsStore } from '@/stores/items.store'

const router = useRouter()
const itemsStore = useItemsStore()

const searchText: Ref<string> = ref('')
const isFetching: Ref<boolean> = ref(false)

const isDisabled = computed<boolean>(() => isFetching.value || !searchText.value)

const onSubmit = async (event: Event) => {
  event.preventDefault()

  if (!searchText.value || isFetching.value) return

  isFetching.value = true
  await itemsStore.fetchItems(searchText.value)
  isFetching.value = false

  router.push({
    name: 'searchItem',
    params: {
      title: searchText.value
    },
  })
}
</script>

<template>
  <form
    @submit="onSubmit"
    @keydown.enter="onSubmit"
    class="flex flex-col md:flex-row gap-3 lg:w-[40rem]"
  >
    <IconField class="flex-1">
      <InputIcon class="pi pi-search" />
      <InputText v-model="searchText" placeholder="Buscar por título..." class="w-full" />
    </IconField>

    <Button
      type="submit"
      icon="pi pi-search"
      label="Pesquisar"
      :loading="isFetching"
      :disabled="isDisabled"
    />
  </form>
</template>
