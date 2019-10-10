<template>
  <a-card>
    <bonus-package-edit-form
      ref="form"
      :payload="payload"
      @submit="submit"
    />
  </a-card>
</template>

<script>
import { createBonusPackage } from "@/services/bonus/BonusPackageService";
import BonusPackageEditForm from "@/components/bonus/BonusPackageEditForm";

export default {
  name: "BonusPackageCreate",
  components: { BonusPackageEditForm },
  data() {
    return {
      payload: { bonusConfigList:'[{}]' }
    };
  },
  methods: {
    submit(params) {
      createBonusPackage(params).then(() => {
        this.$router.push({ path: "/bonus/bonus-package/list" });
      });
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
</style>
