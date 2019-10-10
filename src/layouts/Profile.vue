<template>
  <a-layout style="padding:8px 0;background: #fff">
    <a-layout-sider :trigger="null" collapsible collapsedWidth="0" v-model="isMobile">
      <a-menu
        :defaultSelectedKeys="['baseInfo']"
        mode="inline"
        style="height: 100%"
        @click="handleMenuClick"
      >
        <a-menu-item key="baseInfo">
          <a-icon type="user" />
          <span>基本信息</span>
        </a-menu-item>
        <a-menu-item key="password">
          <a-icon type="lock" />
          <span>修改密码</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{padding: '8px 40px', minHeight: minHeight }">
      <a-card
        class="card"
        title="基本信息"
        :bordered="false"
        v-show="isMobile || currKey === 'baseInfo'"
      >
        <a-form :form="baseInfoForm" @submit="updateBaseInfo">
          <a-form-item label="用户名1" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span>{{currUser.username}}</span>
          </a-form-item>

          <a-form-item label="真实姓名1" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              v-if="editable"
              v-decorator="['realname',{
                      initialValue:currUser.realname,
                      rules: [
                          { required: editable, message: '请输入真实姓名'},
                          { max: 50, message: '长度不能多于50位'},
                      ]
                  }]"
            />
            <span v-else>{{currUser.realname}}</span>
          </a-form-item>

          <a-form-item label="账号状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span>
              <enum-item enum-name="AdminStatus" :enum-value="currUser.status" />
            </span>
          </a-form-item>

          <a-form-item label="账号类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span>
              <enum-item enum-name="AdminType" :enum-value="currUser.type" />
            </span>
          </a-form-item>

          <a-form-item label="登录IP" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span>{{currUser.lastLoginIp}}</span>
          </a-form-item>

          <a-form-item label="登录时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <span>{{currUser.lastLoginTime | fullDate}}</span>
          </a-form-item>

          <a-form-item :wrapperCol="{xs:{span:24},sm:{span:12,offset:12}}">
            <a-button type="default" v-show="!editable" @click="toggleEditable">修改</a-button>
            <a-button type="default" v-show="editable" @click="toggleEditable">取消</a-button>
            <a-button type="primary" v-show="editable" htmlType="submit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-card
        class="card"
        title="修改密码"
        :bordered="false"
        v-show="isMobile || currKey === 'password'"
      >
        <a-form :form="passwordForm" @submit="updatePassword">
          <a-form-item label="原密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              v-decorator="['oldPassword',{ rules: [{ required: true, message: '请输入原密码'}] }]"
            />
          </a-form-item>

          <a-form-item label="新密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              v-decorator="['newPassword',{ rules: [{ required: true, message: '请输入新密码'},{ min: 6, message: '密码不能少于6位'}] }]"
            />
          </a-form-item>

          <a-form-item label="重复新密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              type="password"
              v-decorator="['confirmPassword',{ rules: [
                                { required: true, message: '请再次输入新密码'},
                                {
                                    validator: (rule, value, callback) => {
                                        if (value && value !== this.passwordForm.getFieldValue('newPassword')) {
                                            callback('两次输入不一致');
                                        }
                                        callback();
                                    },
                                },
                        ] }]"
            />
          </a-form-item>
          <a-form-item :wrapperCol="{xs:{span:24},sm:{span:12,offset:8}}">
            <a-button type="primary" htmlType="submit">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
const minHeight = window.innerHeight - 64 - 24 - 53 - 64;
export default {
  name: "Profile",
  data() {
    return {
      baseInfoForm: this.$form.createForm(this),
      passwordForm: this.$form.createForm(this),
      minHeight: (minHeight < 450 ? 450 : minHeight) + "px",
      currKey: "baseInfo",
      editable: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      }
    };
  },
  computed: {
    currUser() {
      return this.$store.state.app.currUser;
    },
    isMobile() {
      return this.$store.state.app.isMobile;
    }
  },
  methods: {
    toggleEditable() {
      this.editable = !this.editable;
      if (!this.editable) {
        this.baseInfoForm.resetFields();
      }
    },
    handleMenuClick(e) {
      this.currKey = e.key;
    },
    updateBaseInfo(e) {
      e.preventDefault();
      this.baseInfoForm.validateFields((err, params) => {
        if (!err) {
          this.$store.dispatch("app/updateSessionInfo", {
            params,
            callback: () => {
              this.editable = false;
              this.baseInfoForm.resetFields();
            }
          });
        }
      });
    },
    updatePassword(e) {
      e.preventDefault();
      this.passwordForm.validateFields((err, params) => {
        if (!err) {
          this.$store.dispatch("app/updatePassword", {
            params,
            callback: () => {
              this.passwordForm.resetFields();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
}
.ant-form-item {
  margin-bottom: 0px;
}
.card {
  margin-bottom: 24px;
}
</style>
