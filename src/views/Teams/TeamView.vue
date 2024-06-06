<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'OrgView',
  computed: {
    ...mapState(['currentOrg']),
  },
};
</script>

<style scoped>
</style>
