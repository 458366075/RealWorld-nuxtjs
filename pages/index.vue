<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">
          conduit
        </h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <n-link
                  v-if="$store.state.user.username"
                  class="nav-link"
                  :class="{ 'active': tab === 'feed' }"
                  :to="{
                    name: 'index',
                    query: { tab: 'feed', tag }
                  }"
                >
                  Your Feed
                </n-link>
              </li>
              <li class="nav-item">
                <n-link class="nav-link" :to="{ query: { tag } }" :class="{ 'active': !tab }">
                  Global Feed
                </n-link>
              </li>
              <li v-if="tag" class="nav-item">
                <n-link
                  class="nav-link"
                  :class="{ 'active': tab === 'tag' }"
                  :to="{
                    name: 'index',
                    query: { tab: 'tag', tag }
                  }"
                >
                  #{{ tag }}
                </n-link>
              </li>
            </ul>
          </div>

          <div v-if="loading" class="article-preview">
            Loading articles...
          </div>
          <div v-else-if="!articles.length" class="article-preview">
            No articles are here... yet.
          </div>
          <panel-article
            v-for="(item, index) in articles"
            v-else
            :key="item.slug"
            :article="item"
            @changeArticle="val => articles.splice(index, 1, val)"
          />
          <pagination :total-page="totalPage" />
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <n-link
                v-for="item in tags"
                :key="item"
                :to="{ query: { tag: item, tab: 'tag' } }"
                class="tag-pill tag-default"
              >
                {{ item }}
              </n-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { tagsApi } from '@/api/article'
import { ArticlesResponse } from '@/api/article.d'
import PanelArticle from '@/components/PanelArticle.vue'
import Pagination from '@/components/Pagination.vue'
import getArticles from '@/utils/getArticles'

interface Data extends ArticlesResponse {
  loading: boolean
  tags: string[]
  totalPage: number
}

export default Vue.extend({
  name: 'PagesIndex',
  components: {
    PanelArticle,
    Pagination,
  },
  async asyncData ({ query }) {
    try {
      const articlesData = await getArticles(query.page as string, {
        tab: query.tab as string,
        tag: query.tag as string,
      })
      const tagsData = await tagsApi()
      return {
        ...articlesData,
        ...tagsData
      }
    } catch (err) {}
  },
  data (): Data {
    return {
      articles: [],
      tags: [],
      loading: false,
      totalPage: 0,
    }
  },
  head: {
    title: 'Home - Conduit'
  },
  computed: {
    tab () {
      return this.$route.query.tab as string || ''
    },
    page () {
      return +this.$route.query.page || 1
    },
    tag () {
      return this.$route.query.tag as string
    }
  },
  watch: {
    '$route.query' () {
      this.getArticles()
    },
  },
  methods: {
    async getArticles () {
      this.loading = true
      this.articles = []
      this.totalPage = 0
      try {
        const { articles, totalPage } = await getArticles(this.page, {
          tab: this.tab,
          tag: this.tag,
        })
        this.articles = articles
        this.totalPage = totalPage
      } catch (err) {}
      this.loading = false
    }
  }
})
</script>

<style scoped>
</style>
