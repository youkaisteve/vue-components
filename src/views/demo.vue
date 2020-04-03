<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <FileUploader
          input-id="upload"
          ref="fileUploader"
          :multiple="true"
          :drop-directory="true"
          :drop="true"
          :directory="false"
          :auto-upload="true"
          post-action="http://localhost:8082/"
          :custom-action="customAction"
          :extensions="extensions"
        ></FileUploader>
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from "../components/FileUploader";
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      extensions:
        "jpeg,jpg,gif,png,doc,doc_,docx,xls,xls_,xlsx,txt,pdf,rar,zip,tar,jar,dwg,dws,dwt,dxf,csv,flv,swf,avi,mov,wmv,mp4,ppt,pptx,rvt,rfa,rte,dgn,obj,ifc,cgr,dwf,pln,stp,vwx"
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    async customAction(file) {
      return { success: true, uploaded: false };
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.container {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #ff0000;
  .row {
    padding: 10px;
    display: flex;
    flex-direction: columns;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #00ff00;
    .column {
      flex: 1;
    }
  }
}
</style>