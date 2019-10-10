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
import { findBonusPackageById, updateBonusPackage } from "@/services/bonus/BonusPackageService";
import BonusPackageEditForm from "@/components/bonus/BonusPackageEditForm";

export default {
  name: "BonusPackageEdit",
  components: { BonusPackageEditForm },
  data() {
    return {
      payload: { bonusConfigList:'[]' },
    };
  },
  methods: {
    initData() {
      if (this.payload.id !== this.$route.query.id) {
        findBonusPackageById({ id: this.$route.query.id }).then(resp => {
          this.payload = resp;
          this.$refs.form.reset();
        });
      }
    },
    submit(params) {
      updateBonusPackage(this.payload.id, params).then(() => {
        this.$router.push({ path: "/bonus/bonus-package/list" });
      });
    }
  },
  watch: {
    $route: function(to) {
      if (to.path === "/bonus/bonus-package/edit") {
        this.initData();
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
</style>
