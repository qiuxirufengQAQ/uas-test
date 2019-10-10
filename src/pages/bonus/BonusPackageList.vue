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
          <router-link to="/bonus/bonus-package/create">
            <a-button type="primary">新建</a-button>
          </router-link>
        </span>
        <span slot="action" slot-scope="{ data }">
          <a-dropdown>
            <a-menu @click="e => handleActionClick(e,data)" slot="overlay">
              <a-menu-item key="detail">查看</a-menu-item>
              <a-menu-item key="edit">编辑</a-menu-item>
              <a-menu-item key="gen">生成兑换码</a-menu-item>
            </a-menu>
            <a-button size="small">
              操作 <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </span>
      </page-table>


      <a-modal title="生成兑换码" v-model="modalVisible" :footer="null" :width="500">
        <a-form :autoFormCreate="(form) => this.form = form">
             <a-row>
                <a-col v-bind="{xs: 24}">
                  <a-form-item label="兑换码个数"
                      fieldDecoratorId="ticketCount" :fieldDecoratorOptions="{
                          initialValue:null,
                          rules: [
                              { required: true, message: '请输入生成兑换码个数'},
                              {
                                validator: (rule, value, callback) => {
                                  if (value < 0) {
                                    callback('兑换码个数不能小于0');
                                  }
                                  callback();
                                },
                              },
                          ]
                    }">
                    <a-input addonAfter="个"/>   
                  </a-form-item>
                </a-col>
             </a-row>
         </a-form>
        <div style="height: 30px;">
            <div style="float: right">
              <a-button key="cancelFlow" type="primary" @click="handleSubmit">确认</a-button>
              <a-divider type="vertical" key="cancel_confirm_divider" />
              <a-button key="rejectFlow" type="default" @click="handleCancel">取消</a-button>
            </div>
        </div>
    </a-modal>

  </a-card>
</template>

<script>
import { formatFullDate } from "@/utils/utils.js";
import PageTable from "@/components/table/PageTable";
import { searchBonusPackage, genTicket } from "@/services/bonus/BonusPackageService";

const conditions = [
  {
    label: "礼包名",
    key: "packageName",
    judgeType: "LIKE",
    inputType: "INPUT"
  }
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
    title: "礼包名",
    dataIndex: "packageName"
  },
  {
    title: "兑换码有效期",
    dataIndex: "expireDays",
    customRender: (v, d, i) => v + '天'
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
  name: "BonusPackageList",
  components: { PageTable },
  data() {
    return {
      conditions,
      columns,
      pageData: { totalElements: 0 },
      modalVisible:false,
      modalData:{},
      modalSubmiting:false
    };
  },
  methods: {
    handleCancel(){
      this.modalVisible = false;
    },
    handleSubmit(){
      const _this = this;
      if(_this.modalSubmiting){
        return;
      }
      this.form.validateFields((err, params) => {
        if (!err) {
          const req = {};
          req.id = _this.modalData.id;
          req.count = params.ticketCount;
          _this.modalSubmiting = true;
          genTicket(req).then(batchNo => {
            _this.modalVisible = false;
            _this.modalSubmiting = false;
            _this.$router.push({
              path: "/bonus/package-ticket/list",
              query: { batchNo }
            });
          }).catch(()=>{
            _this.modalSubmiting = false;
          });
        }
      });
    },
    queryPage(params) {
      params.pageQuery.sort= ["createTime desc"];
      searchBonusPackage(params).then(resp => {
        this.pageData = resp;
      });
    },
    handleActionClick(e, data) {
      const _this = this;
      switch (e.key) {
        case "detail":
          {
            this.$router.push({
              path: "/bonus/bonus-package/detail",
              query: { id: data.id }
            });
          }
          break;
        case "edit":
          {
            this.$router.push({
              path: "/bonus/bonus-package/edit",
              query: { id: data.id }
            });
          }
          break;
        case "gen":
          {
            this.modalVisible = true;
            this.modalData = data;
          }
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>