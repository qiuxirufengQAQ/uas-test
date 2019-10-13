<template>
  <a-card>
    <page-table :conditions="conditions" :pageData="pageData" :columns="columns" :scroll="scroll">
      <template v-slot:title>
        <h1>用户管理</h1>
        <a-divider />
      </template>
    </page-table>
  </a-card>
</template>

<script>
import PageTable from "./../components/table/PageTable";

const conditions = [
  {
    label: "用户姓名",
    key: "realname",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
  {
    label: "用户名",
    key: "username",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
  {
    label: "角色名称",
    key: "roleName",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
  {
    label: "数据来源",
    key: "source",
    judgeType: "EQ",
    inputType: "SELECT",
    options: ""
  }
];
const columns = [
  {
    title: "序号",
    customRender: (v, d, i) => i + 1
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" }
  },
  {
    title: "数据来源",
    dataIndex: "source"
  },
  {
    title: "用户姓名",
    dataIndex: "realname"
  },
  {
    title: "用户名",
    dataIndex: "username"
  },
  {
    title: "手机号",
    dataIndex: "lastLoginTime"
  },
  {
    title: "电子邮箱",
    dataIndex: "emial"
  },
  {
    title: "用户状态",
    dataIndex: "status"
  },
  {
    title: "系统-角色",
    dataIndex: "roleSummary"
  },
  {
    title: "最新更新时间",
    dataIndex: "modifiedTime"
  }
];
const scroll = { x: "100%" };
export default {
  name: "UserManage",
  components: { PageTable },
  data() {
    return {
      conditions,
      columns,
      scroll,
      pageData: { totalElements: 0 }
    };
  }
};
</script>

<style lang="less" scoped>
.extra-wrap {
}
.extra-item {
  display: inline-block;
  margin-right: 24px;
  a {
    margin-left: 24px;
  }
}
</style>
