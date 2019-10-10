<template>
  <div>
    <a-card :bordered="true" :body-style="{padding: '24px'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrap" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}"></a-range-picker>
          </div>
          <a-tab-pane loading="true" tab="销售额" key="1">
              <a-row></a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问量" key="2">
              <a-row></a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components:{},
  data () {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
  .extra-wrap{

  }
  .extra-item{
    display: inline-block;
    margin-right: 24px;
    a{
      margin-left: 24px;
    }
  }
</style>
