<template>
  <div class="issue-tabs">
    <el-tabs type="border-card" @tab-click="handleClickTab" v-model="name">
      <el-tab-pane :label="`1. ${tabs[0]}`">
        <infomation
          :info="info"
          ref="infomation"
          name="0"
          @calcExtraServiceFee="calcExtraServiceFee"
          @calcMainServiceFee="calcMainServiceFee"
          @calcTaskPressing="calcTaskPressing"
          @switchCate="switchCate"
          :loadView="loadView"
        ></infomation>
      </el-tab-pane>
      <el-tab-pane :label="`2. ${tabs[1]}`">
        <task-claim
          :info="info"
          ref="taskClaim"
          name="1"
          @calcExtraServiceFee="calcExtraServiceFee"
          :loadView="loadView"
        ></task-claim>
      </el-tab-pane>
      <el-tab-pane :label="`3. ${tabs[2]}`">
        <buyer-claim
          :info="info"
          ref="buyerClaim"
          name="2"
          @calcExtraServiceFee="calcExtraServiceFee"
          :loadView="loadView"
        ></buyer-claim>
      </el-tab-pane>

      <el-tab-pane :label="`4. ${tabs[3]}`">
        <statistics
          :info="info"
          ref="statistics"
          name="3"
          @calcAddServiceFee="calcAddServiceFee"
          :loadView="loadView"
        ></statistics>
      </el-tab-pane>
    </el-tabs>
    <!-- 锚点 定位使用 -->
    <div class="issue-anchor"></div>
    <el-card class="info-card" :class="fixed ? 'isFixed':''">
      <div class="clearfix">
        <ul class="ul-unstyle">
          <li>
            服务费：
            <b>{{totalServiceFee}}</b>元
          </li>
          <li>
            任务押款：
            <b>{{pressingPrice}}</b>元
          </li>
          <li>
            我的余额：
            <b>{{userInfo.balance}}</b> 元
          </li>
          <li>
            <el-button style="background-color: #fff;color: #409EFF;border-color: #409EFF"
              size="meidum"
              @click="enterFundsPage()"
            >充值</el-button>
          </li>
        </ul>
        <div class="btns">
          <el-button
            type="primary"
            size="meidum"
            @click="handleAction('prev')"
            v-if="index !== 0"
          >上一步：{{tabs[index - 1]}}</el-button>
          <el-button
            type="primary"
            size="meidum"
            style="float:right;"
            v-if="index !== tabs.length -1"
            @click="handleAction('next')"
          >下一步：{{tabs[index + 1]}}</el-button>
          <el-button
            type="danger"
            size="meidum"
            style="float:right;"
            v-if="index === tabs.length -1"
            @click="handleAction('submit')"
            :loading="load_submit"
          >发布</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import infomation from './infomation'
