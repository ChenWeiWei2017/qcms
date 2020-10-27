<template>
  <q-toolbar class="cd__toolbar">
    <q-btn
      flat
      dense
      round
      @click="toggleSideBar"
      aria-label="Menu"
      icon="menu"
      class="q-mr-sm"
    />

    <q-toolbar-title
      v-if="$q.screen.gt.xs"
      shrink
      class="row items-center no-wrap"
    >
      <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg" />
      <span class="q-ml-sm">News</span>
    </q-toolbar-title>

    <q-space />

    <!-- <q-space /> -->

    <div class="q-gutter-sm row items-center no-wrap">
      <q-btn
        v-if="$q.screen.gt.sm"
        round
        dense
        flat
        color="text-grey-7"
        icon="apps"
      >
        <q-tooltip>Google Apps</q-tooltip>
      </q-btn>
      <screenfull />
      <q-btn round dense flat color="grey-8" icon="notifications">
        <q-badge color="red" text-color="white" floating>
          2
        </q-badge>
        <q-tooltip>Notifications</q-tooltip>
      </q-btn>
      <q-btn round flat>
        <q-avatar size="26px">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <q-tooltip>Account</q-tooltip>
      </q-btn>
    </div>
  </q-toolbar>
</template>

<script>
import { mapState } from "vuex";
import Screenfull from "./Screenfull";

export default {
  name: "Navbar",
  components: {
    Screenfull
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse
    })
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSidebar");
    }
  }
};
</script>

<style lang="scss" scoped></style>
