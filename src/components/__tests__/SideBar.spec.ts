import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

import { useItemsStore } from '@/stores/items.store'
import SideBar from '@/components/SideBar.vue'

vi.mock('vue-router', async (importOriginal) => {
  const original = (await importOriginal()) as Object
  return {
    ...original,
    useRouter: () => ({ push: vi.fn() }),
    useRoute: () => ({ params: { title: 'test-title' } })
  }
})

describe('SideBar.vue', () => {
  it('should display "Nenhuma busca recente." when no recent searches', async () => {
    const wrapper = mount(SideBar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          Button: {
            template: '<button><slot/></button>'
          },
          Divider: {
            template: '<div></div>'
          }
        }
      }
    })

    const itemsStore = useItemsStore()
    itemsStore.fetchedItems = []

    await flushPromises()

    expect(wrapper.text()).toContain('Nenhuma busca recente.')
  })

  it('should display recent searches', async () => {
    const wrapper = mount(SideBar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn
          })
        ],
        stubs: {
          Button: {
            template: '<button><slot/></button>'
          },
          Divider: {
            template: '<div></div>'
          }
        }
      }
    })

    const itemsStore = useItemsStore()
    itemsStore.fetchedItems = [
      { query: 'search-1', items: [] },
      { query: 'search-2', items: [] }
    ]

    await flushPromises()

    expect(wrapper.text()).toContain('Buscas recentes')
  })
})
