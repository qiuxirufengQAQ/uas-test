<template>
  <div class="footer">
    <div class="copyright">
      Copyright<a-icon type="copyright" />{{copyright}}
    </div>
  </div>
</template>

<script>
export default {
  name: "GlobalFooter",
  props: ["copyright"]
};
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 24px 0 8px;
  text-align: center;
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
