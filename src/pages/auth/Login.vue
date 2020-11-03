<template>
  <div class="container">
    <q-card class="login-form">
      <q-card-section>
        <h1 class="title">登录</h1>
        <p class="subtitle">中国日报内容管理系统</p>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            clearable
            outlined
            v-model="loginForm.username"
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
            v-model="loginForm.password"
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
          <div class="smscode">
            <q-input
              clearable
              outlined
              v-model="loginForm.smsCode"
              label="验证码"
              lazy-rules
              :rules="[val => (val && val.length > 0) || '请输入验证码']"
            >
              <template v-slot:prepend>
                <q-icon name="sms" />
              </template>
            </q-input>
            <q-btn
              :label="sms.msg"
              @click="getSmscode"
              :disable="sms.disable"
              :loading="sms.loading"
            >
              <template v-slot:loading>
                <q-spinner-facebook />
              </template>
            </q-btn>
          </div>
          <div class="submit-btn">
            <div class="message">
              <router-link
                :to="{
                  path: '/forget-password',
                  query: { username: loginForm.username }
                }"
                >忘记密码？</router-link
              >
            </div>
            <q-btn
              label="登录"
              push
              type="submit"
              color="blue"
              class="full-width"
              :loading="loading"
              style="font-size: 16px; line-height: 40px"
            >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                登录中...
              </template>
            </q-btn>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="figure">
      <img src="@/assets/img/auth/login.svg" alt="Login" />
    </div>
  </div>
</template>

<script>
import { isEmpty } from "@/utils/stringutil";
import { sendCode } from "@/api/auth";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        smsCode: ""
      },
      loading: false,
      showPwd: true,
      sms: {
        msg: "获取验证码",
        disable: false,
        loading: false
      },
      smsmsg: "获取验证码",
      smsbtn: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    getSmscode() {
      if (isEmpty(this.loginForm.username)) {
        this.$toast.fire({
          title: "请输入用户名",
          icon: "warning"
        });
        return;
      }
      this.sms.loading = true;
      sendCode(this.loginForm.username)
        .then(() => {
          this.sms.loading = false;
          this.$toast.fire({
            title: "验证码发送成功",
            icon: "success"
          });
          this.sms.disable = true;
          let count = 60;
          let timmer = setInterval(() => {
            if (count <= 1) {
              this.sms.disable = false;
              this.sms.msg = "获取验证码";
              clearInterval(timmer);
            } else {
              count--;
              this.sms.msg = `${count}s后重新获取`;
            }
          }, 1000);
        })
        .catch(err => {
          this.sms.loading = false;
        });
    },
    onSubmit() {
      this.loading = true;
      this.$store
        .dispatch("auth/login", this.loginForm)
        .then(() => {
          this.$toast.fire({
            title: "登录成功",
            icon: "success"
          });
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery
          });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
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

    .submit-btn {
      margin-top: 0;
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
