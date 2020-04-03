<!--公用组件：文件上传
/**
 * 文件上传
 * @desc 文件上传，类似于百度上传一样的panel
 * @author youkaisteve
 * @date 2020年4月2日
 * @params {Function} customAction(file):{success:Boolean,uploaded:Boolean} - file:文件实例；success:处理成功；uploaded：是否已经上传
 * @example 调用实例
 * FileUploader
        input-id="upload"
        ref="fileUploader"
        :multiple="true"
        :drop-directory="true"
        :drop="true"
        :directory="false"
        post-action="http://localhost:8082/"
    ></FileUploader>
 */
-->
<template>
  <div>
    <vue-upload-component
      ref="upload"
      v-bind="$attrs"
      v-on="$listeners"
      v-model="files"
      @input-file="inputFile"
      :extensions="$props.extensions"
      :customAction="innerCustomAction"
    ></vue-upload-component>
    <el-dropdown @command="handleCommand">
      <el-tooltip content="可拖拽文件或文件夹进行上传" placement="top">
        <el-button size="small" type="primary" @click="handleCommand('UPLOAD_FILES')">上传</el-button>
      </el-tooltip>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="UPLOAD_FILES">上传文件</el-dropdown-item>
        <el-dropdown-item
          v-if="$refs.upload && $refs.upload.features.directory"
          command="UPLOAD_FOLDER"
        >上传文件夹</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <panel
      :show.sync="showPanel"
      :files="files"
      :extensions="$props.extensions"
      @cancel="handleFileAction"
    ></panel>
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>拖拽到这里上传</h3>
    </div>
  </div>
</template>
<script>
import VueUploadComponent from "vue-upload-component";
import Panel from "./_panel.vue";
import * as consts from "./consts.js";

export default {
  inheritAttrs: false,
  components: {
    VueUploadComponent,
    Panel
  },
  props: {
    customAction: Function,
    autoUpload: Boolean
  },
  data() {
    return {
      files: [],
      showPanel: false,
      directory: false,
      // 通过了input-filter检查后的文件
      checkedCount: 0
    };
  },
  watch: {
    showPanel: function(val) {
      if (val === false) {
        this.checkedCount = 0;
        this.$refs.upload.clear();
      }
    }
  },
  methods: {
    /**
     * 开始上传
     */
    start() {
      console.log("start");
      this.$refs.upload.active = true;
    },
    inputFile(newFile, oldFile) {
      // 新增文件
      if (newFile && !oldFile) {
        console.log("新增文件");
        this.checkedCount++;
        console.log("checkedCount", this.checkedCount);
        this.showPanel = true;
        if (
          this.$props.autoUpload &&
          this.checkedCount === this.files.length &&
          !this.$refs.upload.active
        ) {
          this.start();
        }
      }
      // 更新文件
      if (newFile && oldFile) {
        console.log("更新文件");
        if (newFile.error && newFile.error !== oldFile.error) {
          switch (newFile.error) {
            case consts.UPLOAD_EXT_ERROR_TYPE:
              newFile.uploaded = newFile.success = false;
              newFile.errorType = consts.UPLOAD_EXT_ERROR_TYPE;
              newFile.error = consts.UPLOAD_EXT_ERROR;
          }
        }
      }
      // 删除文件
      if (!newFile && oldFile) {
        console.log("删除文件");
      }
    },
    handleCommand(command) {
      let input;
      switch (command) {
        case "UPLOAD_FOLDER":
          if (!this.$refs.upload.features.directory) {
            this.$message.error("Your browser does not support");
            return;
          }
          input = this.$refs.upload.$el.querySelector("input");
          input.directory = true;
          input.webkitdirectory = true;

          input.onclick = null;
          input.click();
          input.onclick = () => {
            input.directory = false;
            input.webkitdirectory = false;
          };
          break;
        case "UPLOAD_FILES":
          this.$refs.upload.$el.querySelector("input").click();
          break;
        default:
          break;
      }
    },
    handleFileAction(file, action) {
      let updateData;
      switch (action) {
        case consts.ACTION_UPLOAD_CANCEL:
          updateData = {
            success: false,
            uploaded: false,
            active: false,
            errorType: consts.UPLOAD_CANCEL_ERROR_TYPE,
            error: consts.UPLOAD_CANCEL_ERROR
          };
          break;
        case consts.ACTION_UPLOAD_RETRY:
          updateData = {
            success: false,
            uploaded: false,
            active: true
          };
          break;
        default:
          break;
      }
      if (updateData) {
        this.$ref.upload.update(file, updateData);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async innerCustomAction(file, component) {
      if (file.size === 0) {
        this.$refs.upload.update(file, {
          success: false,
          uploaded: false,
          errorType: consts.UPLOAD_EMPTY_ERROR_TYPE,
          error: consts.UPLOAD_EMPTY_ERROR
        });
        return;
      }
      if (this.$props.customAction) {
        const customResult = await this.$props.customAction(file);
        if (customResult.success) {
          // 文件已经上传，这里就不上传了
          if (customResult.uploaded) {
            this.$refs.upload.update(file, {
              success: true,
              uploaded: true
            });
          }
        } else {
          this.$refs.upload.update(file, {
            uploaded: false,
            success: false,
            error: customResult.errorMessage,
            errorType: consts.UPLOAD_SERVER_ERROR_TYPE
          });
        }

        // 如果customAction已经上传了，则不需要这里再次上传了
        if (customResult.uploaded) {
          return;
        }
      }
      try {
        const uploadResult = await this.uploadFile(file, component);
        if (uploadResult.response) {
          this.$refs.upload.update(file, {
            success: uploadResult.response.success,
            uploaded: uploadResult.response.success
          });
        }
      } catch (err) {
        console.log(err);
        this.$refs.upload.update(file, {
          success: false,
          error: consts.UPLOAD_SERVER_ERROR,
          errorType: consts.UPLOAD_SERVER_ERROR_TYPE
        });
      }
    },
    async uploadFile(file, component) {
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
      return uploadResult;
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