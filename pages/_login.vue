<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ showTitle }}
          </h1>
          <p class="text-xs-center">
            <n-link :to="isLoginPage ? '/register' : '/login'">
              {{ isLoginPage ? 'Need an account?' : 'Have an account?' }}
            </n-link>
          </p>

          <ul v-for="(value, key) in errors" :key="key" class="error-messages">
            <li v-for="item in value" :key="item">
              {{ `${key} ${item}` }}
            </li>
          </ul>

          <form @submit.prevent="submit">
            <fieldset v-if="!isLoginPage" class="form-group">
              <input
                v-model="name"
                v-loading="loading"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="email"
                v-loading="loading"
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                required
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                v-model="password"
                v-loading="loading"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                required
              >
            </fieldset>
            <button v-loading="loading" class="btn btn-lg btn-primary pull-xs-right" formType="submit">
              {{ showTitle }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PageLogin',
  // middleware: 'auth',
  validate ({ params: { login } }) {
    return ['login', 'register'].includes(login)
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      errors: {},
      loading: false,
    }
  },
  head () {
    return {
      title: `${this.$route.params.login} - Conduit`
    }
  },
  computed: {
    isLoginPage (): boolean {
      return this.$route.params.login === 'login'
    },
    showTitle (): string {
      return this.isLoginPage ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    async submit () {
      try {
        this.loading = true
        await this.$store.dispatch(
          this.isLoginPage ? 'user/login' : 'user/register',
          this.isLoginPage
            ? {
                email: this.email,
                password: this.password,
              }
            : {
                email: this.email,
                password: this.password,
                username: this.name,
              }
        )
        this.$router.replace('/')
      } catch (err: any) {
        this.errors = err.response.data.errors
      }
      this.loading = false
    }
  }
})
</script>

<style scoped>
</style>
