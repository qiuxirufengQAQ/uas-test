<template>
    <div>
      <a-form layout="horizontal" v-if="conditions && conditions.length>0">
        <!-- 查询条件 -->
        <a-row>
          <a-col :md="rowCol.md" :sm="rowCol.sm" v-for="(item,index) in conditions" :key="item.aliasKey || item.key">
            <a-form-item :label="item.label" :labelCol="labelCol" :wrapperCol="wrapperCol" v-show="index<4 || advanced">
             <!-- INPUT -->
              <a-input v-if="item.inputType === 'INPUT'" v-model="searchQuery[item.aliasKey || item.key]" />
             <!-- SELECT -->
              <a-select v-if="item.inputType === 'SELECT'" v-model="searchQuery[item.aliasKey || item.key]" @change="value => handleOptionChange(value,item)">
                <a-select-option value="" v-if="!item.defaultValue">全部</a-select-option>
                <a-select-option v-for="opt in getSelectOptions(item.options)" :key="opt.value" :value="opt.value">{{opt.text}}</a-select-option>
              </a-select>
             <!-- DATE PICKER -->
              <a-date-picker v-if="item.inputType === 'DATEPICKER'" v-model="searchQuery[item.aliasKey || item.key]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 查询按钮 -->
        <a-row>
          <span style="float: right; margin-top: 24px;">
            <a-button type="primary" @click="()=>{searchQuery.pageQuery.page = 1;queryPageData()}">查询</a-button>
            <a-button style="margin-left: 8px" @click="resetSearchQuery">重置</a-button>
            <a @click="toggleAdvanced" style="margin-left: 8px" v-show="conditions.length>4">
              {{advanced ? '收起' : '展开'}}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-row>
        <a-divider />
      </a-form>
      <div>
        <!-- 操作区 -->
        <div class="operator" v-if="this.$slots.operator">
          <slot name="operator"></slot>
        </div>
        <!-- 数据 -->
        <a-table
            size="small"
            :bordered="bordered"
            :columns="filterColumns"
            :dataSource="pageData.content"
            :pagination="pagination"
            :scroll="scroll"
            rowKey="id"
            @change="onChange"
            @expandedRowsChange="expandedRowsChange"
            :expandedRowKeys="expandedRowKeys"
            v-if="!isMobile"
        >
          <template v-for="name in slots" :slot="name" slot-scope="data">
            <slot :name="name" :data="data"></slot>
          </template>
        </a-table>
        <template v-else>
          <a-list itemLayout="vertical" :dataSource="pageData.content" :pagination="mPagination">
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
                <p v-if="c.dataIndex && index !== 0" :key="index">{{c.title}}:&nbsp;{{item[c.dataIndex] | render(c, item)}}</p>
                <p v-else-if="index !== 0 && !c.scopedSlots" :key="index">{{c.title}}:&nbsp;{{item | render(c, item)}}</p>
              </template>
              <template slot="actions">
                <slot name="action" :data="item"></slot>
              </template>
            </a-list-item>
          </a-list>
        </template>
      </div>
    </div>
</template>

<script>
import constant from "../../utils/constant";
const pagination = {
  size: "small",
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "30", "40", "50"]
};

