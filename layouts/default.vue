<template>
  <div>
    <!-- 导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <n-link class="nav-link" to="/" active-class="active" exact>
              Home
            </n-link>
          </li>
          <template v-if="$store.state.user.user">
            <li class="nav-item">
              <n-link class="nav-link" to="" active-class="active" exact>
                <i class="ion-compose" />&nbsp;New Article
              </n-link>
            </li>
            <li class="nav-item">
              <n-link class="nav-link" to="/settings" active-class="active" exact>
                <i class="ion-gear-a" />&nbsp;Settings
              </n-link>
            </li>
            <li class="nav-item">
              <a class="nav-link ng-binding active" ui-sref-active="active" href="#/@cong">
                <img class="user-pic" ng-src="https://api.realworld.io/images/smiley-cyrus.jpeg" src="https://api.realworld.io/images/smiley-cyrus.jpeg">
                cong
              </a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <n-link class="nav-link" to="/login" active-class="active" exact>
                Sign in
              </n-link>
            </li>
            <li class="nav-item">
              <n-link class="nav-link" to="/register" active-class="active" exact>
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
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from
          <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  </div>
</template>
