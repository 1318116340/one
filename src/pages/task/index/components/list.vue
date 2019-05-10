<template>
  <div class="task-index-list">
    <div class="empty-data" v-if="list.length === 0">暂无数据</div>
    <el-checkbox-group
      v-model="checkLists"
      @change="changeChecked"
      v-loading="loadView"
      v-else
      class="list"
    >
      <el-card v-for="item in list" :key="item.order_id">
        <div slot="header" class="clearfix">
          <el-checkbox :label="item.order_id" >{{item.title}}</el-checkbox>
          <div class="header">
            <img :src="calcCateIconUrl(item.cate_id)" alt>
            <span>【{{calcCateName(item.cate_id)}}】</span>
            <span>
              任务编号：
              <b>{{item.order_id}}</b>
            </span>
            <span>
              发布时间：
              <b>{{tool.formatDate(item.task_set_release_time * 1000)}}</b>
            </span>
            <span>
              操作时间：
              <b>{{tool.formatDate(item.updated_at * 1000)}}</b>
            </span>
          </div>
        </div>
        <div class="content">
          <div class="panel clearfix">
            <div class="image">
              <img :src="item.task.item_pic" alt>
            </div>
            <ul style="width:280px;" class="desc-ul">
              <li>
                掌柜：
                <b>{{item.shop_name || '-'}}</b>
              </li>
              <li>订单号：{{item.third_order_id || '对方未填写'}}</li>
            </ul>
            <ul style="width:200px;" class="desc-ul">
              <li>
                实付：
                <b>{{item.u_capital}}</b> 元
              </li>
              <li>
                价格：
                <b>{{item.capital}}</b> 元
              </li>
              <li>
                奖励 ：
                <b>{{item.commission}}</b> 元
              </li>
            </ul>
            <div class="icon-benyong" v-if="params.status === 3 && item.money_status === '3'"></div>
            <div class="icon-benjing" v-if="params.status === 2 && item.money_status === '1'"></div>
            <div class="right-aside">
              <ul class="actions">
                <li v-if="params.status === 0">
                  <el-tag
                    type="warning"
                    size="medium"
                    v-if="item.countdown !== '' && item.countdown !== undefined"
                  >待申请</el-tag>
                  <el-tag type="danger" size="medium" v-else>已结束</el-tag>
                </li>
                <li v-if="params.status === 1">
                  <el-tag
                    type="success"
                    size="medium"
                    v-if="item.countdown !== '' && item.countdown !== undefined"
                  >已申请</el-tag>
                  <el-tag type="danger" size="medium" v-else>已结束</el-tag>
                </li>
                <li v-if="params.status === 2">
                  <el-tag type="success" size="medium">已下单待确认</el-tag>
                </li>
                <li v-if="params.status === 2 && (item.countdown === '' || item.countdown === undefined)">
                  <el-tag type="success" size="medium" >可确认收货</el-tag>
                </li>
                <li v-if="params.status === 3">
                  <el-tag type="success" size="medium">试用完成</el-tag>
                </li>
                <li v-if="params.status === 4">
                  <el-tag type="success" size="medium">任务完成</el-tag>
                </li>
                <li v-if="params.status === 6">
                  <el-tag type="success" size="medium">已确认收货</el-tag>
                </li>
                <li v-if="params.status === -2">
                  <el-tag
                    type="danger"
                    size="medium"
                    v-if="params.status === -2 && item.complain && item.complain.is_need_platform_service === '1'"
                  >客服已介入</el-tag>
                  <el-tag type="success" size="medium" v-else>投诉中</el-tag>
                </li>
                <li v-if="params.status === -2">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleDialogComplain({open:true,complainId:item.task_order_compain_id})"
                  >投诉详情</el-button>
                </li>
                <li v-if="item.countdown && item.countdown!==''">{{item.countdown}}</li>
                <!-- <li>
                  <el-button type="success" size="mini">提醒收货</el-button>
                </li>-->
              </ul>
              <list-actions
                ref="list-actions"
                :params="params"
                :info="item"
                @getTaskList="getTaskList"
                @handleDialog="handleDialog"
              ></list-actions>
            </div>
          </div>
        </div>
        <div
          class="footer"
          style="padding:15px;text-align:right;"
          v-if="params.status === 2 && item.money_comfirm === '0' && item.u_capital !== item.capital"
        >
          <div
            style="display:block;color:red;font-weight:500;"
          >该订单实际支付金额为¥{{item.u_capital}}，需确认付款金额后才能返本金</div>
        </div>
        <div class="footer clearfix">
          <span class="buyer" v-if="item.buyer && item.buyer.account">
            买手：
            <b>{{item.buyer.account}}</b>
            <el-tooltip
              class="item"
              effect="dark"
              :content="'投诉对方'"
              placement="right"
              v-if="params.status !== -2 && params.status !== 3"
            >
              <el-button
                type="danger"
                plain
                size="mini"
                style="margin-left:20px;"
                @click="complain(item.order_id)"
              >投诉买手</el-button>
            </el-tooltip>
             <el-tag style="margin-left: 20px" v-if="params.status === -2" type="danger" size="medium">投诉方：{{item.complain.type===1?'买手':'商家'}}</el-tag>
          </span>
          <div
            class="inlineBlock"
            style="vertical-align: bottom; margin-bottom: 2px;"
            v-if="params.status === 3 && item.to_buyer_evaluate === '0'"
          >
            <el-popover placement="right" width="150" trigger="click" v-model="item.rateVisible">
              <div style="margin: 0;text-align:center;">
                <el-rate
                  v-model="item.rate"
                  show-text
                  :max="3"
                  :texts="['差评', '中评', '好评']"
                  style="margin-bottom:10px;"
                ></el-rate>
                <el-button size="mini" type="text" @click="item.rateVisible = false">取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleSubmitRate({level:item.rate,id:item.order_id})"
                >确定</el-button>
              </div>
              <el-button
                type="primary"
                size="mini"
                style="margin-left:20px;"
                slot="reference"
                v-if="params.status === 3"
              >评价</el-button>
            </el-popover>
          </div>
          <div
            class="inlineBlock"
            style="margin-left:20px;vertical-align: top;margin-top: 6px;"
            v-if="params.status === 3 && item.to_buyer_evaluate !== '0'"
          >
            <el-rate
              v-model="item.to_buyer_evaluate"
              disabled
              show-text
              :max="3"
              :texts="['差评', '中评', '好评']"
            ></el-rate>
          </div>

          <div style="float:right;">
            备注:
            <el-input v-model="item.hirer_remark" size="small"></el-input>
            <el-button
              type="primary"
              size="small"
              @click="saveRemark({id:item.order_id,remark:item.hirer_remark})"
            >保存</el-button>
          </div>
        </div>
      </el-card>
    </el-checkbox-group>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getTaskList(params_refresh)"></i>
      <el-pagination
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :current-page="pg.currentPage"
        :page-sizes="pg.sizes"
        :page-size="pg.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pg.total"
      ></el-pagination>
    </div>
    <task-image-dialog
      :dialogVisible="dialogVisible"
      :orderId="orderId"
      @handleDialog="handleDialog"
    ></task-image-dialog>
    <task-complain-detail-dialog
      :dialogVisible="dialogVisibleComplain"
      :complainId="complainId"
      @handleDialog="handleDialogComplain"
    ></task-complain-detail-dialog>
  </div>
