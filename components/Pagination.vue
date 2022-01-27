<template>
  <nav v-if="totalPage > 1">
    <ul class="pagination">
      <li v-for="item in totalPage" :key="item" class="page-item" :class="{ 'active': page === item }">
        <nuxt-link
          class="page-link"
          :to="{ query: { page: item } }"
        >
          {{ item }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Pagination',
  props: {
    totalPage: {
      type: Number,
      required: true,
    }
  },
  computed: {
    page (): number {
      return +this.$route.query.page as number || 1
    }
  }
})
</script>

<style scoped>

</style>
