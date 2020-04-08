<template>
  <div class="search-tree">
    <div class="tree-search-input">
      <search-input
        v-model.trim="searchKey"
        clearable
        @clear="clearSearch"
        @click-search="search"
        @keyup-enter="search"
      ></search-input>
    </div>
    <div class="tree-search-result" v-show="searchFlag">
      <template v-if="$slots.search">
        <slot name="search" />
      </template>
      <template v-else>
        <ul>
          <li
            v-for="(item,index) in searchData"
            :key="index"
            class="flex-row"
            @click="handleSearchItemClick(item)"
          >{{item[labelProperty]}}</li>
        </ul>
      </template>
    </div>
    <div class="tree" v-loading="loadingVisible">
      <el-tree ref="tree" v-bind="$attrs" v-on="$listeners" v-show="!searchFlag"></el-tree>
    </div>
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
    searchHandler: Function
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