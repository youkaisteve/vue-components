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
<style lang="scss" scoped>
.search-tree {
  .tree-search-input {
    /deep/.el-input__inner {
      border: none;
    }
  }
}
</style>