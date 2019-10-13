<template>
  <div class="container">
    <div class="content">
      <div class="top">
        <div class="header">
          <span class="title">{{systemName}}</span>
        </div>
      </div>
      <div class="main">
        <a-form @submit.prevent="onSubmit" :form="form">
          <a-alert
            type="error"
            :closable="true"
            v-show="error"
            :message="error"
            showIcon
            style="margin-bottom: 24px;"
          />
          <a-form-item>
            <a-input
              size="large"
              placeholder="用户名"
              v-decorator="['username', {rules: [{ required: true, message: '请输入用户名', whitespace: true }]}]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              type="password"
              placeholder="密码"
              v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true }]}]"
            >
              <a-icon slot="prefix" type="lock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              size="large"
              placeholder="验证码"
              style="width:50%"
              v-decorator="['securityCode', {rules: [{ required: true, message: '请输入验证码', whitespace: true }]}]"
            >
              <a-icon slot="prefix" type="profile" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button
              :loading="logging"
              style="width: 100%;margin-top: 24px"
              size="large"
              htmlType="submit"
              type="primary"
            >立即登录</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalFooter from "../../layouts/GlobalFooter";

export default {
  name: "Login",
  components: { GlobalFooter },
  data() {
    return {
      form: this.$form.createForm(this),
      logging: false,
      error: "",
      systemName: "UAS | 统一登录"
    };
  },
  methods: {
    onSubmit(e) {
      this.form.validateFields((err, params) => {
        console.log("校验表单");
        if (!err) {
          this.logging = true;
          this.error = null;
          this.$store.dispatch("app/createSessionInfo", {
            params,
            callback: resp => {
              this.logging = false;
              if (resp.success) {
                this.$router.push("/auth/userManage");
              } else {
                this.error = resp.respMsg;
              }
            }
          });
        }
      });
    }
  },
  beforeCreate() {
    const currUser = this.$store.state.app.currUser;
    if (currUser && currUser.id) {
      this.$router.push("/auth/userManage");
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background-size: 100%;
  .content {
    margin: 0 auto;
    border: 1px solid #eee;
    height: 430px;
    width: 500px;
    background: #fff;
    margin-top: 180px;
    border-radius: 4px;
    box-shadow: 0 0 10px #e6e6e6;
    .top {
      text-align: left;
      margin: 20px -30px 30px 30px;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 22px;
          font-weight: bold;
          color: #108ee9;
          font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica,
            sans-serif;
          // font-weight: 600;
          // position: relative;
          margin: 20px 0 0 30px;
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login {
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button {
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .main {
      width: 368px;
      margin: 0 auto;

      .icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .register {
          float: right;
        }
      }
    }
  }
}
</style>
