<template>
  <div class="search-tree flex-1 flex-column">
    <div class="tree-search-input">
      <search-input
        v-model.trim="searchKey"
        clearable
        @clear="clearSearch"
        @click-search="search"
        @keyup-enter="search"
        placeholder="输入名称搜索"
        prefix-icon="zhgd_iconfont zhgd_icon-sousuo_sousuo"
      ></search-input>
    </div>
    <div v-show="searchFlag">
      <template v-if="$slots.search">
        <slot name="search" />
      </template>
    </div>
    <el-scrollbar tag="div" class="flex-1" :view-class="scrollViewClass" v-loading="loadingVisible">
      <template v-if="!$slots.search && searchFlag">
        <el-scrollbar tag="ul" :view-class="scrollViewClass" v-loading="loadingVisible">
          <el-tree
            class="tree-container"
            v-bind="$attrs"
            :data="searchData"
            :default-expand-all="true"
            icon-class="mfe-iconfont mfe-zhankai"
            v-on="$listeners"
            ref="tree"
          >
            <div
              slot-scope="{ node, data }"
              class="flex-row node-row align-items-center justify-between flex-1 node-row"
            >
              <div class="flex-row align-items-center flex-1" style="overflow: hidden">
                <slot name="customRender" :node="node" :data="data"></slot>
                <span class="flex-1 node-name empty-menu" :title="node.label">{{node.label}}</span>
              </div>
            </div>
          </el-tree>
        </el-scrollbar>
      </template>
      <el-tree
        class="tree-container"
        v-bind="$attrs"
        icon-class="mfe-iconfont mfe-zhankai"
        v-on="$listeners"
        v-show="!searchFlag"
        ref="tree"
      >
        <div
          slot-scope="{ node, data }"
          class="flex-row node-row align-items-center justify-between flex-1 node-row"
        >
          <div class="flex-row align-items-center flex-1" style="overflow: hidden">
            <slot name="customRender" :node="node" :data="data"></slot>
            <span class="flex-1 node-name empty-menu" :title="node.label">{{node.label}}</span>
          </div>
        </div>
      </el-tree>
    </el-scrollbar>
  </div>
</template>
<script>
import SearchInput from '../SearchInput'
export default {
  inheritAttrs: false,
  name: 'SearchTree',
  components: {
    SearchInput
  },
  props: {
    searchHandler: Function,
    scrollViewClass: String
  },
  data() {
    return {
      searchFlag: false,
      searchKey: '',
      searchData: [],
      loadingVisible: false
    }
  },
  watch: {
    searchKey: function(val) {
      if (val === '') {
        this.clearSearch()
      }
    }
  },
  computed: {
    labelProperty: function() {
      return (this.$refs.tree.props && this.$refs.tree.props.label) || 'label'
    }
  },
  methods: {
    clearSearch() {
      this.searchKey = ''
      this.searchFlag = false
      this.searchData = []
    },
    async search() {
      if (
        this.searchHandler &&
        this.searchHandler.constructor.name === 'Function' &&
        this.loadingVisible === false &&
        this.searchKey
      ) {
        this.searchFlag = true

        this.loadingVisible = true
        try {
          this.searchData = await this.searchHandler(this.searchKey)
          console.log(this.searchData)
        } finally {
          this.loadingVisible = false
        }
      }
    },
    handleSearchItemClick(data) {
      this.$emit('node-click', data)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/style/var.less';
.search-tree {
  .tree-search-input {
    /deep/.el-input__inner {
      border: none;
    }
  }
  .tree-container {
    /deep/.el-tree-node {
      &.is-current {
        .el-tree-node__content {
          border-right-color: @--color-primary;
          .node-name,
          .el-tree-node__expand-icon {
            color: @--color-primary;
          }
          .el-icon-more {
            display: block;
          }
        }
        .el-tree-node__children {
          .el-tree-node__content {
            border-right-color: transparent;
            .node-name {
              color: @--color-black;
            }
            .node-row .el-icon-more {
              display: none;
            }
          }
        }
      }
      .el-tree-node__content {
        height: 40px;
        border-right: 2px solid transparent;
        .node-row {
          overflow: hidden;
        }
        .node-name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          &.empty-menu {
            padding-right: 10px;
          }
        }
        .el-tree-node__expand-icon,
        .node-name {
          font-size: @--font-size-standard;
          color: @--color-black;
        }
        .is-leaf.el-tree-node__expand-icon {
          visibility: hidden;
        }
        &:hover {
          background-color: #f3f9ff;
          .el-icon-more {
            display: block !important;
          }
          .node-name,
          .el-tree-node__expand-icon {
            color: @--color-primary;
          }
        }
      }
    }
    /deep/.el-tree-node .el-tree-node__content .el-tree-node__expand-icon {
      &.mfe-zhankai {
        color: @--color-primary;
        &:before {
          content: '\e6c3';
        }
        &.expanded {
          transform: none;
          &:before {
            content: '\e6c2';
          }
        }
      }
    }
  }
}
</style>