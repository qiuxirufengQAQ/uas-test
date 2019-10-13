<template>
  <div class="header-avatar">
    <div class="action">
      <span>
        <span>你好，{{currUser.realname}}</span>
      </span>
    </div>

    <div class="action">
      <span>
        <span>修改密码</span>
      </span>
    </div>

    <div class="action">
      <span>
        <span style="color:#1890ff">退出</span>
      </span>
    </div>

    <!-- <a-menu style="width: 150px" slot="overlay" @click="handleClick">
      <a-menu-item key="profile">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="logout">
        <a-icon type="poweroff" />
        <span>退出</span>
      </a-menu-item>
    </a-menu>-->
  </div>
</template>

<script>
export default {
  name: "HeaderAvatar",
  computed: {
    currUser() {
      return this.$store.state.app.currUser;
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick(e) {
      if (e.key === "logout") {
        this.$store.dispatch("app/deleteSessionInfo", {
          callback: () => {
            this.$router.push("/login");
          }
        });
      } else if (e.key === "profile") {
        this.$router.push("/index/profile");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-avatar {
  float: right;
  height: 100%;
  .action {
    cursor: pointer;
    padding: 0 12px;
    display: inline-block;
    transition: all 0.3s;
    height: 100%;
    &:hover {
      background-color: #f0f8ff;
    }
  }
  .avatar {
    margin: 20px 8px 20px 0;
    background: rgba(255, 255, 255, 0.85);
    vertical-align: middle;
  }
}
</style>
