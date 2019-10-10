<template>
  <a-card>
    <bonus-package-edit-form
      ref="form"
      :payload="payload"
      :editable="false"
    />
  </a-card>
</template>

<script>
import { findBonusPackageById } from "@/services/bonus/BonusPackageService";
import BonusPackageEditForm from "@/components/bonus/BonusPackageEditForm";

export default {
  name: "BonusPackageDetail",
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
    }
  },
  watch: {
    $route: function(to) {
      if (to.path === "/bonus/bonus-package/detail") {
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
