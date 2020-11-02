<template>
  <q-drawer
    :value="collapse"
    show-if-above
    bordered
    content-class="bg-white"
    :width="280"
  >
    <q-scroll-area class="fit">
      <q-toolbar class="logo">
        <q-toolbar-title class="row items-center text-grey-8">
          <img src="@/assets/img/logo.png" />
        </q-toolbar-title>
      </q-toolbar>
      <q-list padding class="text-grey-8">
        <sidebar-item
          v-for="item in currentModule.children"
          :key="item.path"
          :item="item"
          :base-path="currentModule.path"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
import { mapState } from "vuex";
import SidebarItem from "./SidebarItem";

export default {
  name: "Sidebar",
  components: {
    SidebarItem
  },
  computed: {
    ...mapState({
      collapse: state => state.app.collapse,
      currentModule: state => state.app.currentModule
    })
  }
};
</script>

<style lang="scss" scoped>
.logo {
  height: 64px;

  img {
    padding-left: 4px;
  }
}

.q-item {
  &.active {
    background: #e6f1fc;

    .q-icon,
    .q-item__label {
      color: var(--q-color-primary);
    }
  }
}
</style>
