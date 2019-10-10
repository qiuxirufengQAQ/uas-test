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
import { findAdminAccountById, updateAdminAccount } from "@/services/admin/AdminAccountService";
import AdminAccountEditForm from "@/components/admin/AdminAccountEditForm";

export default {
  name: "AdminAccountEdit",
  components: { AdminAccountEditForm },
  data() {
    return {
      payload: { roleIds: [] },
      roleList: []
    };
  },
  methods: {
    initData() {
      if (this.payload.id !== this.$route.query.id) {
        findAdminAccountById({ id: this.$route.query.id }).then(resp => {
          this.payload = resp;
          this.$refs.form.reset();
        });
      }
    },
    submit(params) {
      updateAdminAccount(this.payload.id, params);
    }
  },
  watch: {
    $route: function(to) {
      if (to.path === "/admin/admin-account/edit") {
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
