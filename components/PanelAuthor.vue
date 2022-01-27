<template>
  <div v-if="author" class="article-meta">
    <n-link :to="`/profile/${author.username}/`">
      <img :src="author.image">
    </n-link>
    <div class="info">
      <n-link :to="`/profile/${author.username}/`" class="author">
        {{ author.username }}
      </n-link>
      <span class="date">{{ article.updatedAt | format }}</span>
    </div>
    <template v-if="isMy">
      <button class="btn btn-outline-secondary btn-sm" @click="$router.push(`/editor/${article.slug}`)">
        <i class="ion-edit" /> Edit Article
      </button>
      <button v-loading="deleteLoading" class="btn btn-outline-danger btn-sm" @click="articleDelete">
        <i class="ion-trash-a" /> Delete Article
      </button>
    </template>
    <template v-else>
      <button v-loading="followLoading" class="btn btn-sm btn-outline-secondary disabled" @click="profileFollow">
        <i class="ion-plus-round" />&nbsp;{{ author.following ? 'Unfollow Gerome' : 'Follow Gerome' }}
      </button>
      &nbsp;&nbsp;
      <button v-loading="favoriteLoading" class="btn btn-sm btn-outline-primary" @click="articlesFavorite">
        <i class="ion-heart" />&nbsp;{{ article.favorited ? 'Unfavorite article' : 'Favorite article' }}
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { profileFollowApi, profileFollowDeleteApi } from '@/api/profiles'
import { Profile } from '@/api/profiles.d'
import { articlesSlugFavoriteApi, articlesSlugFavoriteDeleteApi, articlesSlugDeleteApi } from '@/api/article'

export default Vue.extend({
  name: 'PanelAuthor',
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      followLoading: false,
      favoriteLoading: false,
      deleteLoading: false,
    }
  },
  computed: {
    author (): Profile {
      return this.article.author
    },
    isMy (): boolean {
      return this.$store.state.user.username === this.author.username
    },
  },
  methods: {
    async profileFollow () {
      this.followLoading = true
      try {
        const following = this.author.following
        if (following) await profileFollowDeleteApi(this.author.username)
        else await profileFollowApi(this.author.username)
        this.$emit('changeFollowing', !following)
      } catch (err) {}
      this.followLoading = false
    },
    async articlesFavorite () {
      this.favoriteLoading = true
      try {
        const favorite = this.article.favorited
        let data
        if (favorite) data = await articlesSlugFavoriteDeleteApi(this.article.slug)
        else data = await articlesSlugFavoriteApi(this.article.slug)
        console.log(data)

        this.$emit('changeArticle', data.article)
      } catch (err) {}
      this.favoriteLoading = false
    },
    async articleDelete () {
      this.deleteLoading = true
      await articlesSlugDeleteApi(this.article.slug)
      this.$router.back()
    }
  },
})
</script>

<style scoped>

</style>
