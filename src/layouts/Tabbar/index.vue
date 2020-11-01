<template>
  <q-tabs
    v-model="active"
    align="left"
    inline-label
    switch-indicator
    class="border normal"
  >
    <q-tab
      v-for="item in tabList"
      :key="item.path"
      :class="{ affix: item.meta && item.meta.affix }"
      :label="
        item.path === '/' || item.path === '/home' ? undefined : item.meta.title
      "
      :icon="item.path === '/' || item.path === '/home' ? 'home' : undefined"
      :name="item.path"
      exact
    >
      <q-icon
        v-if="!item.meta || !item.meta.affix"
        name="close"
        class="close"
        @click.prevent.stop="closeTab(item)"
      ></q-icon>
    </q-tab>
  </q-tabs>
</template>

<script>
import { mapState } from "vuex";
import path from "path";

export default {
  name: "Tabbar",
  data() {
    return {
      active: "",
      affixTabs: []
    };
  },
  computed: {
    ...mapState({
      tabList: state => state.tab.tabList,
      routes: state => state.permission.routes
    })
  },
  watch: {
    active: {
      // 切换tab时，跳转到不同的路由
      handler(val) {
        if (val && val !== "") {
          this.$router.push(val);
        } else {
          this.$router.push("/");
        }
      }
    },
    $route: {
      handler() {
        this.addTab();
      }
    }
  },
  mounted() {
    this.initTabs();
    this.addTab();
  },
  methods: {
    filterAffixTabs(routes, basePath = "/") {
      let tabs = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tabPath = path.resolve(basePath, route.path);
          tabs.push({
            fullPath: tabPath,
            path: tabPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTabs = this.filterAffixTabs(route.children, route.path);
          if (tempTabs.length > 0) {
            tabs = [...tabs, ...tempTabs];
          }
        }
      });
      return tabs;
    },
    initTabs() {
      // 把固定的页面先加载出来
      const affixTabs = (this.affixTabs = this.filterAffixTabs(this.routes));
      for (const tab of affixTabs) {
        if (tab.name) {
          // 路由必须有名称
          this.$store.dispatch("tab/addView", tab);
        }
      }
    },
    addTab() {
      // 当访问一个新路由时，将其加载到TabBar上
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("tab/addView", this.$route);
        this.active = this.$route.path;
      }
    },
    closeTab(tab) {
      if (tab.path === this.active) {
        // 关闭当前页，需要切换当前页
        if (this.tabList.length <= 1) {
          this.active = "";
        } else {
          const tabIndex = this.tabList.findIndex(
            item => item.path === tab.path
          );
          const currentActiveIndex =
            tabIndex === this.tabList.length - 1 ? tabIndex - 1 : tabIndex + 1;
          this.active = this.tabList[currentActiveIndex].path;
        }
      }
      this.$store.dispatch("tab/delView", tab);
    },
    // 刷新当前页面
    refreshCurrentView() {
      this.$store.dispatch("tab/delCachedTab", this.$route).then(() => {
        const { fullPath } = this.$route;
        this.$nextTick(() => {
          this.$router.replace({
            path: "/redirect" + fullPath
          });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.q-tabs {
  &.border {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
  }

  &.normal {
    color: #2c3e50 !important;
  }

  .q-tab {
    border-right: 1px solid rgba(0, 0, 0, 0.12);
    padding-right: 30px;

    &.affix {
      padding-right: 16px;
    }

    .close {
      position: absolute;
      right: -20px;
      top: 50%;
      margin: -7px 0 0;
      width: 16px;
      height: 16px;
      line-height: 16px;
      border-radius: 50%;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      color: #4c5b69;
      transition: all 0.2s;
      -webkit-transition: all 0.2s;

      &:hover {
        background-color: #ff5722;
        color: #fff;
      }
    }
  }
}
</style>

<style lang="scss">
.q-tab {
  &.q-tab--active {
    .q-focus-helper {
      background: currentColor;
      opacity: 0.08;
    }
  }

  .q-tab__content {
    min-width: auto;
  }
}
</style>
