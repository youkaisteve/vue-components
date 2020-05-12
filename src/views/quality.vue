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
        <div class="qr-code">
          <div class="code">
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
          </div>
          <div>编号：1111</div>
        </div>
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
          <div class="progress flex flex-1">
            <div class="panel">
              <div class="node flex-row">
                <div class="line"></div>
                <div class="index flex center">
                  <span class="ft20">1</span>
                </div>
                <div class="content">
                  <div class="status">待整改</div>
                  <div class="user-date">
                    <span class="user">温心心</span>
                    <span class="date">2020-04-02</span>
                  </div>
                </div>
              </div>
              <div class="node flex-row">
                <div class="line"></div>
                <div class="index flex center">
                  <span class="ft20">2</span>
                </div>
                <div class="content">
                  <div class="status">待整改</div>
                  <div class="user-date">
                    <span class="user">温心心</span>
                    <span class="date">2020-04-02</span>
                  </div>
                </div>
              </div>
              <div class="node flex-row">
                <div class="line"></div>
                <div class="index flex center">
                  <span class="ft20">3</span>
                </div>
                <div class="content">
                  <div class="status ft16">待整改</div>
                  <div class="user-date flex-row">
                    <span class="user">温心心</span>
                    <span class="date">2020-04-02</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="整改信息">
          <div class="rectify">
            <div class="panel">
              <el-row class="section">
                <div class="title">第一次整改</div>
                <el-col :span="12">
                  <el-form>
                    <el-form-item label="处理情况：">已按要求整改</el-form-item>
                    <el-form-item label="整改人：">才华</el-form-item>
                    <el-form-item label="整改时间：">2020-03-08</el-form-item>
                    <el-form-item label="整改照片："></el-form-item>
                  </el-form>
                  <div class="photos">
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                  </div>
                </el-col>
                <el-col :span="12">
                  <el-form>
                    <el-form-item label="复检意见：">已按要求整改</el-form-item>
                    <el-form-item label="复检人：">才华</el-form-item>
                    <el-form-item label="复查时间：">2020-03-08</el-form-item>
                    <el-form-item label="复验照片："></el-form-item>
                  </el-form>
                  <div class="photos">
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                    <img
                      src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes"
                    />
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检查照片">
          <div class="photos">
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
            <img src="https://oss.yzw.cn/889ca6a9-fbbc-4ca1-92bc-98480e6ca502.jpg?v=null&oss=yes" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="模型视点">
          <div class="view-point">
            <div class="flex-row justify-between">
              <div>
                <span class="title">选择模型：</span>
                <el-select size="medium">
                  <el-option>111</el-option>
                  <el-option>222</el-option>
                  <el-option>333</el-option>
                </el-select>
              </div>
              <el-button size="medium">选定构件</el-button>
            </div>
            <div class="model-container" id="bimViewPoint"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="less" scoped>
.quality-check-detail {
  color: #091732;
  padding: 0 42px;
  .top {
    .head {
      .desc {
        margin-left: -25px;
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
        /deep/.el-form-item {
          margin-bottom: 0;
          min-width: 230px;
        }
      }
    }
  }

  .tabs {
    margin-top: 25px;
    .progress {
      .panel {
        .node {
          &:first-child {
            padding-top: 7px;
          }
          padding-top: 40px;
          .line {
            z-index: -999;
            position: absolute;
            left: 21px;
            border-left: 1px solid #4a86ee;
            height: 100%;
          }
          .index {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: #4a86ee;
            span {
              color: #ffffff;
            }
          }
          .content {
            padding-left: 14px;
            .status {
              color: #2d3950;
            }
            .user-date {
              font-size: 12px;
              color: #2d3950;
              .date {
                margin-left: 8px;
              }
            }
          }
        }
      }
    }
    .rectify {
      .panel {
        /deep/.el-form-item {
          margin-bottom: 0;
        }
        .section {
          .photos {
            img {
              width: 123px;
              height: 108px;
              padding: 10px 30px 0 0;
            }
          }
        }
      }
    }
    .photos {
      img {
        width: 123px;
        height: 108px;
        padding: 10px 30px 0 0;
      }
    }
    .view-point {
      .model-container {
        min-height: 512px;
        border-radius: 6px;
        border: 1px solid #f6f8fa;
        margin-top: 38px;
      }
    }
  }
}
</style>