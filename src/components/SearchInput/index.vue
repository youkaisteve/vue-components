<template>
  <el-input v-bind="$attrs" v-on="listeners" @keyup.enter.native="handleEnterKeyup"></el-input>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SearchInput',
  inheritAttrs: false,
  computed: {
    listeners() {
      return {
        ...this.$listeners
      }
    }
  },
  created() {
    if (!Vue.config.keyCodes || !Vue.config.keyCodes.enter) {
      Vue.config.keyCodes.enter = 13
    }
  },
  methods: {
    handleSearchClick() {
      this.$emit('click-search', this.value)
    },
    handleEnterKeyup(event) {
      this.$emit('keyup-enter', event)
    }
  }
}
</script>

<style scoped>
</style>
