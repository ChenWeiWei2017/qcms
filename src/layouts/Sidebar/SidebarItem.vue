<template>
  <div v-if="!item.hidden">
    <template v-if="item.children && item.children.length">
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(item.path)"
      />
      <q-separator inset class="q-my-sm" />
    </template>
    <q-item
      v-else
      class="cd__drawer-item"
      v-ripple
      clickable
      :active="isActive(item)"
      :to="resolvePath(item.path)"
      exact
      active-class="active"
    >
      <q-item-section avatar>
        <q-icon :name="item.meta.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.meta.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
import path from "path";

export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    },
    isActive(item) {
      return this.resolvePath(item.path) == this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
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
