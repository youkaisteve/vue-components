<template>
  <div class="container">
    <div class="row">
      <div class="column">
        <file-uploader
          ref="fileUploader"
          :multiple="true"
          :drop-directory="true"
          :drop="true"
          :directory="false"
          :auto-upload="true"
          post-action="http://localhost:8082/"
          :custom-action="customAction"
          :responseHandler="responseHandler"
          :extensions="extensions"
          @done="uploadSuccess"
        ></file-uploader>
      </div>
      <div class="column">
        <popover-input v-model="keyword" clearable :width="300">
          <search-tree
            node-key="id"
            scrollViewClass="tree-scroll"
            :props="treeProps"
            :data="treeData"
            :search-handler="searchTree"
            :expand-on-click-node="false"
            @node-click="treeNodeClick"
          ></search-tree>
        </popover-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      extensions: '.rvt',
      treeProps: {
        label: 'text',
        children: 'children'
      },
      treeData: [
        {
          id: 1,
          text: '1',
          isLeaf: false,
          children: [
            {
              id: 2,
              text: '1-1',
              isLeaf: true
            }
          ]
        }
      ],
      searchData: [],
      keyword: ''
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    async customAction(file) {
      return { success: true, uploaded: false }
    },
    uploadSuccess() {
      console.log('success')
    },
    async responseHandler(response) {
      console.log('responseHandler', response)
      return true
    },
    async searchTree() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.searchData = [
            {
              id: 10,
              text: '自定义'
            }
          ]
          // 仅demo使用，和上面对searchData的赋值不应该同时使用,但是也要resolve([])，取消loading
          resolve([
            {
              id: 1,
              text: '1',
              isLeaf: false,
              children: [
                {
                  id: 2,
                  text: '2',
                  isLeaf: true
                },
                {
                  id: 3,
                  text: '3',
                  isLeaf: false,
                  children: [
                    {
                      id: 4,
                      text: '4',
                      isLeaf: true
                    },
                    {
                      id: 5,
                      text: '5',
                      isLeaf: true
                    }
                  ]
                }
              ]
            }
          ])
        }, 1000)
      })
    },
    treeNodeClick(data) {
      console.info(data)
      this.keyword = data.text
    }
  }
}
</script>

<style lang="scss" scoped>
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
      /deep/.el-tabs__item {
        &.is-active {
          color: #091732;
        }
      }
    }
  }

  /deep/ .tree-scroll {
    height: 661px;
  }
}
.popover-input {
  width: 300px;
}
</style>