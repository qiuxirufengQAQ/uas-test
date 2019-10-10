<template>
  <!-- <a-badge></a-badge> 图标右上角的圆形徽标数字-->
  <a-badge v-if="badge" :status="enumObject.style" :text="enumObject.text"></a-badge>
  <span v-else>{{enumObject.text}}</span>
</template>

<script>
import constant from "../../utils/constant";
export default {
  name: "EnumItem",
  props: {
    enumName: {
      type: String,
      required: true
    },
    enumValue: {
      required: true
    },
    badge: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      badgeStyles: ["success", "processing", "default", "error", "warning"]
    };
  },
  computed: {
    enumObject() {
      const enumArray = constant[this.$props.enumName];
      const item = enumArray
        ? enumArray.filter(i => i.value === this.$props.enumValue)[0]
        : undefined;
      if (item) {
        if (item.style) {
          return { text: item.text, style: item.style };
        } else {
          return {
            text: item.text,
            style: this.badgeStyles[
              Math.abs(enumArray.indexOf(item) % this.badgeStyles.length)
            ]
          };
        }
      }
      return { text: "未定义", style: "default" };
    }
  }
};
</script>

<style lang="less" scoped>
</style>
