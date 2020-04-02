<!--公用组件：文件上传
/**
 * 文件上传
 * @desc 文件上传，类似于百度上传一样的panel
 * @author youkaisteve
 * @date 2020年4月2日
 * @example 调用实例
 * 
 */
-->
<template>
  <div>
    <vue-upload-component
      ref="upload"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="files"
      :directory="directory"
      @input-file="inputFile"
      :customAction="innerCustomAction"
    ></vue-upload-component>
    <el-dropdown @command="handleCommand">
      <el-tooltip content="可拖拽文件或文件夹进行上传" placement="top">
        <el-button size="small" type="primary" @click="handleCommand('UPLOAD_FILES')">上传</el-button>
      </el-tooltip>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="UPLOAD_FILES">上传文件</el-dropdown-item>
        <el-dropdown-item command="UPLOAD_FOLDER">上传文件夹</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <panel
      :show.sync="showUpload"
      :files="files"
      extensions="jpeg,jpg,gif,png,doc,doc_,docx,xls,xls_,xlsx,txt,pdf,rar,zip,tar,jar,dwg,dws,dwt,dxf,csv,flv,swf,avi,mov,wmv,mp4,ppt,pptx,rvt,rfa,rte,dgn,obj,ifc,cgr,dwf,pln,stp,vwx"
    ></panel>
    <div v-if="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>上传文件到当前目录下</h3>
    </div>
  </div>
</template>
<script>
import VueUploadComponent from "vue-upload-component";
import Panel from "./_panel.vue";
export default {
  inheritAttrs: false,
  components: {
    VueUploadComponent,
    Panel
  },
  props: {
    customAction: Function
  },
  data() {
    return {
      files: [],
      showUpload: false,
      directory: false
    };
  },
  methods: {
    /**
     * 开始上传
     */
    start() {
      this.$refs.upload.active = true;
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        this.showUpload = true;
        this.start();
      }
      if (newFile && oldFile) {
        if (newFile.progress !== oldFile.progress) {
          console.log(newFile.progress);
        }
      }
    },
    handleCommand(command) {
      if (command === "UPLOAD_FOLDER") {
        if (!this.$refs.upload.features.directory) {
          this.$message.error("Your browser does not support");
          return;
        }
        let input = this.$refs.upload.$el.querySelector("input");
        input.directory = true;
        input.webkitdirectory = true;
        this.directory = true;

        input.onclick = null;
        input.click();
        input.onclick = () => {
          this.directory = false;
          input.directory = false;
          input.webkitdirectory = false;
        };
      }
      if (command === "UPLOAD_FILES") {
        let input = this.$refs.upload.$el.querySelector("input");
        input.click();
      }
    },
    // eslint-disable-next-line no-unused-vars
    async innerCustomAction(file, component) {
      if (this.$props.customAction) {
        const customResult = await this.$props.customAction(file);
        if (customResult.success) {
          let uploadResult;
          if (component.features.html5) {
            if (component.shouldUseChunkUpload(file)) {
              uploadResult = await component.uploadChunk(file);
            }
            if (file.putAction) {
              uploadResult = await component.uploadPut(file);
            }
            if (file.postAction) {
              uploadResult = await component.uploadHtml5(file);
            }
          } else if (file.postAction) {
            uploadResult = await component.uploadHtml4(file);
          }
          if (uploadResult.response) {
            this.$refs.upload.update(file, {
              uploaded: uploadResult.response.success
            });
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.drop-active {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 9999;
  opacity: 0.6;
  text-align: center;
  background: #000;
  h3 {
    margin: -0.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 0;
  }
}
</style>