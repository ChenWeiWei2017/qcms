<template>
  <q-breadcrumbs active-color="black">
    <q-breadcrumbs-el
      v-for="(item, index) in levelList"
      :key="item.path"
      :label="item.meta.title"
      :to="
        item.redirect === 'noRedirect' || index == levelList.length - 1
          ? undefined
          : item.path
      "
    />
  </q-breadcrumbs>
</template>

<script>
import { compile } from "path-to-regexp";
export default {
  name: "NavBreadcrumb",
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route(route) {
      // 如果是重定向，则不更新
      if (route.path.startsWith("/redirect/")) {
        return;
      }
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!this.isHome(first)) {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "Home".toLocaleLowerCase();
    },
    pathCompile(path) {
      // 用于将一些类似 /user/:name 的路由转换成一个常规的路由
      const { params } = this.$route;
      var toPath = compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style lang="scss">
a.q-breadcrumbs__el {
  color: #000 !important;

  &:hover {
    color: var(--q-color-primary) !important;
    transition: 0.2s;
  }
}
span.q-breadcrumbs__el {
  color: #616161 !important;
}
</style>
