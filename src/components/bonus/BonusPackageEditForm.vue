<template>
    <a-form :autoFormCreate="(form) => this.form = form">
      <a-row>
        <a-form-item label="礼包名" :labelCol="labelCol1" :wrapperCol="wrapperCol1"
            fieldDecoratorId="packageName" :fieldDecoratorOptions="{
                initialValue:payload.packageName,
                rules: [
                    { required: editable, message: '请输入礼包名'},
                    { max: 20, message: '长度不能多于20位'},
                ]
            }">
            <a-input v-if="editable"/>
            <span v-else>{{payload.packageName}}</span>
        </a-form-item>
      </a-row>

      <a-row>
        <a-form-item label="兑换码有效期" :labelCol="labelCol1" :wrapperCol="wrapperCol1"
            fieldDecoratorId="expireDays" :fieldDecoratorOptions="{
                initialValue:payload.expireDays,
                rules: [
                    { required: editable, message: '请输入兑换码有效期'},
                    {
                      validator: (rule, value, callback) => {
                        if (value < 1) {
                          callback('有效期不能小于1天');
                        }
                        callback();
                      },
                    },
                ]
            }">
            <a-input v-if="editable" addonAfter="天"/>
            <span v-else>{{payload.expireDays}}天</span>
        </a-form-item>
      </a-row>

      <a-divider />

      <a-row v-for="(config,index) in payload.bonusConfigList" :key="index">
          <a-col v-bind="{ xs: 24, sm: 6, md: 2 }">
            <a-form-item>
              <span>红包{{index + 1}}</span>
            </a-form-item>
          </a-col>
          <a-col v-bind="colSpan">
              <a-form-item label="红包金额" :labelCol="labelCol" :wrapperCol="wrapperCol"
                :fieldDecoratorId="`bonusConfigList[${index}].typeMoney`" :fieldDecoratorOptions="{
                    initialValue:config.typeMoney,
                    rules: [
                        { required: editable, message: '请输入红包金额'},
                        {
                          validator: (rule, value, callback) => {
                            if (value < 0) {
                              callback('红包金额不能小于0');
                            }
                            callback();
                          },
                        },
                    ]
                }"
              >
              <a-input v-if="editable" addonAfter="元"/>
              <span v-else>{{config.typeMoney}}元</span>  
            </a-form-item>
          </a-col>
          <a-col v-bind="colSpan">
              <a-form-item label="最小订单金额" :labelCol="labelCol" :wrapperCol="wrapperCol"
                :fieldDecoratorId="`bonusConfigList[${index}].minAmount`" :fieldDecoratorOptions="{
                    initialValue:config.minAmount,
                    rules: [
                        { required: editable, message: '请输入最小订单金额'},
                        {
                          validator: (rule, value, callback) => {
                            if (value < 0) {
                              callback('最小订单金额不能小于0');
                            }
                            callback();
                          },
                        },
                    ]
                }"
              >
              <a-input v-if="editable" addonAfter="元"/>
              <span v-else>{{config.minAmount}}元</span>  
            </a-form-item>
          </a-col>
          <a-col v-bind="colSpan">
              <a-form-item label="红包个数" :labelCol="labelCol" :wrapperCol="wrapperCol"
                :fieldDecoratorId="`bonusConfigList[${index}].count`" :fieldDecoratorOptions="{
                    initialValue:config.count,
                    rules: [
                        { required: editable, message: '请输入红包个数'},
                        {
                          validator: (rule, value, callback) => {
                            if (value < 0) {
                              callback('红包个数不能小于0');
                            }
                            callback();
                          },
                        },
                    ]
                }"
              >
              <a-input v-if="editable" addonAfter="个"/>
              <span v-else>{{config.count}}个</span>  
            </a-form-item>
          </a-col>
      </a-row>

      <a-row v-show="editable">
        <a-col :span="12">
          <a @click="addConfig">增加一条</a>
        </a-col>
        <a-col :span="12" style="text-align:right">
          <a @click="removeConfig">删除一条</a>
        </a-col>
      </a-row>

      <a-row v-show="globalErrorMsg">
        <div style="color:red">{{globalErrorMsg}}</div>
      </a-row>
        
      <footer-tool-bar v-if="editable">
        <a-button type="default" @click="close">关闭</a-button>
        <a-divider type="vertical" />
        <a-button type="default" @click="reset">重置</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" @click="submit">提交</a-button>
      </footer-tool-bar>

    </a-form>
</template>

<script>

import FooterToolBar from "@/components/tool/FooterToolBar";

export default {
  name: "BonusPackageEditForm",
  components: { FooterToolBar },
  props: {
    payload: {
      type: Object,
      required: true
    },
    editable: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      globalErrorMsg: null,
      colSpan: {
        xs: 24,
        sm: 8,
        md: 7
      },
      labelCol: {
        xs: { span: 12 }
      },
      wrapperCol: {
        xs: { span: 12 }
      },
      labelCol1: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol1: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
    };
  },
  computed: {
  },
  methods: {
    addConfig(){
      this.globalErrorMsg = '';
      this.payload.bonusConfigList.push({});
    },
    removeConfig(){
      if(this.payload.bonusConfigList.length == 1){
        this.globalErrorMsg = '至少要有一条配置';
      }else{
        this.payload.bonusConfigList.splice(this.payload.bonusConfigList.length - 1, 1); 
      }
    },
    submit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, params) => {
        if (!err) {
          params.bonusConfigList = JSON.stringify(params.bonusConfigList);
          this.$emit("submit", params);
        }
      });
    },
    reset() {
      this.form.resetFields();
    },
    close() {
      this.$router.push({ path: "/bonus/bonus-package/list" });
    },
    initData(){
      this.payload.bonusConfigList = JSON.parse(this.payload.bonusConfigList);
    }
  },
  watch:{
    payload:'initData'
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="less" scoped>
  .ant-form-item{
    margin-bottom: 0px;
  }
</style>
