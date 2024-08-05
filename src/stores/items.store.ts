import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { TFetchedItem, TSeachItems } from '@/types/SearchItems.types'
import { fetchItemsByTitle } from '@/services/SearchItems.service'

export const useItemsStore = defineStore('items', () => {
  const fetchedItems = ref<TFetchedItem[]>([])

  async function fetchItems(title: string): Promise<TSeachItems> {
    const items = await fetchItemsByTitle(title)

    fetchedItems.value.push({
      query: title,
      items
    })

    return items
  }

  return { fetchedItems, fetchItems }
})
