<template>
  <!-- 列表内容区域右侧按钮组 -->
  <ul class="task-index-list-actions">
    <div v-for="btn in activedBtns" :key="btn.id">
      <li v-if="isCreate({id:btn.id,info})">
        <el-tooltip
          class="item"
          effect="dark"
          :content="btn.tooltip"
          :disabled="!btn.tooltip || disabled"
          placement="right"
        >
          <el-button
            :type="btn.type"
            size="mini"
            @click="handleActions({id:info.order_id,status:btn.id,capital:info.u_capital,complainId:info.task_order_compain_id})"
          >{{btn.title}}</el-button>
        </el-tooltip>
      </li>
    </div>
  </ul>
</template>
<script>
import {
  HandleRecoveryTask,
  HandleAddRecoveryTime,
  HandleAddSeviceFee,
  HandleRefuse,
  HandleConfirmPrice,
  HandleRemindReceipt,
  HandleComplain,
  HandleComplainAppeal,
  HandleComplainService,
  HandleCancelComplain,
  HandleConfirmComplete
} from '@/api/pages/task'
import { indexOf } from 'lodash'
export default {
  props: {
    params: {
      type: Object,
      required: false,
      default: () => {
        return { status: 0 }
      }
    },
    info: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      actions: [
        {
          id: 0,
          status: [0],
          title: '增加时间',
          type: 'primary',
          tooltip: '延长任务回收时间'
        },
        {
          id: 1,
          status: [0],
          title: '追加奖励',
          type: 'primary',
          tooltip: '追加任务奖励'
        },
        {
          id: 2,
          status: [0],
          title: '回收任务',
          type: 'danger',
          tooltip: '点击后任务将从平台回收'
        },
        // { id: 3, status: [1], title: '审核拒绝', type: 'success' },
        {
          id: 4,
          status: [2],
          title: '确认付款金额',
          type: 'danger',
          key: 'money_comfirm',
          value: '0',
          tooltip: '确认买手实际付款金额'
        },
        {
          id: 5,
          status: [2, 3, 6],
          title: '任务截图',
          type: 'primary',
          tooltip: '查看买手提交的任务截图'
        },
        {
          id: 6,
          status: [2],
          title: '提醒收货',
          type: 'success',
          tooltip: '给买手发送提醒收货信息'
        },
        {
          id: 7,
          status: [6],
          title: '确认完成',
          type: 'success',
          tooltip: '确认任务已完成返佣给买手'
        },
        { id: 10, status: [-2], title: '撤销投诉', type: 'primary' },
        {
          id: 8,
          status: [-2],
          title: '提交证据',
          type: 'primary',
          tooltip: '输入投诉原因'
        },
        { id: 9, status: [-2], title: '客服介入', type: 'danger' },

        {
          id: -1,
          status: [1],
          title: '无可选操作',
          type: 'info',
          tooltip: '该状态下无可选择操作'
        }
      ],
      disabled: false
    }
  },
  computed: {
    activedBtns () {
      return this.actions.filter(item => {
        return indexOf(item.status, this.params.status) !== -1
      })
    }
  },
  methods: {
    /**
     * @description 按钮是否创建
     */
    isCreate ({ id, info }) {
      switch (id) {
        case 4:
          return info.money_comfirm === '0' && info.u_capital !== info.capital
        case 9:
          return !(
            info.complain && info.complain.is_need_platform_service === '1'
          )
        case 10:
          return info.is_myself_complain === 1
        default:
          return true
      }
    },
    /**
     * @description 确认回收
     */
    confirmRecover (id) {
      this.$confirm('确认要回收此任务吗？此操作不可撤销', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleRecoveryTask({ task_order_ids: id })
      })
    },
    /**
     * @description 确认审核拒绝
     */
    confirmRefuse (id) {
      this.$confirm('拒绝审核后此订单无效', '提示', {
        confirmButtonText: '审核拒绝',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleRefuse({ id: id })
      })
    },
    /**
     * @description 确认需要客服介入
     */
    confirmComplainService (id) {
      this.$confirm('您打算请求客服介入吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleComplainService({ id: id })
      })
    },
    /**
     * @description 确认撤销投诉
     */
    confirmCancleComplain (id) {
      this.$confirm('您打算撤销这条投诉吗', '提示', {
        confirmButtonText: '撤销',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleCancelComplain({ id: id })
      })
    },
    /**
     * @description 确认收货
     */
    confirmComplete (id) {
      this.$confirm('您打算确认完成吗', '提示', {
        confirmButtonText: '确认完成',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleConfirmComplete({ id: id })
      })
    },
    /**
     * @description 确认投诉
     */
    complain (id) {
      this.confirmOtherActions({
        title: '请输入投诉内容',
        type: -2,
        callback: this.handleComplain,
        id
      })
    },
    /**
     * @description 批量添加时间
     */
    addTimeInBatch ({ id }) {
      this.confirmOtherActions({
        title: '请输入追加的时间（单位：小时）',
        type: 0,
        callback: this.handleAddRecoveryTime,
        id: id
      })
    },
    /**
     * @description 批量添加佣金(奖励)
     */
    addFeeInBatch ({ id }) {
      this.confirmOtherActions({
        title: '请输入追加的金额（单位：元）',
        type: 1,
        callback: this.handleAddSeviceFee,
        id: id
      })
    },
    /**
     * @description 确认其他操作
     */
    confirmOtherActions ({ title, type, callback, id, patten }) {
      this.$prompt(title, '提示: 此操作不可撤销，请谨慎操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: patten,
        inputErrorMessage: `${title}格式不正确`
      }).then(({ value }, params = {}) => {
        params = { id, value }
        callback(params)
      })
    },
    /**
     * @description 列表各种操作
     */
    handleActions ({ id, status, capital, complainId }) {
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1000)
      switch (status) {
        case 0:
          this.confirmOtherActions({
            title: '请输入追加的时间（单位：小时）',
            type: 0,
            callback: this.handleAddRecoveryTime,
            id: id
          })
          break
        case 1:
          this.confirmOtherActions({
            title: '请输入追加的金额（单位：元）',
            type: 1,
            callback: this.handleAddSeviceFee,
            id: id
          })
          break
        case 2:
          this.confirmRecover(id)
          break
        case 3:
          this.confirmRefuse({ id })
          break
        case 4:
          this.$confirm(
            `买手确认价格为: <b style="font-size:18px;color:red;margin:0 10px;">${capital}</b>元,确认付款金额将不可撤销`,
            '提示',
            {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            this.handleConfirmPrice(id)
          })
          break
        case 5:
          this.$emit('handleDialog', { open: true, id })
          break
        case 6:
          this.handleRemindReceipt(id)
          break
        case 7:
          this.confirmComplete(id)
          break
        case 8:
          this.confirmOtherActions({
            title: '请输入您想提交的证据',
            type: 8,
            callback: this.handleComplainAppeal,
            id: complainId
          })
          break
        case 9:
          this.confirmComplainService(complainId)
          break
        case 10:
          this.confirmCancleComplain(complainId)
          break
        default:
          break
      }
    },
    /**
     * @description 操作成功提示用户和刷新列表
     */
    nextAction (message, refresh = true) {
      this.$message({
        type: 'success',
        message: message
      })
      if (refresh) {
        setTimeout(() => {
          this.$emit('getTaskList', null)
        }, 500)
      }
    },
    /**
     * @description 请求 - 回收任务
     */
    handleRecoveryTask (params) {
      HandleRecoveryTask(params)
        .then(res => {
          this.nextAction('任务回收成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 追加任务回收时间
     */
    handleAddRecoveryTime ({ id, value }) {
      HandleAddRecoveryTime({
        task_order_ids: id,
        hours: value
      })
        .then(res => {
          this.nextAction('追加时间成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 追加任务奖励
     */
    handleAddSeviceFee ({ id, value }) {
      HandleAddSeviceFee({
        task_order_ids: id,
        fee: value
      })
        .then(res => {
          this.nextAction('追加奖励成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 审核拒绝
     */
    handleRefuse ({ id }) {
      HandleRefuse({
        order_id: id
      })
        .then(res => {
          this.nextAction('已成功拒绝')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 商家确认用户提交金额
     */
    handleConfirmPrice (id) {
      HandleConfirmPrice({
        order_id: id
      })
        .then(res => {
          this.nextAction('确认成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 提醒收货
     */
    handleRemindReceipt (id) {
      HandleRemindReceipt({
        order_id: id
      })
        .then(res => {
          this.nextAction('已提醒买手收货', false)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },

    /**
     * @description 请求 - 投诉买手
     */
    handleComplain ({ id, value }) {
      HandleComplain({
        order_id: id,
        content: value
      })
        .then(res => {
          this.nextAction('投诉成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 提交证据
     */
    handleComplainAppeal ({ id, value }) {
      HandleComplainAppeal({
        task_order_compain_id: id,
        content: value
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 客服介入
     */
    handleComplainService ({ id }) {
      HandleComplainService({
        task_order_compain_id: id
      })
        .then(res => {
          this.nextAction('请等待客服联系')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 撤销投诉
     */
    handleCancelComplain ({ id }) {
      HandleCancelComplain({
        task_order_compain_id: id
      })
        .then(res => {
          this.nextAction('成功撤销投诉')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 商家确认收货
     */
    handleConfirmComplete ({ id }) {
      HandleConfirmComplete({
        order_id: id
      })
        .then(res => {
          this.nextAction('确认成功')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    }
  }
}
</script>

<style lang="scss">
.task-index-list-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  flex-grow: 1;
  width: 200px;
  margin: 0;
  border-left: 1px solid #dcdfe6;
  padding: 0;
  &:first-child {
    border-left: none;
  }
  li {
    display: flex;
    justify-content: center;
    line-height: 32px;
    margin: 4px;

    .el-button {
      min-width: 120px;
    }
    .el-tag {
      min-width: 120px;
      text-align: center;
    }
  }
}
</style>
