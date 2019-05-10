<template>
  <div class="funds-cash-table self-table">
    <el-table
      :data="list"
      style="width: 100%"
      v-loading="loadView"
      size="small"
    >
      <el-table-column prop="withdraw_no" label="流水号" width="190" :align="align"></el-table-column>
      <el-table-column prop="money" label="充值金额" width="100" :align="align"></el-table-column>
      <el-table-column prop="commission" label="手续费" width="100" :align="align"></el-table-column>
      <el-table-column prop="withdraw_status" label="提现状态" width="120" :align="align">
        <template slot-scope="scope">
          <el-tag :type="calclWithdrawStatus(scope.row.withdraw_status,false)">{{calclWithdrawStatus(scope.row.withdraw_status,true)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="payment_term" label="付款方式" width="130" :align="align">
         <template slot-scope="scope">
           {{scope.row.payment_term || '-'}}
         </template>
      </el-table-column>
      <el-table-column prop="apply_time" label="申请时间" :align="align">
        <template slot-scope="scope">{{tool.formatDate(scope.row.apply_time * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="deal_time" label="受理时间" :align="align">
        <template slot-scope="scope">{{tool.formatDate(scope.row.deal_time * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" :align="align">
        <template slot-scope="scope">
           {{scope.row.remark || '-'}}
         </template>
      </el-table-column>
    </el-table>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getWithdrawLog()"></i>
      <el-pagination
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :current-page="pg.currentPage"
        :page-sizes="pg.sizeArr"
        :page-size="pg.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pg.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { GetWithdrawLog } from '@/api/pages/funds'
import tool from '@/libs/tool'
export default {
  mixins: [tool],
  data () {
    return {
      tool: tool,
      loadView: false,
      list: [],
      align: 'center',
      pg: {
        pageSize: 20,
        total: 1,
        currentPage: 1, // 当前页
        sizeArr: [20, 50, 100] // 可选单页数据数量集合
      },
      params_refresh: {}
    }
  },
  computed: {
    listenReqParams () {
      return this.$store.state.fundsCash.params
    }
  },
  watch: {
    // 通过监听search传过来的参数刷新列表
    listenReqParams: function (val) {
      this.params_refresh = val
      this.getWithdrawLog()
    }
  },
  mounted () {
    this.getWithdrawLog()
  },
  methods: {
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.getRechargeLog()
    },
    /**
     * @description 改变当前页码
     * @param {Number} val 新的页码
     * @param {Object} params 刷新参数
     */
    changeCurrentPage (val, params) {
      const wrapper = document.querySelector('.el-table__body-wrapper')
      const fixedWrapper = document.querySelector(
        '.el-table__fixed-body-wrapper'
      )
      if (wrapper) wrapper.scrollTop = 0
      if (fixedWrapper) fixedWrapper.scrollTop = 0
      this.pg.currentPage = val
      this.getRechargeLog()
    },
    /**
     * @description 计算提现状态
     */
    calclWithdrawStatus (status, type) {
      switch (status) {
        case 1:
          return type ? '等待受理' : 'info'
        case 2:
          return type ? '拒绝申请' : 'warning'
        case 3:
          return type ? '提现失败' : 'danger'
        case 4:
          return type ? '提现成功' : 'success'
        default:
          break
      }
    },
    /**
     * @description 请求 - 获取充值记录
     */
    getWithdrawLog (val = this.params_refresh) {
      if (this.loadView) return
      this.loadView = true
      GetWithdrawLog(Object.assign({
        page: this.pg.currentPage,
        'per-page': this.pg.pageSize
      }, null, val))
        .then(res => {
          this.list = res.list || []
          this.pg.total = res.pages.totalCount - 0 || 0
        })
        .finally(() => {
          this.loadView = false
        })
    }
  }
}
</script>
<style lang="scss">
