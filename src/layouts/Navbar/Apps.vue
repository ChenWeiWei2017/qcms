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
          <div class="item">
            <q-icon name="desktop_windows" class="text-primary"></q-icon>
            <span>管理中心</span>
          </div>
          <div class="item">
            <q-icon name="far fa-newspaper" class="text-secondary"></q-icon>
            <span>内容中心</span>
          </div>
          <div class="item">
            <q-icon name="security" class="text-amber"></q-icon>
            <span>系统监控</span>
          </div>
          <div class="item">
            <q-icon name="web" class="text-blue-grey"></q-icon>
            <span>模块管理</span>
          </div>
          <div class="item">
            <q-icon name="medical_services" class="text-positive"></q-icon>
            <span>辅助系统</span>
          </div>
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: "Apps"
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

    &:hover {
      cursor: pointer;
      background-color: #e8f0fe;
      border: none;
      border-radius: 8px;
      z-index: 1;
    }
  }
}
</style>
