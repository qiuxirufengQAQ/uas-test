<template>
  <div class="page-header">
    <div :class="['page-header-wide', layout]">
      <div class="detail">
        <div class="main">
          <a-row>
            <!-- 标题 -->
            <a-col :xs="24" :md="12">
              <h1 v-if="title" class="title">{{title}}</h1>
            </a-col>
            <!-- 动作 -->
            <a-col :xs="24" :md="12">
              <div class="action">
                <slot name="action"></slot>
              </div>
            </a-col>
          </a-row>
          <div class="row">
            <a-col :xs="24" :md="12">
              <div v-if="this.$slots.content" class="content">
                <slot name="content"></slot>
              </div>
            </a-col>
            <a-col :xs="24" :md="12">
              <div v-if="this.$slots.extra" class="extra">
                <slot name="extra"></slot>
              </div>
            </a-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  props: {
    // 用于展示页的标题
    title: {
      type: String,
      required: false
    },
    breadcrumb: {
      type: Array,
      required: false
    },
    logo: {
      type: String,
      required: false
    }
  },
  computed: {
    layout() {
      return this.$store.state.app.layout;
    }
  }
};
</script>

<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;
  .page-header-wide {
    &.head {
      margin: auto;
      max-width: 1400px;
    }
    .detail {
      display: flex;
      .row {
        display: flex;
        width: 100%;
      }
      .main {
        width: 100%;
        flex: 0 1 auto;
        .title {
          flex: auto;
          font-size: 20px;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 16px;
        }
        .logo {
          width: 28px;
          height: 28px;
          border-radius: 4px;
          margin-right: 16px;
        }
        .content {
          margin-bottom: 16px;
          flex: auto;
        }
        .extra {
          flex: 0 1 auto;
          margin-left: 88px;
          min-width: 242px;
          text-align: right;
        }
        .action {
          margin-left: 56px;
          min-width: 170px;
          flex: 0 1 auto;
          text-align: right;
        }
      }
    }
  }
}
</style>
