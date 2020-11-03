<template>
  <div>
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
          item.path === '/' || item.path === '/home'
            ? undefined
            : item.meta.title
        "
        :name="item.path"
      >
        <q-icon v-if="item.path === '/' || item.path === '/home'" size="20px">
          <svg
            class="icon"
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M230.857 962.651H793.6c60.855 0 96.42-34.304 96.42-94.72V476.635l55.278 50.579c9.015 8.576 18.871 14.573 30.867 14.573 20.132 0 36.425-12.434 36.425-33.005 0-12.855-4.718-20.992-12.855-28.288L851.017 344.63V92.233c0-18.852-11.995-30.866-30.848-30.866h-56.137c-18.432 0-31.305 12.014-31.305 30.866v144.86L563.456 82.798c-14.994-13.715-33.006-21.413-51.438-21.413-18.432 0-36.425 7.698-51.42 21.413L24.303 480.512c-7.717 7.296-12.855 15.433-12.855 28.288 0 20.571 16.274 33.006 36.425 33.006 12.434 0 22.29-5.998 30.866-14.574l55.278-50.14V867.95c0 60.416 35.584 94.72 96.86 94.72zM635.43 609.08c0-19.712-12.855-32.146-32.567-32.146H421.12c-19.712 0-32.987 12.434-32.987 32.146v284.544h-142.72c-27.429 0-42.423-14.994-42.423-42.862v-436.7l294.016-267.83c4.279-4.279 9.417-6.857 14.994-6.857s10.715 2.14 15.433 6.857l293.559 267.867v436.7c0 27.867-14.994 42.861-41.984 42.861h-143.58z"
            />
          </svg>
        </q-icon>
        <q-icon
          v-if="!item.meta || !item.meta.affix"
          name="close"
          class="close"
          @click.prevent.stop="closeTab(item)"
        ></q-icon>
        <q-menu context-menu>
          <q-list style="min-width: 100px;">
            <q-item
              v-if="item.path === active"
              clickable
              v-close-popup
              @click="refreshCurrentView"
            >
              <q-item-section>刷新</q-item-section>
            </q-item>
            <q-item
              v-if="!item.meta || !item.meta.affix"
              clickable
              v-close-popup
              @click="closeTab(item)"
            >
              <q-item-section>关闭</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="closeOtherTabs(item)">
              <q-item-section>关闭其它</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="closeAllTabs">
              <q-item-section>关闭全部</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-tab>
    </q-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import path from "path";

export default {
  name: "Tabbar",
  data() {
    return {
      active: "",
      affixTabs: [],
      visible: false,
      top: 0,
      left: 0
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
          const currentActiveIndex = tabIndex > 0 ? tabIndex - 1 : tabIndex + 1;
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
    },
    closeOtherTabs(tab) {
      this.$store.dispatch("tab/delOtherViews", tab).then(() => {
        if (this.active !== tab.path) {
          this.active = tab.path;
        }
      });
    },
    closeAllTabs() {
      this.$store.dispatch("tab/delAllViews").then(({ tabList }) => {
        if (tabList.some(item => item.path === this.active)) {
          return;
        }
        this.active = tabList[tabList.length - 1].path;
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
