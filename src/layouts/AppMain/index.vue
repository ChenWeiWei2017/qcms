<template>
  <q-page-container>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </q-page-container>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tab.cachedTabs;
    },
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped></style>
