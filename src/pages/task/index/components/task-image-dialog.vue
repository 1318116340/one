<template>
  <div class="task-image-dialog">
    <el-dialog
      title="任务截图"
      :visible.sync="dialogVisibleCopy"
      :before-close="closeDialog"
      width="600px"
    >
      <div v-loading="load_view">
         <el-dialog :visible.sync="dialogVisibleImage" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <div class="panel" v-for="(item,index) in list" :key="index">
          <div class="title">{{item.name}}</div>
          <div class="image" v-for="(img,i) in cutupImageData(item.value)" :key="i">
            <img :src="img" alt>
            <el-button class="zoom" size="mini" icon="el-icon-zoom-in" @click="handleZoomIn(img)"></el-button>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="small">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetTaskCutImages } from '@/api/pages/task'
export default {
  props: {
    orderId: {
      type: String,
      required: false,
      default: function () {
        return ''
      }
    },
    dialogVisible: {
      type: Boolean,
      required: false,
      default: function () {
        return false
      }
    }
  },
  data () {
    return {
      dialogVisibleCopy: false,
      load_view: false,
      list: [],
      dialogVisibleImage: false,
      dialogImageUrl: false
    }
  },
  watch: {
    dialogVisible: function (val, oldVal) {
      this.dialogVisibleCopy = val
      if (val) {
        this.list = []
        this.getTaskCutImages()
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('handleDialog', false)
    },
    submit () {
      this.$refs['testOrderForm'].validate(valid => {
        if (valid) {
          this.getTaskCutImages()
        }
      })
    },
    /**
     * @description 放大图片
     * @param {String} url 图片的地址
     */
    handleZoomIn (url) {
      this.dialogImageUrl = url
      this.dialogVisibleImage = true
    },
    /**
     * @description 分割字符，返回数组
     */
    cutupImageData (val) {
      return val.split(',')
    },
    /**
     * @description 请求 - 获取任务截图
     */
    getTaskCutImages () {
      this.load_view = true
      GetTaskCutImages({ order_id: this.orderId })
        .then(res => {
          this.list = res || []
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_view = false
        })
    }
  }
}
</script>
<style lang="scss">
.task-image-dialog {
  .panel{
    margin-bottom: 15px;
  }
  .title {
    font-size: 16px;
    color: #409eff;
    font-weight: 500;
  }
  .image {
    display: inline-block;
    margin: 0 20px 10px 0;
    img {
      display: block;
      height: 100%;
      height: 200px;
      border: 1px dotted #e4e7ed;
      border-bottom: none;
    }
    .zoom {
      width: 100%;
      font-size: 16px;
      border: 1px dotted #e4e7ed;
      border-radius: 0;
    }
  }
  .el-dialog__body {
    padding: 20px;
    max-height: calc(80vh - 200px);
    overflow-y: scroll;
  }
}
</style>
