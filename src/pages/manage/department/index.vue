<template>
  <q-page padding>
    <div class="row q-col-gutter-x-md">
      <div class="col-3">
        <q-card>
          <q-card-section>
            <div class="text-h6 dept-title">部门总览</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-tree
              ref="deptTree"
              :nodes="departments"
              node-key="id"
              label-key="name"
              selected-color="primary"
              :selected.sync="selected"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-9">
        <q-card>
          <q-card-section class="row no-wrap items-center">
            <q-breadcrumbs>
              <q-breadcrumbs-el label="部门管理" />
              <q-breadcrumbs-el
                v-for="item in deptPath"
                :key="item"
                :label="item"
              />
            </q-breadcrumbs>
            <q-space />
            <q-btn-group class="dept-action">
              <q-btn
                icon="edit"
                text-color="gray"
                label="编辑"
                @click="showEditDialog"
              />
              <q-btn
                icon="delete"
                text-color="red"
                label="删除"
                @click="onDelete"
              />
              <q-btn
                icon="add"
                text-color="primary"
                label="添加子部门"
                @click="showAdd = true"
              />
            </q-btn-group>
          </q-card-section>
          <q-separator />
          <q-card-section class="row">
            <template v-if="currentDept">
              <q-avatar
                rounded
                color="primary"
                text-color="white"
                size="92px"
                font-size="82px"
                :icon="currentDept.icon"
              />
              <div class="dept-detail">
                <p class="text-h6">{{ currentDept.name }}</p>
                <p class="text-caption">描述：{{ currentDept.description }}</p>
                <p class="text-caption">
                  显示顺序：{{
                    currentDept.displayOrder
                  }}
                  &nbsp;&nbsp;&nbsp;&nbsp;是否禁用：{{
                    currentDept.status ? "是" : "否"
                  }}
                </p>
                <p class="text-caption">
                  创建时间：{{ currentDept.createTime }}
                </p>
              </div>
            </template>
            <template v-else>
              未选择部门
            </template>
          </q-card-section>
          <template v-if="currentDept">
            <q-separator />
            <q-card-section>
              <department-user-table :department-id="currentDept.id" />
            </q-card-section>
          </template>
        </q-card>
      </div>
    </div>
    <q-dialog
      v-model="showEdit"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 350px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">修改部门信息</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form v-if="edit" @submit="onChange" class="q-gutter-md">
            <q-input v-model="edit.name" label="部门名称" />
            <q-toggle
              :label="edit.status ? '禁用' : '启用'"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :false-value="1"
              :true-value="0"
              v-model="edit.status"
            />
            <q-input v-model="edit.description" label="部门描述" autogrow />
            <div class="dialog-btn">
              <q-btn
                label="取消"
                color="white"
                text-color="black"
                v-close-popup
                @click="cancelEdit"
              />
              <q-btn label="修改" color="primary" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="showAdd"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="min-width: 350px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">新增部门</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-form @submit="onAdd" class="q-gutter-md">
            <q-input
              v-model="add.name"
              label="部门名称"
              lazy-rules
              :rules="[val => (val && val.length > 0) || '部门名称不能为空']"
            />
            <q-toggle
              :label="add.status ? '禁用' : '启用'"
              checked-icon="check"
              color="green"
              unchecked-icon="clear"
              :false-value="1"
              :true-value="0"
              v-model="add.status"
            />
            <q-input v-model="add.description" label="部门描述" autogrow />
            <div class="dialog-btn">
              <q-btn
                label="取消"
                color="white"
                text-color="black"
                v-close-popup
                @click="cancelAdd"
              />
              <q-btn label="新增" color="primary" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { getDepartments } from "@/api/manage";
import { isEmpty } from "@/utils/stringutil";
import {
  updateDepartment,
  createDepartment,
  deleteDepartment
} from "@/api/manage";
import DepartmentUserTable from "./DepartmentUserTable";

