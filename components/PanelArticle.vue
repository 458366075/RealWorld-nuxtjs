<template>
  <div class="article-preview">
    <div class="article-meta">
      <n-link :to="`/profile/${author.username}/`">
        <img :src="author.image">
      </n-link>
      <div class="info">
        <n-link :to="`/profile/${author.username}/`">
          {{ author.username }}
        </n-link>
        <span class="date">{{ article.updatedAt | format }}</span>
      </div>
      <button
        v-loading="loading"
        class="btn btn-sm pull-xs-right"
        :class="article.favorited ? 'btn-primary' : 'btn-outline-primary'"
        @click="articlesFavorite"
      >
        <i class="ion-heart" /> {{ article.favoritesCount }}
      </button>
    </div>
    <n-link
      :to="{
        name: 'article-slug',
        params: { slug: article.slug }
      }"
      class="preview-link"
    >
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <ul class="tag-list">
        <li v-for="tagItem in article.tagList" :key="tagItem" class="tag-default tag-pill tag-outline">
          {{ tagItem }}
        </li>
      </ul>
    </n-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Profile } from '@/api/profiles.d'
import { articlesSlugFavoriteApi, articlesSlugFavoriteDeleteApi } from '@/api/article'

export default Vue.extend({
  name: 'PanelArticle',
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    author (): Profile {
      return this.article.author
    }
  },
  methods: {
    async articlesFavorite () {
      this.loading = true
      try {
        const favorite = this.article.favorited
        let data
        if (favorite) data = await articlesSlugFavoriteDeleteApi(this.article.slug)
        else data = await articlesSlugFavoriteApi(this.article.slug)
        this.$emit('changeArticle', data.article)
      } catch (err) {}
      this.loading = false
    }
  },
})
</script>

<style scoped>

</style>
