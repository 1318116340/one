<template>
  <div class="task-complain-detail-dialog">
    <el-dialog
      title="投诉详情"
      :visible.sync="dialogVisibleCopy"
      :before-close="closeDialog"
      width="600px"
      ref="dialog"
    >
      <div v-loading="load_view">
        <div
          class="chat-panel clearfix"
          v-for="(item,index) in list"
          :key="index"
          :class="item.username ? 'other':'mine'"
        >
          <div class="avatar"></div>
          <div class="popover">
            <div class="info">
              <span class="username">{{item.username || '我'}}</span>
              <span class="date">{{tool.formatDate(item.time * 1000)}}</span>
            </div>
            <div class="text">{{item.content}}</div>
            <div class="popover__arrow"></div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row :gutter="5">
          <el-col :span="20">
            <el-input placeholder="请输入内容" v-model="content" clearable size="medium"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button
              @click="handleComplainAppeal()"
              type="primary"
              size="medium"
              :loading="load_submit"
            >{{submitBtnText}}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetComplainDetail, HandleComplainAppeal } from '@/api/pages/task'
import { reverse } from 'lodash'
import tool from '@/libs/tool'
export default {
  mixins: [tool],
  props: {
    complainId: {
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
      tool: tool,
      dialogVisibleCopy: false,
      load_view: false,
      list: [],
      content: '',
      load_submit: false,
      btn_submit: ['回复', '回复中']
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  // 每次页面渲染完之后滚动条在最底部
  updated: function () {
    this.$nextTick(function () {
      const body = this.$refs.dialog.$el.querySelector('.el-dialog__body')
      if (body) {
        body.scrollTop = body.scrollHeight
      }
    })
  },
  // 第一次页面渲染完之后滚动条在最底部
  mounted: function () {
    this.$nextTick(function () {
      const body = this.$refs.dialog.$el.querySelector('.el-dialog__body')
      if (body) {
        body.scrollTop = body.scrollHeight
      }
    })
  },
  watch: {
    dialogVisible: function (val, oldVal) {
      this.dialogVisibleCopy = val
      if (val) {
        this.list = []
        this.getComplainDetail()
      }
    }
  },
  methods: {
    closeDialog () {
      this.$emit('handleDialog', false)
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
    getComplainDetail () {
      this.load_view = true
      GetComplainDetail({ task_order_compain_id: this.complainId })
        .then(res => {
          this.list = reverse(res.content)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_view = false
        })
    },
    /**
     * @description 请求 - 提交证据
     */
    handleComplainAppeal () {
      if (this.content.trim().length > 0) {
        this.load_submit = true
        HandleComplainAppeal({
          task_order_compain_id: this.complainId,
          content: this.content
        })
          .then(res => {
            this.content = ''
            this.$message({
              type: 'success',
              message: '回复成功'
            })
            this.getComplainDetail()
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => {
            this.load_submit = false
          })
      }
    }
  }
}
</script>
<style lang="scss">
.task-complain-detail-dialog {
  .el-dialog {
    width: 600px;
    height: calc(70vh + 60px);
  }
  .el-dialog__body {
    height: calc(70vh - 130px);
    overflow-y: scroll;
  }
  .avatar {
    width: 40px;
    height: 40px;
    background: url("http://www.du17w.cn/api/avatar/show.php?username=cs123&size=large")
      no-repeat center center;
    background-size: 100% 100%;
    float: left;
  }
  .chat-panel {
    margin-bottom: 10px;
    .popover {
      background: #fff;
      min-width: 220px;
      max-width: 360px;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      padding: 10px;
      z-index: 2000;
      color: #606266;
      line-height: 1.4;
      text-align: justify;
      font-size: 14px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      word-break: break-all;
      display: inline-block;
      position: relative;
      min-height: 20px;
      .popover__arrow {
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.5));
        position: absolute;
        z-index: 11;
        top: 20px;

        margin-bottom: 3px;
      }
      .info {
        margin-bottom: 8px;
        .username {
          line-height: 22px;
          color: orangered;
        }
        .date {
          float: right;
          font-size: 12px;
          line-height: 22px;
        }
      }
      .text {
        color: #333;
        font-size: 16px;
      }
    }
    &.mine {
      text-align: right;
      .avatar {
        float: right;
      }
      .popover {
        right: 20px;
        .popover__arrow {
          right: -6px;
          border-left-color: #fff;
          border-right-width: 0;
        }
      }
      .info {
        .username {
          color: green;
        }
      }
    }
    &.other {
      .popover {
        left: 20px;
        .popover__arrow {
          left: -6px;
          border-right-color: #fff;
          border-left-width: 0;
        }
      }
    }
  }
}
</style>
