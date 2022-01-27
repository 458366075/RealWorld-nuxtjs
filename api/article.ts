import * as Type from './article.d'
import { request } from '@/plugins/request'

export const articlesApi = (params: Type.ArticlesParams) => {
  return request<Type.ArticlesResponse>({
    url: '/articles',
    params,
  })
}

export const articlesFeedApi = (params: Type.ArticlesFeedParams) => {
  return request<Type.ArticlesResponse>({
    url: '/articles/feed',
    params,
  })
}

export const tagsApi = () => {
  return request<{ tags: string[] }>({
    url: '/tags',
  })
}

export const articlesSlugApi = (slug: string) => {
  return request<{ article: Type.Article }>({
    url: '/articles/' + slug,
  })
}

export const articlesSlugNewApi = (article: Type.NewArticleParams) => {
  return request<{ article: Type.Article }>({
    method: 'POST',
    url: '/articles',
    data: {
      article
    }
  })
}

export const articlesSlugDeleteApi = (slug: string) => {
  return request<{ article: Type.Article }>({
    method: 'DELETE',
    url: '/articles/' + slug,
  })
}

export const articlesSlugCommentsApi = (slug: string) => {
  return request<{ comments: Type.Comment[] }>({
    url: `/articles/${slug}/comments`,
  })
}

export const articlesSlugCommentsCreateApi = (slug: string, body: string) => {
  return request({
    method: 'POST',
    url: `/articles/${slug}/comments`,
    data: {
      comment: {
        body
      }
    }
  })
}

export const articlesSlugCommentsDeleteApi = (slug: string, id: string) => {
  return request({
    method: 'DELETE',
    url: `/articles/${slug}/comments/${id}`,
  })
}

export const articlesSlugFavoriteApi = (slug: string) => {
  return request<{ article: Type.Article }>({
    method: 'POST',
    url: `/articles/${slug}/favorite`,
  })
}

export const articlesSlugFavoriteDeleteApi = (slug: string) => {
  return request<{ article: Type.Article }>({
    method: 'DELETE',
    url: `/articles/${slug}/favorite`,
  })
}
