<template>
  <div>
    <a-list itemLayout="vertical" :dataSource="dataSource" 
      :pagination="false" v-if="isMobile" :rowKey="item => item.id || item.index">
      <a-list-item slot-scope="item" :key="item.id" slot="renderItem">
        <a-list-item-meta>
          <template v-if="filterColumns[0].scopedSlots">
            <span slot="title">
              {{filterColumns[0].title}}:
              <slot :name="filterColumns[0].scopedSlots.customRender" :data="item"></slot>
            </span>
          </template>
          <template v-else>
            <span slot="title">
              {{filterColumns[0].title}}:&nbsp;{{item[filterColumns[0].dataIndex]}}
            </span>
          </template>
        </a-list-item-meta>
        <template v-for="(c, index) in filterColumns">
          <p v-if="c.dataIndex && index !== 0" :key="index">{{c.title}}:&nbsp;{{item[c.dataIndex] | render(c)}}</p>
        </template>
        <template slot="actions">
          <slot name="action" :data="item"></slot>
        </template>
      </a-list-item>
    </a-list>
    <a-table v-else :pagination="false"
      :dataSource="dataSource" :columns="columns" :rowKey="item => item.id || item.index">
      <template v-for="s in slots" slot-scope="record" :slot="s">
        <slot :name="s" :data="record"></slot>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'FlexibleTable',
  props: {
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true
    },
    slots: {
      type: Array,
      required: false,
      default: () => ['id', 'action', 'status', 'mAction']
    }
  },
  data() {
    return {
      
    };
  },
  filters: {
    render(v, c) {
      if(c.customRender && typeof(c.customRender) === 'function'){
        return c.customRender(v);
      }else{
        return v;
      }
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.app.isMobile;
    },
    filterColumns() {
      return this.columns.filter((e, i, a) => {
        return !e.hideInMobile;
      });
    }
  }
}
</script>

<style lang="less" scoped></style>
