<template>
  <q-layout view="lHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <navbar />
      <tabbar />
    </q-header>

    <sidebar />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Tabbar from "./Tabbar";

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
    Tabbar
  },
  data() {
    return {};
  }
};
</script>

<style lang="sass">
.cd
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 55%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      .q-icon
        color: #5f6368
    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
</style>
