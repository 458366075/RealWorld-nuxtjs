<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <n-link class="navbar-brand" to="/">
          conduit
        </n-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <n-link class="nav-link" :class="{'active': $route.name === 'index'}" to="/">
              Home
            </n-link>
          </li>
          <template v-if="user.username">
            <li class="nav-item">
              <n-link class="nav-link" to="/editor" exact-active-class="active">
                <i class="ion-compose" />&nbsp;New Article
              </n-link>
            </li>
            <li class="nav-item">
              <n-link class="nav-link" to="/settings" exact-active-class="active">
                <i class="ion-gear-a" />&nbsp;Settings
              </n-link>
            </li>
            <li class="nav-item">
              <n-link
                exact
                class="nav-link ng-binding active"
                ui-sref-active="active"
                :to="{
                  name: 'profile-username-favorites',
                  params: {
                    username: user.username
                  },
                }"
              >
                <img class="user-pic" :src="avatar">
                {{ user.username }}
              </n-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <n-link class="nav-link" to="/login" exact-active-class="active">
                Sign in
              </n-link>
            </li>
            <li class="nav-item">
              <n-link class="nav-link" to="/register" exact-active-class="active">
                Sign up
              </n-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>

    <nuxt />

    <!-- 页脚 -->
    <footer>
      <div class="container">
        <n-link to="/" class="logo-font">
          conduit
        </n-link>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  computed: {
    user () {
      return this.$store.state.user
    },
    avatar () {
      return this.user?.image
    }
  }
})
</script>