export default {
  name: "Department",
  components: {
    DepartmentUserTable
  },
  data() {
    return {
      text: "",
      departments: [],
      selected: null,
      currentDept: null,
      showEdit: false,
      edit: {},
      showAdd: false,
      add: {
        name: "",
        description: "",
        status: 0,
        parentId: 0
      }
    };
  },
  computed: {
    deptPath() {
      if (this.currentDept == null) {
        return null;
      }
      let path = [];
      let parentId = this.currentDept.parentId;
      path.unshift(this.currentDept.name);
      while (parentId != 0) {
        let node = this.$refs.deptTree.getNodeByKey(parentId);
        path.unshift(node.name);
        parentId = node.parentId;
      }
      return path;
    }
  },
  watch: {
    selected: {
      handler(val) {
        this.currentDept = this.$refs.deptTree.getNodeByKey(val);
        this.edit = { ...this.currentDept };
      }
    }
  },
  created() {
    this.initDepartments();
  },
  methods: {
    initDepartments() {
      getDepartments().then(response => {
        this.departments = response.data;
        this.handleNodes(this.departments);
      });
    },
    handleNodes(nodes) {
      nodes.forEach(node => {
        if (!node.children || !node.children.length) {
          node.icon = "home";
        } else {
          node.icon = "business";
          this.handleNodes(node.children);
        }
      });
    },
    showEditDialog() {
      if (this.currentDept) {
        this.showEdit = true;
        return;
      }
      this.$toast.fire({
        title: "未选择部门",
        icon: "warning"
      });
    },
    onChange() {
      let param = {};
      if (
        !isEmpty(this.edit.name) &&
        this.edit.name !== this.currentDept.name
      ) {
        param.name = this.edit.name;
      }
      if (
        !isEmpty(this.edit.description) &&
        this.edit.description !== this.currentDept.description
      ) {
        param.description = this.edit.description;
      }
      if (this.edit.status !== this.currentDept.status) {
        param.status = this.edit.status;
      }
      if (!Object.keys(param).length) {
        this.showEdit = false;
        setTimeout(() => {
          this.$toast.fire({
            title: "未修改任何信息",
            icon: "warning"
          });
        }, 500);
      } else {
        param.id = this.currentDept.id;
        this.showEdit = false;
        updateDepartment(param).then(() => {
          Object.assign(this.currentDept, param);
          setTimeout(() => {
            this.$toast.fire({
              title: "修改成功",
              icon: "success"
            });
          }, 500);
        });
      }
    },
    cancelEdit() {
      this.edit = { ...this.currentDept };
    },
    onAdd() {
      if (!this.currentDept) {
        this.add.parentId = 0;
      } else {
        this.add.parentId = this.currentDept.id;
      }
      this.showAdd = false;
      createDepartment(this.add).then(() => {
        this.initDepartments();
        this.cancelAdd();
        setTimeout(() => {
          this.$toast.fire({
            title: "新增成功",
            icon: "success"
          });
        }, 500);
      });
    },
    cancelAdd() {
      this.add.name = "";
      this.add.status = 0;
      this.add.parentId = 0;
      this.add.description = "";
    },
    onDelete() {
      if (!this.currentDept) {
        this.$toast.fire({
          title: "请选择需要删除的部门",
          icon: "warning"
        });
        return;
      }
      this.$swal
        .fire({
          title: "确定删除？",
          text: "您将无法恢复它！",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "删除",
          cancelButtonText: "取消"
        })
        .then(result => {
          if (result.isConfirmed) {
            deleteDepartment(this.currentDept.id).then(() => {
              this.initDepartments();
              this.$toast.fire({
                title: "删除成功",
                icon: "success"
              });
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>

<style lang="scss">
.dept-title {
  line-height: 36px;
}

.dept-detail {
  margin-left: 20px;
  p {
    margin-bottom: 0;
  }
}

.dept-action {
  .on-left {
    margin-right: 6px;
  }
}
.actions {
  padding-right: 16px;
}

.dialog-btn {
  text-align: right;
  button + button {
    margin-left: 5px;
  }
}

.q-dialog__inner {
  .q-toggle__inner {
    margin-left: -12px;
  }
}
</style>
