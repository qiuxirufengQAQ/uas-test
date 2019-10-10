<template>
  <a-card>
    <admin-account-edit-form 
      ref="form"
      :payload="payload"
      :roleList="roleList"
      @submit="submit"
    />
  </a-card>
</template>

<script>
import { createAdminAccount } from "@/services/admin/AdminAccountService";
import AdminAccountEditForm from "@/components/admin/AdminAccountEditForm";

export default {
  name: "AdminAccountCreate",
  components: { AdminAccountEditForm },
  data() {
    return {
      payload: { roleIds: [] },
      roleList: []
    };
  },
  methods: {
    submit(params) {
      createAdminAccount(params).then(() => {
        this.$refs.form.reset();
      });
    }
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
</style>
