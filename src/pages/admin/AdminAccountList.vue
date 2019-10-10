<template>
  <a-card>
      <page-table 
        ref="page"
        :columns="columns"
        :pageData="pageData"
        :conditions="conditions"
        @query="queryPage"
      >
        <span slot="operator">
          <router-link to="/admin/admin-account/create">
            <a-button type="primary" v-if="$secured('BTN_CREATE_ADMIN_ACCOUNT')">新建</a-button>
          </router-link>
        </span>
        <span slot="action" slot-scope="{ data }">
          <a-dropdown>
            <a-menu @click="e => handleActionClick(e,data)" slot="overlay">
              <a-menu-item key="detail">查看</a-menu-item>
              <a-menu-item key="edit" v-if="$secured('BTN_UPDATE_ADMIN_ACCOUNT')">编辑</a-menu-item>
              <a-menu-item key="lock" v-if="data.status=='NORMAL' && $secured('BTN_LOCK_ADMIN_ACCOUNT')">冻结</a-menu-item>
              <a-menu-item key="unlock" v-if="data.status=='LOCKED' && $secured('BTN_UNLOCK_ADMIN_ACCOUNT')">解冻</a-menu-item>
              <a-menu-item key="reset" v-if="$secured('BTN_RESET_PASSWORD')">重置密码</a-menu-item>
            </a-menu>
            <a-button size="small">
              操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </span>
        <span slot="status" slot-scope="{ data }">
          <enum-item enum-name="AdminStatus" :enum-value="data.status" />
        </span>
      </page-table>
  </a-card>
</template>

<script>
import { formatFullDate } from "@/utils/utils.js";
import PageTable from "@/components/table/PageTable";
import { searchAdminAccount, lockAdminAccount, unlockAdminAccount, resetPassword } 
from "@/services/admin/AdminAccountService";

const conditions = [
  {
    label: "状态",
    key: "status",
    judgeType: "EQ",
    inputType: "SELECT",
    options: "AdminStatus"
  },
  {
    label: "用户名",
    key: "username",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
  {
    label: "真实名称",
    key: "realname",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
];
const columns = [
  {
    title: "#",
    customRender: (v, d, i) => i + 1
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  },
  {
    title: "用户名",
    dataIndex: "username"
  },
  {
    title: "真实名称",
    dataIndex: "realname"
  },
  {
    title: "状态",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "最后登录时间",
    dataIndex: "lastLoginTime",
    customRender: value => {
      return formatFullDate(value);
    }
  }
];

export default {
  name: "AdminAccountList",
  components: { PageTable },
  data() {
    return {
      conditions,
      columns,
      pageData: { totalElements: 0 }
    };
  },
  methods: {
    queryPage(params) {
      searchAdminAccount(params).then(resp => {
        this.pageData = resp;
      });
    },
    handleActionClick(e, data) {
      const _this = this;
      switch (e.key) {
        case "detail":
          {
            this.$router.push({
              path: "/admin/admin-account/detail",
              query: { id: data.id }
            });
          }
          break;
        case "edit":
          {
            this.$router.push({
              path: "/admin/admin-account/edit",
              query: { id: data.id }
            });
          }
          break;
        case "lock":
          {
            this.$confirm({
              title: `是否冻结账号 [${data.username}]`,
              onOk() {
                lockAdminAccount({ id: data.id }).then(() => {
                  _this.$refs.page.queryPageData();
                });
              }
            });
          }
          break;
        case "unlock":
          {
            this.$confirm({
              title: `是否解冻账号 [${data.username}]`,
              onOk() {
                unlockAdminAccount({ id: data.id }).then(() => {
                  _this.$refs.page.queryPageData();
                });
              }
            });
          }
          break;
        case "reset":
          {
            this.$confirm({
              title: `是否重置账号 [${data.username}] 登录密码`,
              onOk() {
                resetPassword({ id: data.id }).then(() => {
                  _this.$refs.page.queryPageData();
                });
              }
            });
          }
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>