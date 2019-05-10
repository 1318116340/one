<template>
  <div class="shopkeeper-manage-table self-table">
    <el-table
      :data="list"
      style="width: 100%"
      v-loading="loadView"
      size="small"
    >
      <el-table-column type="index" label="序号" :align="align" width="60"></el-table-column>
      <el-table-column prop="money" label="充值金额" width="100" :align="align"></el-table-column>
      <el-table-column prop="fee" label="手续费" width="100" :align="align"></el-table-column>
      <el-table-column prop="real_money" label="实收金额" width="100" :align="align"></el-table-column>
      <el-table-column prop="pay_platform" label="支付平台" width="120" :align="align">
        <template slot-scope="scope">{{ calclPayPlatform(scope.row.pay_platform)}}</template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="120" :align="align">
        <template slot-scope="scope">
          <el-tag
            :type="calclPayStatus(scope.row.status,false)"
          >{{calclPayStatus(scope.row.status,true)}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="created_at" label="下单时间" :align="align">
        <template slot-scope="scope">{{tool.formatDate(scope.row.created_at * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="updated_at" label="支付时间" :align="align">
        <template slot-scope="scope">{{tool.formatDate(scope.row.pay_time * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" :align="align"></el-table-column>
    </el-table>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getRechargeLog()"></i>
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
import { GetRechargeLog } from '@/api/pages/funds'
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
      }
    }
  },
  mounted () {
    this.getRechargeLog()
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
     * @description 计算平台地址
     */
    calclPayPlatform (type) {
      const arr = ['银行转账']
      return arr[type - 1]
    },
    /**
     * @description 计算支付状态
     */
    calclPayStatus (status, type) {
      switch (status) {
        case 0:
          return type ? '未处理' : 'info'
        case 1:
          return type ? '支付成功' : 'success'
        case 2:
          return type ? '支付失败' : 'danger'
        case 3:
          return type ? '作废' : 'warning'
        default:
          break
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (
          (index === 1 || index === 2 || index === 3) &&
          !values.every(value => isNaN(value))
        ) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] = sums[index].toFixed(2)
        } else {
          sums[index] = '-'
        }
      })

      return sums
    },
    /**
     * @description 请求 - 获取充值记录
     */
    getRechargeLog () {
      if (this.loadView) return
      this.loadView = true
      GetRechargeLog({
        page: this.pg.currentPage,
        'per-page': this.pg.pageSize
      })
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
.shopkeeper-manage-table {
  margin: 30px auto 0;
}
</style>
