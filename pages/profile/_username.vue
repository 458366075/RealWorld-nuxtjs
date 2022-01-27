<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div v-if="profile" class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img">
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <button
              v-if="isMy"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="$router.push('/settings')"
            >
              <i class="ion-gear-a" />
              &nbsp;
              Edit Profile Settings
            </button>
            <button
              v-else
              v-loading="loading"
              class="btn btn-sm btn-outline-secondary action-btn"
              @click="profileFollow"
            >
              <i class="ion-plus-round" />
              &nbsp;
              {{ profile.following ? 'Unfollow Gerome' : 'Follow Gerome' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <n-link class="nav-link" exact-active-class="active" :to="`/profile/${profile.username}`">
                  My Articles
                </n-link>
              </li>
              <li class="nav-item">
                <n-link class="nav-link" exact-active-class="active" :to="`/profile/${profile.username}/favorites`">
                  Favorited Articles
                </n-link>
              </li>
            </ul>
          </div>

          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { profileApi, profileFollowApi, profileFollowDeleteApi } from '@/api/profiles'
import { Profile } from '@/api/profiles.d'

export default Vue.extend({
  name: 'PageUserName',
  asyncData ({ params }) {
    try {
      const username = params.username
      return profileApi(username)
    } catch (err: any) {
      console.log(err)
    }
  },
  data () {
    return {
      loading: false,
      profile: {} as Profile,
    }
  },
  head () {
    return {
      title: `${this.$route.params.username} - Conduit`
    }
  },
  computed: {
    isMy (): boolean {
      return this.$store.state.user.username === this.username
    },
    username () {
      return this.$route.params.username
    }
  },
  methods: {
    async profileFollow () {
      this.loading = true
      try {
        const username = this.profile.username
        const following = this.profile.following
        let data
        if (following) data = await profileFollowDeleteApi(username)
        else data = await profileFollowApi(username)
        this.profile = data.profile
      } catch (err) {}
      this.loading = false
    },
  },
})
</script>

<style scoped>

</style>
