<!--
/**
 * 背景进度条
 * @desc 利用背景色作为进度条
 * @author steve.k.you
 * @date 2020年4月10日
 */
-->
<template>
  <div style="position:relative;">
    <div class="progress-bar" :style="style" />
    <slot />
  </div>
</template>
<script>
export default {
  name: 'bg-progress',
  props: {
    percentage: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: '#E9F3FF'
    }
  },
  data() {
    return {
      width: this.percentage
    }
  },
  watch: {
    percentage: function(val) {
      if (val >= 0) {
        this.width = val
      } else {
        this.width = 0
      }
    }
  },
  computed: {
    style: function() {
      return {
        'background-color': this.color,
        width: this.width + '%',
        'z-index': -999
      }
    }
  }
}
</script>
<style lang="less" scoped>
.progress-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>