export default {
  name: "PageTable",
  props: {
    bordered: {
      type: Boolean,
      required: false,
      default: true
    },
    conditions: {
      type: Array,
      required: false,
      default: () => []
    },
    columns: {
      type: Array,
      required: true
    },
    pageData: {
      type: Object,
      required: true
    },
    slots:{
      type: Array,
      required: false,
      default: () => ['id','action','status', 'mAction']
    },
    scroll:{
      type: Object,
      required: false,
    },
    sort: {
      type: Array,
      required: false,
      default: () => []
    },
    hidePagination:{
      type: Boolean,
      required: false,
      default: false
    },
    disableInitQuery:{
      type: Boolean,
      required: false,
      default: false
    },
  },
  data() {
    return {
      advanced: false,
      rowCol: { md: 6, sm: 24 },
      labelCol: { span: 7, offset: 1 },
      wrapperCol: { span: 16 },
      searchQuery: { pageQuery: { page: 1, size: 10 } },
      expandedRowKeys:[]
    };
  },
  filters: {
    render(v, c,item) {
      if(c.customRender && typeof(c.customRender) === 'function'){
        return c.customRender(v,item);
      }else{
        return v;
      }
    }
  },
  computed: {
    filterColumns(){
      if(this.$store.state.app.isMobile){
        return this.columns.filter(c => !c.hideInMobile);
      }
      return this.columns;
    },
    pagination() {
      if(this.hidePagination){
        return false;
      }
      return {
        ...pagination,
        total: this.$props.pageData.totalElements,
        current: this.searchQuery.pageQuery.page,
        pageSize: this.searchQuery.pageQuery.size,
        showTotal: total => {
          const totalPage = Math.ceil(
            this.$props.pageData.totalElements / this.searchQuery.pageQuery.size
          );
          return `共 ${totalPage} 页, ${total} 条数据`;
        }
      };
    },
    mPagination() {
      if(this.hidePagination){
        return false;
      }
      const _this = this;
      return {
        ...pagination,
        total: _this.$props.pageData.totalElements,
        current: _this.searchQuery.pageQuery.page,
        pageSize: _this.searchQuery.pageQuery.size,
        onChange: (page) => {
          if (page) {
            _this.searchQuery.pageQuery.page = page;
            _this.queryPageData();
          }
        }
      };
    },
    isMobile() {
      return this.$store.state.app.isMobile;
    }
  },
  methods: {
    getSelectOptions(options) {
      if (typeof options === "string") {
        return constant[options] ? constant[options] : [];
      }
      if (options instanceof Function) {
        options = options(this);
      }
      if (options instanceof Array) {
        const newOpt = [];
        options.map(i => {
          if(typeof i === "string" || typeof i === "number"){
            newOpt.push({ value: i, text: i })
          }else{
            newOpt.push(i)
          }
        });
        options = newOpt;
      }
      return options;
    },
    handleOptionChange(value, item) {
      if (item.change) {
        item.change(value, this);
      }
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    initCondition() {
      // this.$props.conditions.forEach(condition => {
      //   this.$set(this.searchQuery, condition.aliasKey || condition.key, null);
      // });

      if(this.$props.conditions){
        this.$props.conditions.forEach(con => {
          if(con.defaultValue){
             this.$set(this.searchQuery, con.aliasKey || con.key,con.defaultValue);
          } else {
             this.$set(this.searchQuery, con.aliasKey || con.key, null);
          }
        })
      }

      if(this.$props.sort && this.$props.sort.length){
        this.searchQuery.sort = this.$props.sort;
      }
    },
    initColumns() {
      this.$props.columns.forEach(column => {
        if (!column.align) {
          column.align = "center";
        }
      });
    },
    resetSearchQuery() {
      this.searchQuery.pageQuery.page = 1;
      this.searchQuery.pageQuery.size = 10;
      this.initCondition();
      this.queryPageData();
    },
    getQueryParams(){
      const params = {
        pageQuery: this.searchQuery.pageQuery,
        conditions: []
      };

      this.$store.commit("app/setGlobalPageQuery", 
        { 
          path: this.$route.fullPath, 
          pageQuery:this.searchQuery.pageQuery,
          searchQuery: this.searchQuery
        }
      );

      if(this.searchQuery.sort && this.searchQuery.sort.length){
        params.sort = this.searchQuery.sort;
      }

      this.$props.conditions.forEach(condition => {
        if (this.searchQuery[condition.aliasKey || condition.key]) {
          const value = this.searchQuery[condition.aliasKey || condition.key];
          if(condition.inputType === "DATEPICKER"){
            if(condition.judgeType === "BETWEEN"){
              value.hours(0).minute(0).second(0).millisecond(0);
              params.conditions.push({
                condition: condition.key + "." + condition.judgeType,
                values: [value.valueOf(), value.valueOf() + 86400000]
              });
              return;
            }else if (condition.judgeType === "GE" || condition.judgeType === "GT"){
              value.hours(0).minute(0).second(0).millisecond(0);
              params.conditions.push({
                condition: condition.key + "." + condition.judgeType,
                value: value.valueOf()
              });
              return;
            }else if (condition.judgeType === "LE" || condition.judgeType === "LT"){
              value.hours(0).minute(0).second(0).millisecond(0);
              params.conditions.push({
                condition: condition.key + "." + condition.judgeType,
                value: value.valueOf() + 86400000
              });
              return;
            }
          }

          if(condition.judgeType === "JSON_EQ"){
              params.conditions.push({ 
                condition: condition.key + "." + condition.judgeType,
                values:[condition.jsonPath,value]
              });
              return;
          }

          params.conditions.push({ 
            condition: condition.key + "." + condition.judgeType, value: value
          });
        }
      });
      return params;
    },
    queryPageData() {
      this.$emit("query", this.getQueryParams());
    },
    onChange(page) {
      //change事件会被触发两次
      if (
        page.current !== this.searchQuery.pageQuery.page ||
        page.pageSize !== this.searchQuery.pageQuery.size
      ) {
        this.searchQuery.pageQuery.page = page.current;
        this.searchQuery.pageQuery.size = page.pageSize;
        this.queryPageData();
      }
    },
    expandedRowsChange(expandedRows){
      this.expandedRowKeys = expandedRows.filter(i => this.expandedRowKeys.indexOf(i) < 0);
      let data = undefined;
      if(this.expandedRowKeys.length > 0){
        data = this.pageData.content[this.expandedRowKeys[0]];
      }
      this.$emit("expandedRowsChange",data)
    }
  },
  created() {
    const path = this.$route.fullPath;
    if(this.$store.state.app.globalPageQuery[path]){
      this.searchQuery.pageQuery = this.$store.state.app.globalPageQuery[path];
      this.searchQuery = this.$store.state.app.globalSearchQuery[path];
    }
    this.initCondition();
    if(!this.disableInitQuery){
      this.queryPageData();
    }
    this.initColumns();
  }
};
</script>

<style lang="less" scoped>
.ant-form-item {
  margin-bottom: 0px;
}
.operator {
  margin-bottom: 18px;
}
.action-slot {
  span{
    color: '#99CCFF';
  }
}
</style>
