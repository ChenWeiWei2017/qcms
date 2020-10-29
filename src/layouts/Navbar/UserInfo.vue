<template>
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
</template>

<script>
export default {
  name: "UserInfo"
};
</script>

<style lang="scss" scoped>
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
</style>
