import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises, RouterLinkStub } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { useItemsStore } from '@/stores/items.store'
import SearchItemsList from '@/components/SearchItemsList.vue'

vi.mock('vue-router', async (importOriginal) => {
  const original = (await importOriginal()) as Object
  return {
    ...original,
    useRouter: () => ({ push: vi.fn() }),
    useRoute: () => ({ params: { title: 'test-title' } })
  }
})

describe('SearchItemsList.vue', () => {
  it('should display "Item não encontrado." when formattedSearchItem is null', async () => {
    const wrapper = mount(SearchItemsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const itemsStore = useItemsStore()
    itemsStore.fetchedItems = []

    await flushPromises()

    expect(wrapper.text()).toContain('Item não encontrado.')
  })

  it('should display "Nenhum item encontrado para a busca "test-title". Clique aqui para fazer nova busca." when formattedSearchItem did not found searched item', async () => {
    const wrapper = mount(SearchItemsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const itemsStore = useItemsStore()
    itemsStore.fetchedItems = [{ query: 'test-title', items: [] }]

    await flushPromises()

    expect(wrapper.text()).toContain(
      'Nenhum item encontrado para a busca "test-title". Clique aqui para fazer nova busca.'
    )
  })

  it('should display the categories and items correctly', async () => {
    const wrapper = mount(SearchItemsList, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })

    const itemsStore = useItemsStore()
    itemsStore.fetchedItems = [
      {
        query: 'test-title',
        items: [
          {
            id: '1',
            category: 'PLAYLISTS',
            title: 'Playlist 1',
            description: 'Description 1',
            url: '#'
          },
          {
            id: '2',
            category: 'BLOG_POSTS',
            title: 'Blog 1',
            description: 'Description 2',
            url: '#'
          },
          { id: '3', category: 'VIDEOS', title: 'Video 1', description: 'Description 3', url: '#' }
        ]
      }
    ]

    await flushPromises()

    expect(wrapper.text()).toContain('playlists (1)')
    expect(wrapper.text()).toContain('blogPosts (1)')
    expect(wrapper.text()).toContain('videos (1)')
  })
})
