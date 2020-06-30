<template>
  <div class="container">
    <div class="left">
      <iframe src="/#/iframe1" id="iframe1" />
    </div>
    <div class="right">
      <iframe src="/#/iframe2" id="iframe2" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sendMessage(iframeid, data) {
      var frame = document.getElementById(iframeid)
      frame.contentWindow.postMessage(data, '*')
    }
  },
  created() {
    window.addEventListener('message', event => {
      if (event.data && event.data.type === 'demo') {
        console.log(`主页面收到来自[${event.data.me}]消息`)
        this.sendMessage(event.data.to, event.data.data)
      }
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 800px;
  display: flex;
  flex-direction: row;
  .left {
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
}
</style>