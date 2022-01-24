<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ showTitle }}
          </h1>
          <p class="text-xs-center">
            <a href="">{{ isLogin ? 'Need an account?' : 'Have an account?' }}</a>
          </p>

          <ul v-for="(value, key) in errors" :key="key" class="error-messages">
            <li v-for="item in value" :key="item">
              {{ `${key} ${item}` }}
            </li>
          </ul>

          <form @submit.prevent="submit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="name" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" formType="submit">
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
    }
  },
  head () {
    return {
      title: `${this.$route.params.login} - conduit`
    }
  },
  computed: {
    isLogin (): boolean {
      return this.$route.params.login === 'login'
    },
    showTitle (): string {
      return this.isLogin ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    async submit () {
      try {
        await this.$store.dispatch(
          this.isLogin ? 'user/requestLogin' : 'user/requestRegister',
          this.isLogin
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
    }
  }
})
</script>

<style scoped>
</style>
