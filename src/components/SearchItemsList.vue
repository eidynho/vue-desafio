<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import Divider from 'primevue/divider'

import type { TFetchedItemByCategory, TSeachItem } from '@/types/SearchItems.types'

import { useItemsStore } from '@/stores/items.store'

const router = useRouter()
const itemsStore = useItemsStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

const formattedSearchItem = computed<TFetchedItemByCategory | null>(() => {
  const data = itemsStore.fetchedItems.find((item) => item.query === props.title)

  if (!data) {
    return null
  }

  if (!data.items.length) {
    return {
      query: props.title,
      items: {
        playlists: [],
        blogPosts: [],
        videos: []
      },
      total: 0
    }
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

  return {
    query: props.title,
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
        <h3 class="uppercase font-medium text-sm">{{ category }}</h3>
      </div>

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
