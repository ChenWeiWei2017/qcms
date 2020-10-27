<template>
  <q-btn
    v-if="$q.screen.gt.sm"
    round
    dense
    flat
    color="text-grey-7"
    :icon="icon"
    @click="fullScreen"
  >
    <q-tooltip>{{ tips }}</q-tooltip>
  </q-btn>
</template>

<script>
export default {
  name: "Screenfull",
  computed: {
    tips() {
      return this.full ? "取消全屏" : "全屏";
    },
    icon() {
      return this.full ? "fullscreen_exit" : "fullscreen";
    }
  },
  data() {
    return {
      full: false
    };
  },
  methods: {
    fullScreen() {
      if (!this.full) {
        this.$q.fullscreen.request();
      } else {
        this.$q.fullscreen.exit();
      }
      this.full = !this.full;
    }
  }
};
</script>

<style lang="scss" scoped></style>
