import type { TSeachItems } from '@/types/SearchItems.types'

export async function fetchItemsByTitle(title: string): Promise<TSeachItems> {
  try {
    // simulate API loading request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const response = await fetch(`${import.meta.env.VITE_API_URL}/items?title_like=${title}`, {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error('Ocorreu um erro ao buscar os itens.')
    }

    const data: TSeachItems = await response.json()

    return data
  } catch (err) {
    console.error(err)
    return []
  }
}
