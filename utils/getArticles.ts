import { articlesApi, articlesFeedApi } from '@/api/article'
const pageSize = 3

export default async function getArticles (
  page: number | string = 1,
  params: {
    tab?: string,
    tag?: string,
    author?: string,
    favorited?: string,
  } = {}
) {
  const { tab, tag, author, favorited } = params
  const pageModule = {
    limit: pageSize,
    offset: (+page - 1) * pageSize,
  }
  let data
  if (tab === 'feed') data = await articlesFeedApi(pageModule)
  else {
    data = await articlesApi({
      ...pageModule,
      tag,
      author,
      favorited,
    })
  }
  return {
    ...data,
    totalPage: Math.ceil((data.articlesCount || 0) / pageSize),
  }
}
