<template>
    <a-card>
        <admin-account-edit-form 
        ref="form"
        :payload="payload"
        :roleList="roleList"
        :editable="false"
        />
    </a-card>
</template>

<script>
import { findAdminAccountById } from "@/services/admin/AdminAccountService";
import AdminAccountEditForm from "@/components/admin/AdminAccountEditForm";

export default {
  name: "AdminAccountDetail",
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
    }
  },
  watch: {
    $route: function(to) {
      if (to.path === "/admin/admin-account/detail") {
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
