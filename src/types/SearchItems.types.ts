export type TSearchItemCategories = 'PLAYLISTS' | 'BLOG_POSTS' | 'VIDEOS'

export type TSeachItem = {
  id: string
  title: string
  url: string
  description: string
  category: TSearchItemCategories
}

export type TSeachItems = TSeachItem[]

export type TFetchedItem = {
  query: string
  items: TSeachItems
}

export type TFetchedItemByCategory = {
  query: string
  items: {
    playlists: TSeachItem[]
    blogPosts: TSeachItem[]
    videos: TSeachItem[]
  }
  total: number
}
