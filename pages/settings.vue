<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            Your Settings
          </h1>

          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.image"
                  v-loading="loading"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.username"
                  v-loading="loading"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.bio"
                  v-loading="loading"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.email"
                  v-loading="loading"
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.password"
                  v-loading="loading"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                >
              </fieldset>
              <button
                v-loading="loading"
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSettings"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { UserType } from '@/api/user.d'

export default Vue.extend({
  name: 'PageSettings',
  data () {
    return {
      form: {} as UserType,
      loading: false,
    }
  },
  mounted () {
    this.form = {
      ...this.$store.state.user
    }
  },
  methods: {
    async updateSettings () {
      this.loading = true
      await this.$store.dispatch('user/edit', this.form)
      this.$router.push(`/profile/${this.form.username}/`)
      this.loading = false
    }
  }
})
</script>

<style scoped>

</style>
