# components

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Components

#### FileUploader

使用了[vue-upload-component](https://lian-yue.github.io/vue-upload-component/#/zh-cn/documents)

```html
<!--公用组件：文件上传
/**
 * 文件上传
 * @desc 文件上传，类似于百度上传一样的panel
 * @author youkaisteve
 * @date 2020年4月2日
 * @params {Function} customAction(file):Promise<{success:Boolean,uploaded:Boolean}> - file:文件实例；success:处理成功；uploaded：是否已经上传
 * @params {Boolean} autoUpload - 是否自动上传
 * @params {Function} responseHandler - 处理上传结果的方法，需要返回Promise<Boolean>,true表示处理成功，否则为失败
 * events
 * @done - 全部完成，无论失败还是成功
 * methods
 * upload - 触发上传，是否支持文件夹要根据设置情况来定
 * uploadFolder - 触发上传文件夹
 * @example 调用实例
 * FileUploader
        input-id="upload"
        ref="fileUploader"
        :multiple="true"
        :drop-directory="true"
        :drop="true"
        :directory="false"
        post-action="http://localhost:8082/"
    ></FileUploader>
 */
-->
<template>
    <FileUploader
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
        @done="done"
    >
    </FileUploader>
</template>

<script>
import FileUploader from '/path/to/FileUploader'
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      extensions: /\.*/i
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    async customAction(file) {
      return { success: true, uploaded: false }
    },
    done() {
      console.log('done')
    },
    async responseHandler(response) {
      console.log('responseHandler', response)
      return true
    }
  }
}
</script>
```
