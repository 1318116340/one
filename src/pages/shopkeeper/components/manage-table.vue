<template>
  <div class="shopkeeper-manage-table self-table">
    <el-table :data="list" size="small" v-loading="loadView">
      <el-table-column prop="cate" label="分类" width="200" :align="align"></el-table-column>
      <el-table-column prop="account" label="账号" :align="align"></el-table-column>
      <el-table-column prop="check_status" label="审核状态" :align="align" width="150px">
        <template slot-scope="scope">
          <el-tag :type="calcCheckStatus(scope.row.check_status)">{{scope.row.check_status}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="启用/禁用" :align="align" width="140px">
        <template slot-scope="scope">
          <div v-if="scope.row.check_status === '审核通过'">
            <el-button
              type="success"
              size="mini"
              v-text="'启用'"
              @click="handleAction('启用',1,scope.row,'success')"
              v-if="scope.row.status === 0"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              v-text="'禁用'"
              @click="handleAction('禁用',0,scope.row,'danger')"
              v-else
            ></el-button>
          </div>
          <div v-else>-</div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="删除" :align="align" width="140px">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            v-text="'删除'"
            @click="handleAction('删除',-1,scope.row,'danger')"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getShoperList()"></i>
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
import { GetShoperList, HandleShoperStatus } from '@/api/pages/shopkeeper'
import tool from '@/libs/tool'
export default {
  data () {
    return {
      loadView: false,
      list: [],
      align: 'center',
      pg: {
        pageSize: 20,
        total: 1, // 数据总量
        currentPage: 1, // 当前页
        sizeArr: [20, 50, 100] // 可选单页数据数量集合
      }
    }
  },
  mounted () {
    this.getShoperList()
  },
  methods: {
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.getShoperList()
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
      this.getShoperList()
    },
    /**
     * @description 计算审核状态
     * @param {String} 审核状态
     */
    calcCheckStatus (status) {
      if (status === '审核中') {
        return ''
      } else if (status === '审核通过') {
        return 'success'
      } else {
        return 'danger'
      }
    },
    /**
     * @description 操作掌柜
     */
    handleAction (tips, type, row, color) {
      this.$confirm(`你将要${tips}掌柜账号: <b>${row.account}</b>，是否继续操作？`, '确认信息', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: `我要${tips}`,
        cancelButtonText: '取消',
        confirmButtonClass: `el-button--${color}`
      })
        .then(() => {
          if (type === -1) {
            this.$message({
              type: 'error',
              message: '掌柜禁止自行删除，如需删除请联系管理员！'
            })
          } else {
            this.handleShoperStatus(tips, type, row)
          }
        })
        .catch(action => {
          console.log('取消')
        })
    },
    /**
     * @description 请求 - 获取掌柜列表
     * @param {Boolean} refresh 强制刷新
     */
    getShoperList (refresh) {
      if (!refresh && this.loadView) return
      this.loadView = true
      GetShoperList({ page: this.pg.currentPage, 'per-page': this.pg.pageSize })
        .then(res => {
          this.list = res.list || []
          this.pg.total = res.pages.totalCount - 0
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadView = false
        })
    },
    /**
     * @description 请求 - 启用/禁用掌柜
     */
    handleShoperStatus (tips, type, row) {
      if (this.loadView) return
      const msg = `掌柜：${row.account}`
      tool.notify({ status: 'loading', action: tips, name: msg, vm: this })
      HandleShoperStatus({ id: row.id, status: type })
        .then(res => {
          tool.notify({ status: 'success', action: tips, name: msg, vm: this })
          this.getShoperList(true)
        })
        .catch(err => {
          tool.notify({ status: 'error', action: tips, name: msg, vm: this })
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
  // padding: 0 20px;
}
</style>
