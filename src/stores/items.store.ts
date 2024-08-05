import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

import type { TFetchedItem, TSeachItems } from '@/types/SearchItems.types'
import { fetchItemsByTitle } from '@/services/SearchItems.service'

export const useItemsStore = defineStore('items', () => {
  const router = useRouter()

  const fetchedItems = ref<TFetchedItem[]>([])

  async function fetchItems(title: string): Promise<TSeachItems> {
    const alreadyFetchedItem = fetchedItems.value.find((item) => item.query === title)

    if (alreadyFetchedItem) {
      return alreadyFetchedItem.items
    }

    const items = await fetchItemsByTitle(title)

    fetchedItems.value.push({
      query: title,
      items
    })

    return items
  }

  function clearItems() {
    fetchedItems.value = []
    router.push({ name: 'home' })
  }

  return { fetchedItems, fetchItems, clearItems }
})
