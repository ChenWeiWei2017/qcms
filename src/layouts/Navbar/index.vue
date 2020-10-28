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

    <q-breadcrumbs active-color="black">
      <q-breadcrumbs-el label="首页" to="/" />
      <q-breadcrumbs-el label="管理中心" />
      <q-breadcrumbs-el label="用户管理" />
    </q-breadcrumbs>

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
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <div class="no-wrap q-pa-md items-center info">
            <q-avatar size="80px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="name text-h6">陈伟伟</div>
            <div class="role text-subtitle2">管理员</div>
          </div>

          <q-separator />

          <q-list style="min-width: 300px">
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="person" />
              </q-item-section>
              <q-item-section>个人信息</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="security" />
              </q-item-section>
              <q-item-section>修改密码</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>设置中心</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section>退出登录</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
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

.q-menu {
  .info {
    text-align: center;

    .q-avatar {
      margin-bottom: 10px;
    }

    .name {
      color: #202124;
    }

    .role {
      color: #5f6368;
    }
  }
}
</style>
