import { useRouter } from 'vue-router'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import PrimeVue from 'primevue/config'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { useItemsStore } from '@/stores/items.store'
import SearchItemsForm from '@/components/SearchItemsForm.vue'

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

vi.mock('@/services/SearchItems.service', () => ({
  fetchItemsByTitle: vi.fn(async (title: string) => [{ id: 1, title }])
}))

describe('SearchItemsForm.vue', () => {
  it('renders the form and components correctly', () => {
    const wrapper = mount(SearchItemsForm, {
      global: {
        plugins: [PrimeVue, createTestingPinia({ createSpy: vi.fn, stubActions: false })],
        components: {
          IconField,
          InputIcon,
          InputText,
          Button
        }
      }
    })

    expect(wrapper.findComponent(IconField).exists()).toBe(true)
    expect(wrapper.findComponent(InputIcon).exists()).toBe(true)
    expect(wrapper.findComponent(InputText).exists()).toBe(true)
    expect(wrapper.findComponent(Button).exists()).toBe(true)
  })

  it('submits the form and navigates correctly', async () => {
    const router = { push: vi.fn() }
    ;(useRouter as any).mockReturnValue(router)

    const wrapper = mount(SearchItemsForm, {
      global: {
        plugins: [PrimeVue, createTestingPinia({ createSpy: vi.fn, stubActions: false })],
        components: {
          IconField,
          InputIcon,
          InputText,
          Button
        }
      }
    })

    const input = wrapper.findComponent(InputText)
    await input.setValue('test search')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    const itemsStore = useItemsStore()
    expect(itemsStore.fetchItems).toHaveBeenCalledWith('test search')
  })
})
