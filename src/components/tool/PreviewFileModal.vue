<template>
    <a-modal :visible="visible" :footer="null" @cancel="handleCancel">
        <a :href="filePath+'&download=true'">下载</a>
        <img v-show="isImage" alt="example" style="width: 100%" :src="filePath" />
    </a-modal>
</template>

<script>
export default {
  name: "PreviewFileModal",
  props: {
    visible: {
      type: Boolean,
      required: false,
      default:false
    },
    filePath: {
      type: String,
      required: false
    }
  },
  data() {
    return {};
  },
  methods:{
    handleCancel(){
      this.$emit("cancel");
    }
  },
  computed:{
      isImage(){
        if(this.filePath){
          const ext = this.filePath.substring(this.filePath.lastIndexOf(".")).toLowerCase();
          return ['.jpg','.png','.gif','.jpeg','.svg'].indexOf(ext)>=0;
        }
        return false;
      },
  },
};
</script>

<style lang="less" scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>