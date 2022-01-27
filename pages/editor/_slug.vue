<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="form.title"
                  v-loading="loading"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                >
              </fieldset>

              <fieldset class="form-group">
                <input
                  v-model="form.description"
                  v-loading="loading"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                >
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="form.body"
                  v-loading="loading"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-loading="loading"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter="addTag"
                >
                <div class="tag-list">
                  <span
                    v-for="(item, index) in form.tagList"
                    :key="index"
                    class="tag-default tag-pill ng-binding"
                  >
                    <i class="ion-close-round" @click="form.tagList.splice(index, 1)" />
                    {{ item }}
                  </span>
                </div>
              </fieldset>
              <button
                v-loading="loading"
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="articleNew"
              >
                Publish Article
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
import { articlesSlugApi, articlesSlugNewApi } from '@/api/article'

export default Vue.extend({
  name: 'PageEditor',
  data () {
    return {
      loading: false,
      form: {
        title: '',
        description: '',
        body: '',
        tagList: [] as string[],
      }
    }
  },
  head: {
    title: 'Editor - Conduit'
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  async mounted () {
    if (!this.slug) return
    try {
      this.loading = true
      const { article } = await articlesSlugApi(this.slug)
      this.form = article
    } catch (err) {
      this.$router.push('/')
    }
    this.loading = false
  },
  methods: {
    async articleNew () {
      try {
        this.loading = true
        await articlesSlugNewApi(this.form)
      } catch (err) {}
      this.loading = false
    },
    addTag (e: { target: HTMLInputElement }) {
      this.form.tagList.push(e.target.value)
      e.target.value = ''
    }
  },
})
</script>

<style scoped>

</style>
