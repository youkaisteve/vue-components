<template>
  <div class="upload-wrapper" v-if="show">
    <div
      class="header flex-row justify-between cursor-hand align-center"
      @click.stop="tableVisible = !tableVisible"
    >
      <div class="ft14 font-bold" style="color:#323334;">上传列表</div>
      <div class="ft12 flex-row flex-1 ml5 align-end">
        <span class="tips ft12">单个文件最大支持500M</span>
      </div>
      <div class="close">
        <i
          :class="[{'el-icon-minus': tableVisible, 'el-icon-plus': !tableVisible}]"
          class="cursor-hand"
          @click.stop="tableVisible = !tableVisible"
        ></i>
        <i class="cursor-hand ml10 el-icon-close" @click.stop="handleClose"></i>
      </div>
    </div>
    <div class="upload-content">
      <div class="files">
        <bg-progress
          v-show="tableVisible"
          v-for="(file,index) in files"
          :key="index"
          :percentage="file.active ? file.progress : 0"
          class="flex flex-row justify-end align-center ft14 file"
        >
          <div class="flex-1 flex-row justify-start">
            <i class="file-icon mfe-iconfont mfe-wendang"></i>
            <span class="name flex-row">
              <span class="text-left text-overflow" :title="file.name">{{file.name}}</span>
              <div v-if="file.error" class="message ft12 text-left">{{file.error}}</div>
            </span>
          </div>
          <div
            class="flex size text-left"
          >{{formatSizeValue(file.size * file.progress / 100)}}/{{formatSize(file)}}</div>
          <div class="operator flex-row justify-end">
            <template v-if="!file.active && !file.error && !file.success">
              <i class="cursor-hand zhgd_iconfont zhgd_icon-icon-- start" @click.stop="start(file)"></i>
              <i class="cursor-hand zhgd_iconfont zhgd_icon-delete delete" @click.stop="del(file)"></i>
            </template>
            <template v-if="file.active">
              <i class="cursor-hand mfe-iconfont mfe-jujue uploading" @click.stop="cancel(file)"></i>
            </template>
            <template v-if="file.success">
              <i class="mfe-iconfont mfe-tongyi success"></i>
            </template>
            <template v-if="file.error">
              <i
                class="cursor-hand mfe-iconfont mfe-chongxinxiazai failed"
                @click.stop="retry(file)"
              ></i>
            </template>
          </div>
        </bg-progress>
      </div>
    </div>
  </div>
</template>
<script>
import rowMixin from './row-mixin.js'
import * as consts from './consts.js'
import BgProgress from '../BgProgress'
export default {
  components: {
    BgProgress
  },
  mixins: [rowMixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    files: {
      type: Array
    },
    extensions: {
      type: String
    }
  },
  data() {
    return {
      tableVisible: false,
      currentUploadedCount: 0,
      totalCount: 0
    }
  },
  watch: {
    show: function(val) {
      this.tableVisible = val
    }
  },
  methods: {
    cancel(file) {
      this.$emit('cancel', file, consts.ACTION_UPLOAD_CANCEL)
    },
    retry(file) {
      this.$emit('retry', file, consts.ACTION_UPLOAD_RETRY)
    },
    handleClose() {
      if (!this.finished) {
        this.$confirm('列表中有未上传完成的文件，确定要放弃上传吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.$emit('update:show', false)
          })
          .catch(() => {})
      } else {
        this.$emit('update:show', false)
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/common.less';
.upload-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  width: 650px;
  -webkit-box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  -moz-box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  z-index: 10;
  .header {
    border-radius: 2px 2px 0px 0px;
    padding: 20px 14px 14px 14px;
    box-shadow: 0px 0px 1px 0px rgba(0, 44, 108, 0.2),
      0px -1px 0px 0px rgba(236, 238, 245, 1);
    .tips {
      padding-left: 9px;
      color: #909399;
    }
    .close {
      color: #323334;
    }
  }
  .error-text {
    color: #ff0033;
  }
  .upload-content {
    max-height: 274px;
    overflow: hidden;
    .files {
      max-height: 274px;
      overflow-y: auto;
      overflow-x: hidden;
      .file {
        width: 638px;
        height: 40px;
        box-shadow: 0px 0px 0px 0px rgba(0, 44, 108, 0.2),
          0px -1px 0px 0px rgba(226, 229, 235, 1);
        margin-left: 10px;
        .file-icon {
          color: #4a86ee;
        }
        .name {
          max-width: 398px;
          padding-left: 9px;

          span {
            max-width: 269px;
            color: rgba(0, 0, 0, 1);
          }
          .message {
            padding-left: 20px;
            width: 70px;
            color: #4a86ee;
          }
        }
        .size {
          color: #909399;
          width: 130px;
        }
        .operator {
          width: 110px;
          padding-right: 16px;
          i {
            margin-left: 9px;
            font-size: 22px;
          }
          .success {
            color: #00b14d;
          }
          .uploading {
            color: #e30000;
          }
          .failed {
            color: #8e969a;
          }
          .start {
            color: #8e969a;
          }
          .delete {
            color: #8e969a;
          }
        }
      }
    }
  }
}
</style>