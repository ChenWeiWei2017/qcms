<template>
  <q-btn
    v-if="$q.screen.gt.sm"
    round
    dense
    flat
    color="text-grey-7"
    icon="apps"
  >
    <q-menu transition-show="jump-down" transition-hide="jump-up" auto-close>
      <div class="q-pa-md apps">
        <div class="q-gutter-sm">
          <div
            v-for="item in modules"
            :key="item.path"
            :class="{ active: currentModule.path === item.path, item }"
            @click="changeModule(item)"
          >
            <q-icon :name="item.meta.icon" :class="item.meta.color"></q-icon>
            <span>{{ item.meta.title }}</span>
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Apps",
  computed: {
    ...mapState({
      modules: state =>
        state.permission.routes.filter(item => item.meta && item.meta.module),
      currentModule: state => state.app.currentModule
    })
  },
  watch: {
    $route: {
      handler(val) {
        if (
          !this.currentModule ||
          !val.path.startsWith(this.currentModule.path)
        ) {
          const change = this.modules.filter(item => {
            return val.path.startsWith(item.path);
          });
          if (change && change.length) {
            this.changeModule(change[0]);
          } else {
            this.changeModule(this.modules[0]);
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    changeModule(module) {
      if (!this.currentModule || this.currentModule.path !== module.path) {
        this.$store.dispatch("app/setCurrentModule", module);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.apps {
  width: 300px;
  .item {
    width: 84px;
    height: 84px;
    display: inline-block;
    text-align: center;

    .q-icon {
      display: block;
      margin-top: 10px;
      margin-bottom: 5px;
      width: 100%;
      height: 40px;
      font-size: 40px;
    }

    &:hover,
    &.active {
      cursor: pointer;
      background-color: #e8f0fe;
      border: none;
      border-radius: 8px;
      z-index: 1;
      transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
  }
}
</style>
