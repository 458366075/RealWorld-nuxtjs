<template>
  <div>
    <div v-if="loading" class="article-preview">
      Loading articles...
    </div>
    <div v-else-if="!articles.length" class="article-preview">
      No articles are here... yet.
    </div>
    <div v-else>
      <panel-article
        v-for="(item, index) in articles"
        :key="item.slug"
        :article="item"
        @changeArticle="val => articles.splice(index, 1, val)"
      />
      <pagination :total-page="totalPage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import getArticles from '@/utils/getArticles'
import Pagination from '@/components/Pagination.vue'
import PanelArticle from '@/components/PanelArticle.vue'
import { Article } from '@/api/article.d'

function getData (page: string, params: {
  username: string,
  favorites?: string,
}) {
  const { username, favorites } = params
  try {
    return getArticles(page as string, {
      [favorites ? 'favorited' : 'author']: username,
    })
  } catch (err: any) {
    console.log(err)
  }
}

export default Vue.extend({
  name: 'PageProfileUserName',
  components: {
    Pagination,
    PanelArticle,
  },
  validate ({ params: { favorites } }) {
    return [undefined, 'favorites'].includes(favorites)
  },
  asyncData ({ params, query }) {
    if (process.server) {
      return getData(query.page as string, {
        username: params.username,
        favorites: params.favorites,
      })
    }
    return {
      loading: true
    }
  },
  data () {
    return {
      loading: false,
      articles: [] as Article[],
      totalPage: 0,
    }
  },
  computed: {
    page () {
      return this.$route.query.page
    }
  },
  watch: {
    '$route.params' () {
      this.clientInit()
    }
  },
  mounted () {
    this.clientInit()
  },
  methods: {
    async clientInit () {
      if (process.client) {
        const { username, favorites } = this.$route.params
        try {
          this.loading = true
          const data = await getData(this.page as string, {
            username,
            favorites,
          })
          if (data) {
            this.articles = data.articles
            this.totalPage = data.totalPage
          }
        } catch (err) {

        }
        this.loading = false
      }
    }
  }
})
</script>

<style scoped>

</style>
