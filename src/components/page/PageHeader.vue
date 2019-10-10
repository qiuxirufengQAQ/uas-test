<template>
  <div class="page-header">
    <div :class="['page-header-wide', layout]">
      <div class="breadcrumb">
        <a-breadcrumb>
          <a-breadcrumb-item :key="item.path" v-for="(item, index) in breadcrumb">
            <span v-if="index === 0"><a style="text-decoration: none" href="#/index/dashboard">{{item.name}}</a></span>
            <span v-else-if="index !=1 && index <= breadcrumb.length-2">
              <a style="text-decoration: none" :href="'#'+item.path">{{item.name}}</a>
            </span>
            <span v-else>{{item.name}}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="detail">
        <div v-if="avatar" class="avatar"><a-avatar :src="avatar" /></div>
        <div class="main">
          <a-row>
            <a-col :xs="24" :md="12">
              <img v-if="logo" :src="logo" class="logo" />
              <h1 v-if="title" class="title">{{title}}</h1>
            </a-col>
            <a-col :xs="24" :md="12">
              <div class="action"><slot name="action"></slot></div>
            </a-col>
          </a-row>
          <div class="row">
            <a-col :xs="24" :md="12">
              <div v-if="this.$slots.content" class="content"><slot name="content"></slot></div>
            </a-col>
            <a-col :xs="24" :md="12">
              <div v-if="this.$slots.extra" class="extra"><slot name="extra"></slot></div>
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
    },
    avatar: {
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
    &.side {
    }
    .breadcrumb {
      margin-bottom: 16px;
    }
    .detail {
      display: flex;
      .row {
        display: flex;
        width: 100%;
      }
      .avatar {
        flex: 0 1 72px;
        margin: 0 24px 8px 0;
        & > span {
          border-radius: 72px;
          display: block;
          width: 72px;
          height: 72px;
        }
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
