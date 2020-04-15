<template>
  <div class="normal-search-page">
    <el-row class="top">
      <el-row>
        <el-col :span="24" class="header">
          <span>模型管理</span>
        </el-col>
      </el-row>
      <el-row class="filters">
        <el-form :inline="true" class="flex-row justify-between">
          <el-form-item label="上传日期：">
            <el-date-picker
              size="medium"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="文件名称：">
            <el-input size="medium"></el-input>
          </el-form-item>
          <el-form-item label="模型状态：">
            <el-select v-model="modelStatus" placeholder="请选择" size="medium">
              <el-option
                v-for="item in modelStatusEnum"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="btns flex-row justify-center">
        <el-button @click="reset" size="medium">重置</el-button>
        <el-button type="primary" @click="search" class="pl10" size="medium">查询</el-button>
      </el-row>
    </el-row>
    <el-row class="content">
      <el-col :span="24">
        <el-row class="operate flex-row justify-between">
          <el-col :span="12">
            <el-button size="medium">转换</el-button>
            <el-button size="medium">下载</el-button>
            <FileUploader
              ref="fileUploader"
              wrapperStyle="display:inline-block;"
              :multiple="true"
              :drop-directory="true"
              :drop="true"
              :directory="false"
              :btnProps="{size:'medium'}"
            ></FileUploader>
            <el-button size="medium">删除</el-button>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="6" class="flex justify-end">
            <search-input
              clearable
              v-model="keyword"
              size="medium"
              placeholder="输入文件名称"
              prefix-icon="zhgd_iconfont zhgd_icon-sousuo_sousuo"
            ></search-input>
          </el-col>
        </el-row>
        <search-table
          :columns="columns"
          @selection-change="handleSelectionChange"
          :tableData="tableData"
        ></search-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SearchTable from '../components/SearchTable'
import FileUploader from '../components/FileUploader'
export default {
  components: {
    SearchTable,
    FileUploader
  },
  data() {
    return {
      modelStatusEnum: [
        {
          key: 1,
          value: '转换中'
        }
      ],
      keyword: '',
      modelStatus: 1,
      columns: [
        { type: 'selection', width: '55px' },
        { prop: 'sysNo', label: '文件ID', minWidth: '100px' },
        { prop: 'name', label: '文件名称', minWidth: '150px' },
        { prop: 'modelStatus', label: '模型状态', minWidth: '100px' },
        { prop: 'size', label: '文件大小', minWidth: '100px' },
        { prop: 'inUserName', label: '上传者', minWidth: '100px' },
        {
          prop: 'inDate',
          label: '上传时间',
          minWidth: '120px'
        },
        {
          prop: 'operate',
          label: '操作',
          minWidth: '50px',
          fixed: 'right',
          showOverflowTooltip: false
        }
      ],
      tableData: [
        { sysNo: 1, name: '测试', inDate: new Date() },
        { sysNo: 2, name: '测试1' }
      ]
    }
  },
  methods: {
    reset() {},
    search() {},
    handleSelectionChange(params) {
      console.log(params)
    }
  }
}
</script>
<style lang="less" scoped>
.normal-search-page {
  border: solid 1px;
  width: 1131px;
  /deep/.el-button--medium {
    padding: 10px 24px;
  }
  .top {
    height: 175px;
    .header {
      color: #091732;
      font-size: 20px;
      padding: 24px 22px 24px 15px;
    }
    .filters {
      padding-left: 24px;
      padding-right: 54px;
      .filter {
        .label {
          width: 85px;
        }
        .data {
          height: 36px;
          width: 243px;
        }
      }
    }
  }
  .content {
    border: solid 1px;
    padding: 20px;
    .operate {
      font-size: 13px;
      /deep/.el-button {
        margin-left: 10px;
      }
    }
  }
}
</style>