</template>
<script>
import {
  GetTaskList,
  HandleAddRemark,
  HandleEvaluateBuyer
} from '@/api/pages/task'
import { GetSetConfig } from '@/api/common'
import tool from '@/libs/tool'
import { map, cloneDeep, indexOf } from 'lodash'
import listActions from './list-actions'
import Vue from 'vue'
import pluginExport from '@/plugin/export'
const taskImageDialog = () => import('./task-image-dialog')
const taskComplainDetailDialog = () => import('./task-complain-detail-dialog')
Vue.use(pluginExport)
export default {
  props: {
    // 分类选项
    optionsCate: {
      type: Array,
      required: false,
      default: () => {
        return []
      }
    }
  },
  mixins: [tool],
  data () {
    return {
      value4: null,
      tool: tool,
      loadView: false,
      checkLists: [],
      list: [],
      ids: [],
      params: {
        status: 0
      },
      params_refresh: {},
      remark: '',
      pg: {
        pageSize: 20,
        total: 1,
        currentPage: 1,
        sizes: [20, 50, 100]
      },
      taskInterval: '',
      countdownTips: {
        '0': '任务回收剩余时间: ',
        '1': '下单剩余时间: ',
        '2': '剩余待确认时间: ',
        '6': '确认完成剩余时间: ',
        '3': null,
        '-2': null
      },
      config: {
        orderTime: 3600, // 下单总时长
        commissionTime: 3600 // 返佣总时长
      },
      dialogVisible: false,
      orderId: '',
      dialogVisibleComplain: false,
      complainId: '',
      exportData: {
        columns: [
          {
            label: '任务编号',
            prop: 'order_id'
          }, {
            label: '订单号',
            prop: 'third_order_id'
          },
          {
            label: '发布时间',
            prop: 'task_set_release_time'
          },
          {
            label: '掌柜',
            prop: 'shop_name'
          },
          {
            label: '宝贝链接',
            prop: 'item_url'
          },
          {
            label: '宝贝价格',
            prop: 'capital'
          },
          {
            label: '佣金',
            prop: 'commission'
          },
          {
            label: '买手',
            prop: 'buyer'
          }
        ],
        data: [],
        title: '任务'
      },
      export: 0
    }
  },
  components: {
    listActions,
    taskImageDialog,
    taskComplainDetailDialog
  },
  computed: {
    listenReqParams () {
      return this.$store.state.task.params
    },
    listenCheckAll () {
      return this.$store.state.task.checkAll
    },
    // 是否批量操作
    isHandleBatch () {
      return indexOf([0, 2], this.params.status) !== -1
    },
    // 批量操作
    listenHandlebatch () {
      return this.$store.state.task.actions
    },
    activedBtns () {
      return this.actions.filter(item => {
        return indexOf(item.status, this.params.status) !== -1
      })
    }
  },
  watch: {
    // 通过监听search传过来的参数刷新列表
    listenReqParams: function (val) {
      this.params.status = val.status
      this.params_refresh = val
      this.getTaskList(val)
    },
    // 通过全选操作
    listenCheckAll: function (val) {
      this.checkLists = val[0] ? cloneDeep(this.ids) : []
    },
    listenHandlebatch: function (val) {
      const param = val[0]
      if (this.checkLists.length === 0) {
        this.$message.error(
          '请选勾选要操作的任务，点击左侧全选可勾选当页所有任务'
        )
      } else {
        switch (param.value) {
          case 1:
            this.$refs['list-actions'][0].addTimeInBatch({
              id: this.checkLists.join(',')
            })
            break
          case 2:
            this.$refs['list-actions'][0].addFeeInBatch({
              id: this.checkLists.join(',')
            })
            break
          case 3:
            this.$refs['list-actions'][0].confirmRecover(
              this.checkLists.join(',')
            )
            break
          case 4:
            this.exportData.title =
              '任务' + tool.formatDate(new Date(), 'yyyyMMddhhmmss')
            this.exportData.data = this.createCheckedListData()
            this.exportCsv()
            break
          case 5:
            this.exportData.title =
              '任务' + tool.formatDate(new Date(), 'yyyyMMddhhmmss')
            this.exportData.data = this.createCheckedListData()
            this.exportExcel()
            break
          default:
            break
        }
      }
    }
  },
  mounted () {
    this.getSetConfig()
    this.getTaskList({ status: 0 })
  },
  methods: {
    /**
     * @description 生成选中的列表数据
     */
    createCheckedListData (result = []) {
      let totalList = this.getTaskAllList(this.params_refresh)
      map(totalList, (item, table = {}) => {
        if (indexOf(this.checkLists, item.order_id) !== -1) {
          table = {
            order_id: '\t' + item.order_id,
            third_order_id: '\t' + item.third_order_id || '对方未填写',
            task_set_release_time:
              '\t' + tool.formatDate(item.task_set_release_time * 1000),
            shop_name: item.shop_name,
            item_url: item.task.item_url,
            commission: item.commission,
            capital: item.capital
          }
          if (item.buyer && item.buyer.account) {
            table.buyer = item.buyer.account
          }
          result.push(table)
        }
      })
      return result
    },
    handleDialog ({ open, id }) {
      if (open) {
        this.orderId = id
      }
      this.dialogVisible = open || false
    },
    handleDialogComplain ({ open, complainId }) {
      if (open) {
        this.complainId = complainId
      }
      this.dialogVisibleComplain = open || false
    },
    complain (id) {
      this.$refs['list-actions'][0].complain(id)
    },
    exportCsv (params = {}) {
      this.$export
        .csv({
          columns: this.exportData.columns,
          data: this.exportData.data,
          title: this.exportData.title
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导出CSV成功'
          })
        })
    },
    exportExcel () {
      this.$export
        .excel({
          columns: this.exportData.columns,
          data: this.exportData.data,
          title: this.exportData.title
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '导出表格成功'
          })
        })
    },
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.scrollViewToTop()
      this.getTaskList(this.params_refresh)
    },
    /**
     * @description 改变当前页码
     * @param {Number} val 新的页码
     */
    changeCurrentPage (val) {
      this.pg.currentPage = val
      this.scrollViewToTop()
      this.getTaskList(this.params_refresh)
    },
    /**
     *@description 列表滚动到顶部
     */
    scrollViewToTop () {
      document.documentElement.scrollTop = 0
    },
    /**
     * @description 保存备注
     */
    handleSaveRemark (id) {},
    /**
     * @description 计算任务分类名称
     */
    calcCateName (id) {
      let name = ''
      map(this.optionsCate, item => {
        if (item.id === id) {
          name = item.name
        }
      })
      return name
    },
    /**
     * @description 计算任务分类图片URL
     */
    calcCateIconUrl (cate) {
      const urls = ['taobao', 'jingdong', 'pingduoduo']
      return `${this.$baseUrl}image/${urls[cate - 1]}.png`
    },
    /**
     * @description 选中商品
     */
    changeChecked (val) {
      let checkedCount = val.length
      let checkAll = checkedCount === this.list.length
      let isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
      this.$store.commit('handelTaskState', {
        checkParams: {
          checkAll,
          isIndeterminate
        }
      })
    },
    /**
     * @description 生成包含当前页列表所有ID的数组 || 设置倒计时参数
     */
    createIds (val, arr = []) {
      map(val.list, item => {
        arr.push(item.order_id)
        this.$set(item, 'countdown', this.initCountdown(item))
      })
      this.ids = arr
    },
    /**
     * @description 保存备注
     */
    saveRemark ({ id, remark }) {
      this.handleAddRemark({ id, remark })
    },

    formatTime (n) {
      return n < 10 ? '0' + n : '' + n
    },
    /**
     * @description 是否需要倒计时
     */
    isNeedCountdown () {
      return indexOf([0, 1, 2, 6], this.params.status) !== -1
    },
    /**
     * @description 初始化倒计时
     */
    initCountdown (task, endtime = '', hh = '', mm = '', ss = '') {
      if (!this.isNeedCountdown()) {
        return this.countdownTips[String(this.params.status)]
      } else {
        switch (this.params.status) {
          case 0:
            endtime = task.recovery_task_time - 0
            break
          case 1:
            endtime = task.start_time - 0 + this.config.orderTime
            break
          case 2:
            const orderConfirmTime = task.task.requirement.order_confirm_time.value
            if (orderConfirmTime === '0') {
              return '马上确认'
            } else if (orderConfirmTime === '6') {
              return '按物流确认'
            } else {
              endtime = task.order_time - 0 + orderConfirmTime * 24 * 3600
            }
            break
          case 6:
            endtime = task.order_time - 0 + this.config.commissionTime
            break
          default:
            break
        }
        const time = (parseInt(endtime) * 1000 - new Date().getTime()) / 1000
        if (time <= 0) {
          return ''
        } else {
          hh = Math.floor((time / 60 / 60) % 24)
          mm = Math.floor((time / 60) % 60)
          ss = Math.floor(time % 60)
          var str =
            this.formatTime(hh) +
            ':' +
            this.formatTime(mm) +
            ':' +
            this.formatTime(ss)
          return this.countdownTips[String(this.params.status)] + str
        }
      }
    },
    /**
     * @description 开启倒计时
     */
    startCountdown () {
      clearInterval(this.taskInterval)
      this.taskInterval = setInterval(() => {
        map(this.list, item => {
          const result = this.initCountdown(item)
          item.countdown = result
        })
      }, 1000)
    },
    /**
     * @description 页面加载状态
     * @param {Boolean} status true:开始加载 false:结束加载
     */
    changeTaskLoadStatus (status) {
      this.loadView = status
      this.$store.commit('handelTaskState', { loading: status })
    },
    /**
     * @description 评分
     */
    handleSubmitRate ({ level, id }) {
      this.handleEvaluateBuyer({ level, id })
    },
    /**
     * @description 请求 - 获取全部任务列表
     */
    getTaskAllList (val = this.params_refresh) {
      if (this.loadView) return
      this.changeTaskLoadStatus(true)
      const params = Object.assign(
        cloneDeep(this.params),
        {
          page: this.pg.currentPage,
          'per-page': this.pg.pageSize,
          'export': 1
        },
        val
      )
      GetTaskList(params)
        .then(res => {
          return res.list || []
        })
        .catch(err => {
          console.log(err)
          return []
        })
        .finally(() => {
          this.changeTaskLoadStatus(false)
        })
    },
    /**
     * @description 请求 - 获取任务列表
     */
    getTaskList (val = this.params_refresh) {
      if (this.loadView) return
      this.changeTaskLoadStatus(true)
      const params = Object.assign(
        cloneDeep(this.params),
        {
          page: this.pg.currentPage,
          'per-page': this.pg.pageSize
        },
        val
      )
      GetTaskList(params)
        .then(res => {
          this.list = res.list || []
          this.pg.total = res.pages.totalCount - 0 || 0
          this.checkLists = []
          this.$store.commit('handelTaskState', {
            checkParams: {
              checkAll: false,
              isIndeterminate: false
            }
          })
          this.createIds(res)
          if (!this.isNeedCountdown()) {
            return this.countdownTips[String(this.params.status)]
          } else {
            this.startCountdown()
          }
          this.$store.commit('handelTaskState', { list: res })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.changeTaskLoadStatus(false)
        })
    },
    /**
     * @description 请求 - 获取系统配置信息
     */
    getSetConfig (val) {
      GetSetConfig()
        .then(res => {
          this.config.orderTime =
            res.task_auto_cancel_timeout_order_time - 0 || 3600
          this.config.commissionTime =
            res.task_auto_return_commission_time - 0 || 3600
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },

    /**
     * @description 请求 - 添加/更新备注
     */
    handleAddRemark ({ id, remark }) {
      HandleAddRemark({
        order_id: id,
        remark: remark
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '备注成功'
          })
          this.getTaskList(this.params_refresh)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 添加/更新备注
     */
    handleEvaluateBuyer ({ level, id }) {
      HandleEvaluateBuyer({
        level,
        order_id: id
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '评价成功'
          })
          this.getTaskList()
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
.task-index-list {
  .el-card {
    margin-bottom: 15px;
    .el-card__header {
      padding: 16px 20px;
    }
    .el-card__body {
      position: relative;
      padding: 15px 20px;
    }
  }
  .el-checkbox {
    vertical-align: middle;
    margin-right: 5px;
  }
  .header {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;

    img {
      display: inline-block;
      vertical-align: middle;
      width: 18px;
      height: 18px;
      border-radius: 4px;
    }
    & > span {
      vertical-align: middle;
      margin-right: 30px;
      b {
        color: orangered;
      }
    }
  }
  .content {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
    .panel {
      .image {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      img {
        height: 100px;
        max-width: 100px;
      }
      b {
        color: orangered;
      }
      .right-aside {
        display: flex;
        justify-content: center;
        float: right;
      }
      .actions {
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
      .desc-ul {
        display: inline-block;
        padding: 10px 0;
        margin: 0;
        vertical-align: top;
        list-style: none;
        li {
          width: 100%;
          line-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .footer {
    border-top: 1px dotted #dcdfe6;
    padding-top: 15px;
    font-size: 14px;
    font-size: 0;
    overflow: hidden;
    .buyer {
      display: inline-block;
      font-size: 14px;
      line-height: 32px;
    }
    .el-input {
      width: 300px;
      margin: 0 10px;
      vertical-align: middle;
    }
    .el-button {
      vertical-align: middle;
    }
  }
  .empty-data {
    padding: 50px;
    text-align: center;
    border: 1px dotted #ddd;
    color: #606266;
    font-size: 14px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .icon-benyong,
  .icon-benjing {
    position: absolute;
    top: 50px;
    left: 570px;
    width: 84px;
    height: 30px;
    transform: rotate(-30deg);
  }
  .icon-benyong {
    background: url("~@/pages/task/images/benyong.png") no-repeat center center;
    background-size: 100% 100%;
  }
  .icon-benjing {
    background: url("~@/pages/task/images/benjing.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>
