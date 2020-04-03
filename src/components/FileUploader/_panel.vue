<template>
  <div class="upload-wrapper" v-if="show">
    <div class="header flex-row justify-between cursor-hand" @click.stop="tableVisible = false">
      <div>{{finished?'上传完成':'上传中'}} ({{currentUploadedCount}}/{{totalCount}})</div>
      <div class="ft12 flex-row flex-1 ml5 align-end">
        <div>
          <i class="el-icon-info" style="color: #666666;"></i>
          <span>单个文件最大支持500M</span>
        </div>
      </div>
      <div class="mr20">
        <i
          :class="[{'el-icon-minus': tableVisible, 'el-icon-plus': !tableVisible}]"
          class="cursor-hand"
          @click.stop="tableVisible = !tableVisible"
        ></i>
        <i class="cursor-hand ml10 el-icon-close" @click.stop="handleClose"></i>
      </div>
    </div>
    <el-table v-show="tableVisible" :data="files" style="width: 100%">
      <el-table-column prop="name" :formatter="fileName" label="名称"></el-table-column>
      <el-table-column prop="size" label="大小" :formatter="formatSize" width="140"></el-table-column>
      <el-table-column prop="progress" label="进度" :formatter="formatProgress" width="80"></el-table-column>
      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          <i
            v-if="scope.row.uploaded && !scope.row.error"
            class="zhgd_iconfont zhgd_icon-roundcheckfill"
            style="color: #09af67"
          ></i>
          <i v-if="scope.row.active" class="el-icon-loading" style="color: #09af67"></i>
          <div v-else>
            <span v-if="!scope.row.uploaded && !scope.row.error && !scope.row.active">等待上传</span>
            <div v-if="scope.row.error">
              <el-tooltip v-if="scope.row.errorType==='extension'" effect="light">
                <div slot="content">
                  支持以下格式
                  <br />
                  {{extensions}}
                </div>
                <i class="el-icon-warning">{{scope.row.error}}</i>
              </el-tooltip>
              <span
                v-else
                :class="scope.row.errorType==='server' && 'error-text'"
              >{{scope.row.error}}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <i
            v-if="!scope.row.uploaded && !scope.row.error"
            class="cursor-hand zhgd_iconfont zhgd_icon-delete1"
            @click.stop="cancel(scope.$index)"
          ></i>
          <i
            v-if="scope.row.error"
            class="cursor-hand zhgd_iconfont zhgd_icon-xuanzhuan"
            @click.stop="retry(scope.$index)"
          ></i>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import rowMixin from "./row-mixin.js";

export default {
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
      totalCount: 0,
      finished: false
    };
  },
  watch: {
    files: {
      deep: true,
      handler: function(value) {
        if (!this.tableVisible && value && value.length > 0) {
          this.tableVisible = true;
        }
        this.currentUploadedCount = value.filter(m => m.uploaded).length;
        this.totalCount = value.length;
        const correctCount = value.filter(m => !m.error).length;
        if (this.currentUploadedCount === correctCount) {
          this.finished = true;
        } else {
          this.finished = false;
        }
      }
    }
  },
  methods: {
    cancel(index) {
      this.$emit("cancel", index);
    },
    retry(index) {
      this.$emit("retry", index);
    },
    handleClose() {
      if (!this.finished) {
        this.$confirm("列表中有未上传完成的文件，确定要放弃上传吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$emit("update:show", false);
          })
          .catch(() => {});
      } else {
        this.$emit("update:show", false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../assets/style/common.less";
.upload-wrapper {
  position: absolute;
  bottom: 5px;
  right: 10px;
  background: #fff;
  max-height: 400px;
  width: 45%;
  -webkit-box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  -moz-box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  box-shadow: 0 0 10px rgba(204, 204, 204, 0.5);
  z-index: 10;
  .header {
    background: rgba(191, 229, 255, 0.07);
    padding: 10px;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: transparent;
  }
  .el-table__body-wrapper {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 400px;
    min-height: 200px;
  }
  .error-text {
    color: #ff0033;
  }
}
</style>