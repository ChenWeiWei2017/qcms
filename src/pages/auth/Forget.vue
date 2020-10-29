<template>
  <div class="container">
    <q-card class="login-form">
      <q-card-section>
        <h1 class="title">重置密码</h1>
        <p class="subtitle">中国日报内容管理系统</p>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            clearable
            outlined
            v-model="resetForm.username"
            label="用户名"
            lazy-rules
            :rules="[val => (val && val.length > 0) || '请输入用户名']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>
          <q-input
            outlined
            :type="showPwd ? 'password' : 'text'"
            v-model="resetForm.password"
            label="密码"
            lazy-rules
            :rules="[val => (val !== null && val !== '') || '请输入密码']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPwd = !showPwd"
              />
            </template>
          </q-input>
          <q-input
            outlined
            :type="showPwd2 ? 'password' : 'text'"
            v-model="resetForm.confirm"
            label="确认密码"
            lazy-rules
            :rules="[
              val => (val !== null && val !== '') || '请输入确认密码',
              val => val === resetForm.password || '密码不一致'
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPwd2 = !showPwd2"
              />
            </template>
          </q-input>
          <div class="smscode">
            <q-input
              clearable
              outlined
              v-model="resetForm.smscode"
              label="验证码"
              lazy-rules
              :rules="[val => (val && val.length > 0) || '请输入验证码']"
            >
              <template v-slot:prepend>
                <q-icon name="sms" />
              </template>
            </q-input>
            <q-btn :label="smsmsg"></q-btn>
          </div>
          <div class="btn-group">
            <q-btn
              label="确认修改"
              type="submit"
              color="primary"
              size="lg"
              :loading="loading"
              style="font-size: 15px;line-height: 40px;"
            >
              <template v-slot:loading>
                <q-spinner-facebook class="on-left" />
                修改中...
              </template>
            </q-btn>
            <q-btn
              label="返回登录"
              size="lg"
              style="font-size: 15px;line-height: 40px;"
              @click="redirectToLogin"
            >
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="figure">
      <img src="@/assets/img/auth/forgetpwd.svg" alt="Forget Password" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Forget",
  data() {
    return {
      resetForm: {
        username: "",
        password: "",
        confirm: "",
        smscode: ""
      },
      loading: false,
      showPwd: true,
      showPwd2: true,
      smsmsg: "获取验证码"
    };
  },
  methods: {
    onSubmit() {},
    redirectToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  max-width: 1200px;
  margin: 0 auto !important;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;

  .login-form {
    width: 400px;

    h1.title {
      font-size: 32px;
      font-weight: 600;
      line-height: 1.1;
      margin-bottom: 12px;
    }

    p.subtitle {
      color: #95aac9 !important;
      margin-bottom: 36px;
      margin-top: 0;
    }

    .message {
      text-align: right;
      margin-bottom: 10px;
      a {
        color: #95aac9 !important;
        text-decoration: none;
        font-size: 13px;
      }
    }

    .smscode {
      display: flex;
      justify-content: space-between;

      .q-input {
        width: 220px;
      }

      .q-btn {
        height: 56px;
        width: 140px;
        margin-left: 10px;
      }
    }

    .btn-group {
      display: flex;
      justify-content: space-between;

      .q-btn {
        width: 48%;
      }
    }
  }

  .figure {
    text-align: center;
    width: 600px;

    img {
      max-width: 100%;
      height: auto;
      vertical-align: middle;
      border-style: none;
    }
  }
}
</style>

<style lang="scss">
.login-form {
  .q-card__section {
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 40px;
  }
}
</style>
