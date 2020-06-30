<template>
  <div>
    <h1>我是iframe2</h1>
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
          me: 'iframe2',
          to: 'iframe1',
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
      console.log('iframe2 收到消息', event)
    })
  }
}
</script>