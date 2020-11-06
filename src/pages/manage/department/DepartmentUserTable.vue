<template>
  <q-table
    title="部门用户"
    :loading="loading"
    :columns="columns"
    row-key="id"
    :data="data"
    @request="onRequest"
    :rows-per-page-options="[10, 20]"
    :pagination.sync="pagination"
  >
    <template v-slot:body-cell-avatar="props">
      <q-td :props="props">
        <q-avatar>
          <img :src="props.value" />
        </q-avatar>
      </q-td>
    </template>
    <template v-slot:no-data>
      <div class="full-width row flex-center text-gray q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span> 未查找到数据 </span>
      </div>
    </template>
  </q-table>
</template>

<script>
import { queryUser } from "@/api/manage";

export default {
  name: "DepartmentUserTable",
  props: {
    departmentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      columns: [
        {
          name: "avatar",
          // label: "头像",
          field: "avatar",
          align: "center",
          style: "width: 50px"
        },
        {
          name: "username",
          required: true,
          label: "登录名",
          field: "username",
          sortable: true,
          align: "left"
        },
        {
          name: "realName",
          label: "用户名",
          field: "realName",
          sortable: true,
          align: "left"
        },
        {
          name: "email",
          label: "邮箱",
          field: "email",
          align: "left"
        },
        {
          name: "phone",
          label: "电话",
          field: "phone",
          align: "left"
        },
        {
          name: "createTime",
          label: "创建时间",
          field: "createTime",
          align: "left"
        }
      ],
      data: []
    };
  },
  watch: {
    departmentId: {
      handler(val) {
        if (val) {
          this.onRequest();
        }
      },
      immediate: true
    }
  },
  methods: {
    onRequest() {
      let param = {
        departmentId: this.departmentId,
        ...this.pagination
      };
      this.loading = true;
      console.log(param);
      queryUser(param)
        .then(response => {
          this.loading = false;
          this.pagination.rowsNumber = response.data.total;
          this.data = response.data.list;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
