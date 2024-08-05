<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import Divider from 'primevue/divider'

import type { TFetchedItemByCategory, TSeachItem } from '@/types/SearchItems.types'

import { useItemsStore } from '@/stores/items.store'

const router = useRouter()
const route = useRoute()
const itemsStore = useItemsStore()

const formattedSearchItem = ref<TFetchedItemByCategory | null>(null)

watchEffect(() => {
  const title = route.params.title as string

  const data = itemsStore.fetchedItems.find((item) => item.query === title)

  if (!data) {
    formattedSearchItem.value = null
    return
  }

  if (!data.items.length) {
    formattedSearchItem.value = {
      query: title,
      items: {
        playlists: [],
        blogPosts: [],
        videos: []
      },
      total: 0
    }
    return
  }

  const playlistsItems: TSeachItem[] = []
  const blogPostsItems: TSeachItem[] = []
  const videosItems: TSeachItem[] = []

  data.items.forEach((item) => {
    switch (item.category) {
      case 'PLAYLISTS':
        playlistsItems.push(item)
        break
      case 'BLOG_POSTS':
        blogPostsItems.push(item)
        break
      case 'VIDEOS':
        videosItems.push(item)
        break
      default:
        console.error(`Item category not mappped: ${item.category}`)
    }
  })

  formattedSearchItem.value = {
    query: title,
    items: {
      playlists: playlistsItems,
      blogPosts: blogPostsItems,
      videos: videosItems
    },
    total: data.items.length
  }
})

if (!formattedSearchItem.value) {
  router.push({
    name: 'home'
  })
}

const itemCategories: ('playlists' | 'blogPosts' | 'videos')[] = [
  'playlists',
  'blogPosts',
  'videos'
]
</script>

<template>
  <div v-if="!formattedSearchItem" class="pl-6">Item não encontrado.</div>

  <div v-else-if="formattedSearchItem && !formattedSearchItem.total">
    <span class="pl-6">Nenhum item encontrado para a busca "{{ formattedSearchItem.query }}".</span>
    <RouterLink :to="{ name: 'home' }" class="ml-1 text-green-500">
      Clique aqui para fazer nova busca.
    </RouterLink>
  </div>

  <div v-else class="mb-6">
    <div v-for="category in itemCategories" :key="category" class="flex flex-col items-start">
      <div class="border ml-6 block px-3 py-2 border-blue-500 bg-blue-500/20 rounded-lg">
        <h3 class="uppercase font-medium text-sm">
          {{ category }} ({{ formattedSearchItem.items[category].length }})
        </h3>
      </div>

      <span v-if="!formattedSearchItem.items[category].length" class="inline-block mx-6 mt-4 mb-2">
        Nenhum item encontrado para essa categoria.
      </span>

      <a
        v-for="item in formattedSearchItem.items[category]"
        :key="item.title"
        :href="item.url"
        target="_blank"
        class="mt-4 rounded-lg w-full px-6 py-4 flex flex-col justify-center hover:bg-neutral-700"
      >
        <h2 class="font-medium">{{ item.title }}</h2>
        <p class="text-gray-500">{{ item.description }}</p>
      </a>

      <Divider />
    </div>
  </div>
</template>
