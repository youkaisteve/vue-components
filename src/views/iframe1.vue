<template>
  <div>
    <h1>我是iframe1</h1>
    <el-button type="primary" @click="send">发送消息</el-button>
    <el-input type="text" v-model="message"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null
    }
  },
  methods: {
    send() {
      window.parent.postMessage(
        {
          type: 'demo',
          me: 'iframe1',
          to: 'iframe2',
          data: {
            message: this.message
          }
        },
        '*'
      )
    }
  },
  created() {
    window.addEventListener('message', function(event) {
      console.log('iframe1 收到消息', event)
    })
  }
}
</script>