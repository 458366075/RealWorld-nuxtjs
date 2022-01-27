<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <author-panel :article="article" @changeFollowing="changeFollowing" @changeArticle="changeArticle" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.body" />
          <ul class="tag-list">
            <li v-for="item in article.tagList" :key="item" class="tag-default tag-pill tag-outline">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>

      <hr>

      <div v-if="article.author" class="article-actions">
        <author-panel :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea v-model="body" v-loading="loading" class="form-control" placeholder="Write a comment..." rows="3" />
            </div>
            <div class="card-footer">
              <img v-if="article.author" :src="article.author.image" class="comment-author-img">
              <button v-loading="loading" class="btn btn-sm btn-primary" @click="createComment">
                Post Comment
              </button>
            </div>
          </form>

          <div v-for="item in comments" :key="item.id" class="card">
            <div class="card-block">
              <p class="card-text">
                {{ item.body }}
              </p>
            </div>
            <div class="card-footer">
              <n-link :to="`/profile/${article.author.username}`" class="comment-author">
                <img :src="article.author.image" class="comment-author-img">
              </n-link>
              &nbsp;
              <n-link :to="`/profile/${article.author.username}`" class="comment-author">
                {{ article.author.username }}
              </n-link>
              <span class="date-posted">{{ article.updatedAt | format }}</span>
              <span class="mod-options">
                <i v-loading="loading" class="ion-trash-a" @click="deleteComment(item.id)" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { articlesSlugApi, articlesSlugCommentsApi, articlesSlugCommentsCreateApi, articlesSlugCommentsDeleteApi } from '@/api/article'
import { Article, Comment } from '@/api/article.d'
import AuthorPanel from '@/components/PanelAuthor.vue'

interface Data {
  article?: Article
  body: string
  loading: boolean,
  comments?: Comment[]
}

export default Vue.extend({
  name: 'PageArticle',
  components: {
    AuthorPanel
  },
  async asyncData ({ params: { slug } }) {
    const { article } = await articlesSlugApi(slug)
    const { comments } = await articlesSlugCommentsApi(slug)
    return { article, comments }
  },
  data (): Data {
    return {
      body: '',
      loading: false,
    }
  },
  head () {
    return {
      title: `${this.$route.params.slug.split('-')[0]} - Conduit`
    }
  },
  computed: {
    slug (): string {
      return this.article?.slug || ''
    }
  },
  methods: {
    async createComment () {
      this.loading = true
      try {
        await articlesSlugCommentsCreateApi(this.slug, this.body)
        const { comments } = await articlesSlugCommentsApi(this.slug)
        this.comments = comments
      } catch (err) {}
      this.body = ''
      this.loading = false
    },
    async deleteComment (id: string) {
      if (this.loading) return
      this.loading = true
      await articlesSlugCommentsDeleteApi(this.slug, id)
      const { comments } = await articlesSlugCommentsApi(this.slug)
      this.comments = comments
      this.loading = false
    },
    changeFollowing (value: boolean) {
      if (this.article) this.article.author.following = value
    },
    changeArticle (value: Article) {
      this.article = value
    }
  }
})
</script>

<style scoped>

</style>
