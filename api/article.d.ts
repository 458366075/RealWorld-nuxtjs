import { Profile } from './profiles.d'

export interface Article {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: Profile
}

export interface PageType {
  limit?: number
  offset?: number
}

export interface ArticlesParams extends PageType {
  tag?: string
  author?: string
  favorited?: string
}

export interface ArticlesResponse {
  articles: Article[]
  articlesCount?: number
}

export interface ArticlesFeedParams extends PageType {}

export interface Comment {
  id: number
  createdAt: string
  updatedAt: string
  body: string
  author: Profile
}

export interface NewArticleParams {
  title: string
  description: string
  body: string
  tagList: string[]
}
