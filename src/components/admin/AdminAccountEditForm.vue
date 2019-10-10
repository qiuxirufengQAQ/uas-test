<template>
    <a-form :autoFormCreate="(form) => this.form = form">

        <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol"
            fieldDecoratorId="username" :fieldDecoratorOptions="{
                initialValue:payload.username,
                rules: [
                    { required: editable, message: '请输入用户名'},
                    { max: 20, message: '长度不能多于20位'},
                ]
            }">
            <a-input v-if="editable"/>
            <span v-else>{{payload.username}}</span>
        </a-form-item>

        <a-form-item label="真实名称" :labelCol="labelCol" :wrapperCol="wrapperCol"
            fieldDecoratorId="realname" :fieldDecoratorOptions="{
                initialValue:payload.realname,
                rules: [
                    { required: editable, message: '请输入真实名称'},
                    { max: 50, message: '长度不能多于50位'},
                ]
            }">
            <a-input v-if="editable"/>
            <span v-else>{{payload.realname}}</span>
        </a-form-item>
        
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
  name: "AdminAccountEditForm",
  components: { FooterToolBar },
  props: {
    payload: {
      type: Object,
      required: true
    },
    roleList: {
      type: Array,
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
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
      },
    };
  },
  computed: {
  },
  methods: {
    submit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, params) => {
        if (!err) {
          this.$emit("submit", params);
        }
      });
    },
    reset() {
      this.form.resetFields();
    },
    close() {
      this.$router.push({ path: "/admin/admin-account/list" });
    },
  },
  created() {
  }
};
</script>

<style lang="less" scoped>
  .ant-form-item{
    margin-bottom: 0px;
  }
</style>
