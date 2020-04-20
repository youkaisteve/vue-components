<template>
  <div class="input-popover" :style="{'width':width + 24 + 'px'}">
    <el-popover
      ref="popover"
      :width="width"
      placement="bottom-start"
      trigger="click"
      :visible-arrow="false"
      @show="showSlot"
      @hide="hideSlot"
    >
      <slot v-show="show" />
    </el-popover>
    <div class="el-select" :class="{'is-reverse': show}" v-popover:popover>
      <el-input
        v-bind="$attrs"
        v-on="$listeners"
        suffix-icon="el-icon-caret-bottom"
        :disabled="disabled"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'InputPopover',
  props: {
    width: Number
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showSlot() {
      this.show = true
    },
    hideSlot() {
      this.show = false
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped>
.input-popover {
  .el-select {
    width: 100%;
    &.is-reverse {
      .el-input {
        .el-input__icon {
          -ms-transform: rotate(180deg);
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>