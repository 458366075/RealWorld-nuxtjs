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
              {{ key + item }}
            </li>
          </ul>

          <form @submit.prevent="submit">
            <fieldset v-if="!isLogin" class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ showTitle }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLogin',
  validate ({ params }) {
    return ['login', 'register'].includes(params.login)
  },
  data () {
    return {
      errors: {}
    }
  },
  computed: {
    isLogin () {
      return this.$route.params.login === 'login'
    },
    showTitle () {
      return this.isLogin ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    async submit () {
      const res = await loginApi()
      console.log(res)
    }
  }
}
</script>

<style scoped>
</style>
