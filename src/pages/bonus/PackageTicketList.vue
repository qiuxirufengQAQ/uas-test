<template>
  <a-card>
      <page-table 
        ref="page"
        :columns="columns"
        :pageData="pageData"
        :conditions="conditions"
        @query="queryPage"
        :slots="['operator']"
      >
        <span slot="operator">
            <a-button type="primary" @click="doExport">导出</a-button>
        </span>
      </page-table>
  </a-card>
</template>

<script>
import { formatFullDate } from "@/utils/utils.js";
import PageTable from "@/components/table/PageTable";
import { searchPackageTicket, exportPackageTicket } from "@/services/bonus/BonusPackageService";

const conditions = [
  {
    label: "批次号",
    key: "batchNo",
    judgeType: "LIKE",
    inputType: "INPUT"
  },
  {
    label: "兑换码",
    key: "ticketCode",
    judgeType: "EQ",
    inputType: "INPUT"
  }
];
const columns = [
  {
    title: "批次号",
     dataIndex: "batchNo"
  },
  {
    title: "礼包名称",
    dataIndex: "bonusPackageName"
  },
  {
    title: "兑换码",
    dataIndex: "ticketCode"
  },
  {
    title: "是否已使用",
    dataIndex: "isUsed",
    customRender: (v, d, i) => v ? '已使用' : '未使用'
  },
  {
    title: "过期时间",
    dataIndex: "expireTime",
    customRender: value => {
      return formatFullDate(value);
    }
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    customRender: value => {
      return formatFullDate(value);
    }
  }
];

export default {
  name: "PackageTicketList",
  components: { PageTable },
  data() {
    return {
      conditions,
      columns,
      pageData: { totalElements: 0 }
    };
  },
  methods: {
    doExport(){
      this.queryPage(this.$refs.page.getQueryParams(), true)
    },
    queryPage(params, isExport) {
      params.pageQuery.sort= ["createTime desc"];
      if(isExport){
        exportPackageTicket(params).then(filePath => {
          this.downLoadExportData(filePath)
        })
      }else{
        searchPackageTicket(params).then(resp => {
          this.pageData = resp;
        });
      }
    },
    initData() {
      if(this.$route.query.batchNo){
        this.conditions[0].defaultValue = this.$route.query.batchNo;
      }
    },
    downLoadExportData(traceFilePath){
      var a = document.createElement('a');
      // 指定生成的文件名
      a.href = `/controller/file/file-data?filePath=${traceFilePath}&download=true`;
      document.body.appendChild(a);
      var evt = document.createEvent("MouseEvents");
      evt.initEvent("click", false, false);
      a.dispatchEvent(evt);
      document.body.removeChild(a);
    }
  },
  watch: {
    $route: function(to) {
      if (to.path === "/bonus/package-ticket/list") {
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