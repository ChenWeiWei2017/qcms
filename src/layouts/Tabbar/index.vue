<template>
  <q-tabs
    v-model="active"
    align="left"
    inline-label
    switch-indicator
    class="border normal"
  >
    <q-tab name="mails" icon="home" class="affix" />
    <q-tab name="alarms" label="用户管理">
      <q-icon
        name="close"
        class="close"
        @click.prevent.stop="closeTab"
      ></q-icon>
    </q-tab>
    <q-tab name="movies" label="部门管理">
      <q-icon
        name="close"
        class="close"
        @click.prevent.stop="closeTab"
      ></q-icon>
    </q-tab>
    <q-tab name="photos" label="角色管理">
      <q-icon
        name="close"
        class="close"
        @click.prevent.stop="closeTab"
      ></q-icon>
    </q-tab>
    <q-tab name="videos" label="日志管理">
      <q-icon
        name="close"
        class="close"
        @click.prevent.stop="closeTab"
      ></q-icon>
    </q-tab>
    <q-tab name="addressbook" label="用户授权">
      <q-icon
        name="close"
        class="close"
        @click.prevent.stop="closeTab"
      ></q-icon>
    </q-tab>
  </q-tabs>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: "mails",
      tabs: [
        {
          name: "首页",
          path: "/",
          meta: {
            title: "",
            affix: true
          }
        }
      ]
    };
  },
  methods: {
    closeTab() {
      console.log("close");
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
