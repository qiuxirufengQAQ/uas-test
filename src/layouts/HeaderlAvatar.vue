<template>
  <a-dropdown style="display: inline-block; height: 100%; vertical-align: initial" >
    <span style="cursor: pointer">
      <span>你好, {{currUser.realname}}</span>
    </span>
    <a-menu style="width: 150px" slot="overlay" @click="handleClick">
      <a-menu-item key="profile">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-divider />
      <a-menu-item key="logout">
        <a-icon type="poweroff" />
        <span>退出</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
export default {
  name: "HeaderAvatar",
  computed: {
    currUser() {
      return this.$store.state.app.currUser;
    }
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
</style>
