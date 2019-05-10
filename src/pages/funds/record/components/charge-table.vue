<template>
  <div class="funds-cash-table self-table">
    <el-table :data="list" v-loading="loadView" size="small">
      <el-table-column type="index" label="序号" :align="align" width="80"></el-table-column>
      <el-table-column prop="cash" label="收入" :align="align" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.type === 1 ? scope.row.cash : '-'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="outlay" label="支出" :align="align" width="110">
        <template slot-scope="scope">
          <div>{{scope.row.type === 2 ? scope.row.cash : '-'}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="balance" label="支付平台" :align="align" width="130">
         <template slot-scope="scope">{{ calclPayPlatform(scope.row.pay_platform)}}</template>
      </el-table-column>
      <el-table-column prop="creatTime" label="创建时间" :align="align" width="170">
         <template slot-scope="scope">{{tool.formatDate(scope.row.created_at * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="cause" label="事由" :align="align" width="150"></el-table-column>
      <el-table-column prop="remark" label="备注" :align="align"></el-table-column>
    </el-table>
    <div class="pageController">
      <i class="el-icon-refresh"></i>
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
import { GetMoneyLog } from '@/api/pages/funds'
import tool from '@/libs/tool'
export default {
  mixins: [tool],
  data () {
    return {
      tool: tool,
      loadView: false,
      list: [],
      align: 'center',
      params_refresh: {},
      pg: {
        pageSize: 20,
        total: 1,
        currentPage: 1, // 当前页
        sizeArr: [20, 50, 100] // 可选单页数据数量集合
      }
    }
  },
  computed: {
    listenReqParams () {
      return this.$store.state.fundsRecordCharge.params
    }
  },
  watch: {
    // 通过监听search传过来的参数刷新列表
    listenReqParams: function (val) {
      this.params_refresh = val
      this.getMoneyLog(val)
    }
  },
  mounted () {
    this.getMoneyLog()
  },
  methods: {
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.getMoneyLog()
    },
    /**
     * @description 改变当前页码
     * @param {Number} val 新的页码
     */
    changeCurrentPage (val) {
      const wrapper = document.querySelector('.el-table__body-wrapper')
      const fixedWrapper = document.querySelector(
        '.el-table__fixed-body-wrapper'
      )
      if (wrapper) wrapper.scrollTop = 0
      if (fixedWrapper) fixedWrapper.scrollTop = 0
      this.pg.currentPage = val
      this.getMoneyLog()
    },
    /**
     * @description 计算平台地址
     */
    calclPayPlatform (type) {
      switch (type) {
        case 1:
          return '银行转账'

        default:
          return '未知方式'
      }
    },
    /**
     * @description 请求 - 获取充值记录
     */
    getMoneyLog (val) {
      if (this.loadView) return
      this.loadView = true
      GetMoneyLog(Object.assign({
        page: this.pg.currentPage,
        'per-page': this.pg.pageSize
      }, null, val))
        .then(res => {
          this.list = res.list || []
          this.pg.total = res.pages.totalCount - 0 || 0
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadView = false
        })
    }
  }
}
</script>
<style lang="scss">
.funds-cash-table{
  .el-table .cell{
    line-height: 32px;
  }
}
</style>
