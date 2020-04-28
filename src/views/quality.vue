<template>
  <div class="quality-check-detail layout ft14">
    <div class="top">
      <div class="head flex-row justify-between">
        <div>
          <div class="desc ft20">质量详情</div>
          <div class="status flex">
            <div class="flex flex-row align-end">
              <div class="status-text">超期未整改</div>
              <div class="print-btn">
                <el-button size="medium">打印</el-button>
              </div>
            </div>
            <div class="create-time ft12">创建时间：2020/03/17 11:22</div>
          </div>
        </div>
        <div class="qr-code">qr-code</div>
      </div>
      <div class="check-form">
        <div class="title">质量检查</div>
        <div class="problem">
          <span>每栋窗户楼都缺少一颗螺丝钉</span>
          <div class="level text-center ft12">严重</div>
        </div>
        <div class="form">
          <el-form :inline="true">
            <el-form-item label="整改人：">文心心</el-form-item>
            <el-form-item label="检查时限：">2020-03-17 11:32</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
          </el-form>
        </div>
      </div>

      <div class="check-form">
        <div class="title">整改通知</div>
        <div class="form">
          <el-form :inline="true">
            <el-form-item label="整改人：">文心心</el-form-item>
            <el-form-item label="检查时限：">2020-03-17 11:32</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
            <el-form-item label="检查区域：">2栋2号场地</el-form-item>
          </el-form>
        </div>
      </div>

      <div class="check-form">
        <div class="title">通知人</div>
        <div class="form">周星星、陈希希、文月月</div>
      </div>
    </div>
    <div class="tabs">
      <el-tabs>
        <el-tab-pane label="流程进度">
          <div class="progress">progress</div>
        </el-tab-pane>
        <el-tab-pane label="整改信息">
          <div class="rectify">rectify</div>
        </el-tab-pane>
        <el-tab-pane label="检查照片">
          <div class="photos">photos</div>
        </el-tab-pane>
        <el-tab-pane label="模型视点">
          <div class="view-point">view-point</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
.quality-check-detail {
  padding: 0 42px;
  .top {
    .head {
      .desc {
        margin-left: -25px;
        color: #091732;
        padding: 24px 0;
      }
      .status {
        .status-text {
          color: #ffa437;
          font-size: 30px;
        }
        .print-btn {
          margin-left: 20px;
        }
        .create-time {
          color: #8e969a;
        }
      }
      .qr-code {
      }
    }
    .check-form {
      margin-top: 30px;
      .title {
        font-weight: bold;
        color: #8e969a;
      }
      .problem {
        margin-top: 17px;
        span {
          color: #091732;
        }
        .level {
          margin-left: 60px;
          width: 43px;
          height: 20px;
          display: inline-block;
          background-color: #f8e0a1;
          border-radius: 10px;
          color: #ff8e00;
        }
      }
      .form {
        margin-top: 10px;
        color: #091732;
        /deep/.el-form-item {
          margin-bottom: 12px;
          min-width: 230px;
        }
      }
    }
  }

  .tabs {
    margin-top: 25px;
    .progress {
    }
    .rectify {
    }
    .photos {
    }
    .view-point {
    }
  }
}
</style>