import taskClaim from './task-claim'
import buyerClaim from './buyer-claim'
import statistics from './statistics'
import { GetTaskInfo, HandleSubmitTask } from '@/api/pages/task'
import { GetMemberInfo } from '@/api/pages/member/index'
import { merge, map, cloneDeep, has, sortedIndex } from 'lodash'
export default {
  data () {
    return {
      info: {},
      index: 0,
      name: '0',
      tabs: ['商品信息', '任务要求', '买家要求', '发布统计'],
      currentCateId: '1',
      loadView: false,
      extraServiceFee: {},
      extra_service_fee_params: {}, // 记录服务费用参数
      totalServiceFee: 0.0,
      serviceFee: {
        extra: 0.0,
        add: 0.0,
        main: 0.0
      },
      pressingPrice: 0.0,
      pressing: {
        unit_price: 0,
        task_num: 1,
        quantity: 1
      },
      userInfo: {
        balance: 0.0
      },
      btn_submit: ['发布', '发布中'],
      load_submit: false,
      fixed: true,
      task: 0
    }
  },
  components: {
    infomation,
    taskClaim,
    buyerClaim,
    statistics
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  watch: {
    $route (to, from) {
      this.currentCateId = to.query.cateId
      this.task = to.query.task
      this.getTaskInfo()
    }
  },
  created () {
    this.currentCateId = this.$route.query.cateId || '1'
    this.task = this.$route.query.task
  },
  mounted () {
    this.getMemberInfo()
    this.getTaskInfo()
    // 监听滚动，定位信息栏
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed () {
    // 销毁滚动监听
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let offsetTop = document.querySelector('.issue-anchor').offsetTop + 100
      this.fixed = !(scrollTop + windowHeight > offsetTop)
    },
    enterFundsPage () {
      this.$router.push({
        path: 'funds/charge'
      })
    },
    /**
     * @description 切换tabs
     */
    handleClickTab (val) {
      this.index = val.index - 0
    },
    /**
     * @description 切换分类
     */
    switchCate (val) {
      this.$router.push({
        name: 'issue',
        query: {
          cateId: val
        }
      })
    },
    /**
     * @description 操作
     * @param {String} type 类型
     */
    handleAction (type) {
      switch (type) {
        case 'prev':
          this.name = String(this.index - 1)
          break
        case 'next':
          this.name = String(this.index - 0 + 1)
          break
        case 'submit':
          this.name = '3'
          this.handleSubmit()
          break
        default:
          break
      }
      this.index = this.name - 0
    },
    /**
     * @description 提交数据
     */
    handleSubmit (banArea = []) {
      console.log(merge({ extra_service_fee: this.serviceFee.extra }, this.$refs.infomation.form,
        this.$refs.taskClaim.form,
        this.$refs.buyerClaim.form,
        this.$refs.statistics.form
      ))
      let results = merge(
        { extra_service_fee: this.serviceFee.extra },
        this.$refs.infomation.form,
        this.$refs.taskClaim.form,
        this.$refs.buyerClaim.form,
        this.$refs.statistics.form
      )
      // 处理禁用地区
      map(results.requirement.ban_area, item => {
        banArea.push({
          provinces: item.open_bank_citys[0] || '',
          city: item.open_bank_citys[1] || ''
        })
      })
      results.requirement.ban_area = banArea
      if (this.checkValidity(results)) {
        this.HandleSubmitTask(results)
      }
    },
    /**
     * @description 校验数据
     */
    checkValidity (result, message = '') {
      const tips = {
        task_cate_id: '请在商品信息中选择 所属分类',
        shop_id: '请在商品信息选择 掌柜',
        item_cate: '请在商品信息选择 宝贝分类',
        unit_price: '请在商品信息填写 商品价格',
        multi_search_words: '请在商品信息中填写至少一组 搜索词',
        task_num: '请在商品信息中填写 任务数量',
        quantity: '请在商品信息中填写 拍下数量',
        item_pic: '请在商品信息中最少上传一张主图',
        item_url: '请在商品信息中填写 商品连接地址',
        append_service_fee: '请在发布统计中填写 追加佣金'
      }
      for (let key in tips) {
        if (result[key] === '' || result[key].length === 0) {
          message = tips[key]
          break
        }
      }
      if (message === '') {
        return true
      } else {
        this.$message.error(message)
      }
    },

    /**
     * @description 弹窗提示用户继续操作还是前往绑定掌柜
     */
    confirmBindsShopkeeper (taskName) {
      this.$confirm(
        `您的<b>【${taskName}】</b>还没有绑定掌柜，是否前往掌柜页面绑定？`,
        '提示',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '前往绑定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        this.$router.push({ name: 'shopkeeper' })
      })
    },
    /**
     * @description 生成额外佣金集合
     */
    creatServiceFee (data, extraServiceFee = {}) {
      map(data, item => {
        map(item, i => {
          if (i.form_type === '4') {
            // 生成了佣金对象
            extraServiceFee[i.field_name] = {}
            map(i.option, option => {
              const obj = {}
              obj[option.value] = option.extra_service_fee
              extraServiceFee[i.field_name] = merge(
                extraServiceFee[i.field_name],
                obj
              )
            })
          } else {
            extraServiceFee[i.field_name] = i.extra_service_fee
          }
        })
      })
      return extraServiceFee
    },
    /**
     * @description 计算额外佣金
     * @param {Object} 更新的数据
     */
    calcExtraServiceFee (val) {
      let totalSeviceFee = 0
      this.extra_service_fee_params = Object.assign(
        cloneDeep(this.extra_service_fee_params),
        null,
        val
      )
      map(this.extra_service_fee_params, (value, key) => {
        if (has(this.extraServiceFee, key)) {
          if (this.extraServiceFee[key] instanceof Object) {
            totalSeviceFee += this.extraServiceFee[key][value] - 0
          } else {
            totalSeviceFee += this.extraServiceFee[key] - 0
          }
        }
      })
      this.serviceFee.extra = totalSeviceFee
      this.creatTotalSevice()
    },

    /**
     * @description 计算追加佣金
     */
    calcAddServiceFee (val) {
      this.serviceFee.add = val - 0
      this.creatTotalSevice()
    },
    /**
     * @description 计算主要佣金
     */
    calcMainServiceFee (val) {
      this.pressing.unit_price = val - 0
      // 获取当前价格佣金区间索引
      const taskCateInfo = this.info.task_cate_info
      let serial = sortedIndex(taskCateInfo.item_price_list, val - 0)
      if (serial === taskCateInfo.item_price_list.length) serial = serial - 1
      this.serviceFee.main = taskCateInfo.service_fee_list[serial] - 0
      this.creatTotalSevice()
    },
    /**
     * @description 生成总的服务费 佣金+追加佣金 + 额外服务费
     */
    creatTotalSevice () {
      this.totalServiceFee = (
        this.serviceFee.extra +
        this.serviceFee.add +
        this.serviceFee.main
      ).toFixed(2)
      this.calcTaskPressing({})
    },
    /**
     * @description 计算任务压款  (服务费+商品单价*拍下数量)*任务数量
     */
    calcTaskPressing ({ taskNum = null, quantity = null }) {
      if (taskNum) this.pressing.task_num = taskNum
      if (quantity) this.pressing.quantity = quantity
      this.pressingPrice = (
        (this.totalServiceFee -
          0 +
          this.pressing.unit_price * this.pressing.quantity) *
        this.pressing.task_num
      ).toFixed(2)
    },
    /**
     * @description 请求 - 发布任务
     */
    HandleSubmitTask (params) {
      this.load_submit = true
      HandleSubmitTask(params)
        .then(res => {
          this.$confirm(
            '您的任务已发布成功,是否前往任务管理界面查看详情？',
            '发布成功',
            {
              confirmButtonText: '前往任务列表页面',
              cancelButtonText: '继续发布',
              type: 'warning'
            }
          ).then(() => {
            this.$router.push({ name: 'task-index' })
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_submit = false
        })
    },
    /**
     * @description 请求 - 获取任务信息
     */
    getTaskInfo () {
      this.loadView = true
      GetTaskInfo({ task_cate_id: this.currentCateId, template_id: this.$route.query.tmp })
        .then(res => {
          this.info = res
          this.extraServiceFee = this.creatServiceFee(
            res.task_info.requirement
          )
          if (this.info.account_list.length === 0 && this.task === 1) {
            this.confirmBindsShopkeeper(this.info.task_cate_info.name)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setTimeout(() => {
            this.loadView = false
          }, 300)
        })
    },
    /**
     * @description 请求 - 获取用户信息
     */
    getMemberInfo () {
      GetMemberInfo()
        .then(res => {
          this.userInfo = res.info
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 生成符合规则的图片数据
     */
    creatPicData (val) {
      console.log('pic', val)
      let result = []
      if (val.length > 0) {
        map(val, item => {
          result.push(item.response ? item.response.data.path : item.url)
        })
      }
      return result.join(',')
    }
  }
}
</script>
<style lang="scss">
.issue-tabs {
  .el-tabs--border-card > .el-tabs__content {
    padding: 30px;
  }
  .ul-unstyle {
    margin-bottom: 15px;
    li {
      font-size: 14px;
      display: inline-block;
      margin-right: 20px;
      b {
        font-size: 16px;
        margin: 0 5px;
        color: red;
      }
    }
  }
  .btns {
    .el-button {
      min-width: 160px;
    }
  }
  .info-card {
    // display: none;
     margin-top: 15px;
    &.isFixed {
      position: fixed;
      bottom: 0;
      width: 1160px;
      box-sizing: border-box;
    }
    .el-card__body{
      padding: 20px 30px;
    }
  }
  .issue-anchor{
    height:1px;
  }
}
</style>
