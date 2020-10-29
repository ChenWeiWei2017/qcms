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

    <nav-breadcrumb />

    <q-space />

    <!-- <q-space /> -->

    <div class="q-gutter-sm row items-center no-wrap">
      <apps />
      <screenfull />
      <q-btn round dense flat color="grey-8" icon="notifications">
        <q-badge color="red" text-color="white" floating>
          2
        </q-badge>
        <q-tooltip>Notifications</q-tooltip>
      </q-btn>
      <user-info />
    </div>
  </q-toolbar>
</template>

<script>
import { mapState } from "vuex";
import Screenfull from "./Screenfull";
import NavBreadcrumb from "./NavBreadcrumb";
import Apps from "./Apps";
import UserInfo from "./UserInfo";

export default {
  name: "Navbar",
  components: {
    Screenfull,
    NavBreadcrumb,
    UserInfo,
    Apps
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

<style lang="scss" scoped>
.q-breadcrumbs {
  font-size: 15px;
  margin-left: 10px;

  a.q-breadcrumbs__el {
    &:hover {
      transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      color: var(--q-color-primary);
    }
  }
}
</style>
