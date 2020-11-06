<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md">
      <div class="col">
        <q-card class="toolbar-head">
          <q-card-section class="row no-wrap items-center">
            <div class="text-subtitle1">用户一览</div>

            <q-space />

            <div class="action-btns">
              <q-btn color="primary" label="新增用户" />
            </div>

            <div class="user-search">
              <q-input
                v-model="search"
                outlined
                placeholder="检索用户"
                dense
                type="search"
                @keyup.enter="onSearch"
              >
                <template v-slot:append>
                  <q-icon name="search" @click="onSearch" class="search-btn" />
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
        <div class="search-result">
          <div class="text-subtitle2">
            检索到 0 条结果。
          </div>
        </div>
      </div>
      <div class="col-4" v-show="true">
        <q-card class="user-info">
          <q-card-section>
            用户信息
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { isEmpty } from "@/utils/stringutil";

export default {
  name: "User",
  data() {
    return {
      search: "",
      results: [
        {
          id: 1,
          name: "CD20180160",
          realName: "陈伟伟",
          email: "1752083854@qq.com",
          phone: "17554167268",
          avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
          createTime: "2020-10-19 09:28:42",
          status: 0
        }
      ]
    };
  },
  methods: {
    onSearch() {
      if (isEmpty(this.search)) {
        this.$toast.fire({
          title: "请输入检索关键字",
          icon: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar-head {
  margin-bottom: 20px;
}

.action-btns {
  margin-right: 10px;

  .q-btn {
    height: 40px;
  }
}

.user-search {
  .search-btn {
    &:hover {
      cursor: pointer;
      color: var(--q-color-primary);
      transition: 0.2s all;
    }
  }
}
</style>
