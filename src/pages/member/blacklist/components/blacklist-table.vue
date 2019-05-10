<template>
  <div class="shopkeeper-manage-table self-table">
    <el-table :data="list" v-loading="loadView" size="small">
      <el-table-column prop="mobile" label="手机号" width="200" :align="align"></el-table-column>
      <el-table-column prop="created_at" label="拉黑时间" width="180" :align="align">
        <template slot-scope="scope">{{tool.formatDate(scope.row.created_at * 1000)}}</template>
      </el-table-column>
      <el-table-column prop="refuse_reason" label="拉黑原因" :align="align"></el-table-column>
      <el-table-column prop="status" label="操作" :align="align" width="200px">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-text="'修改原因'" @click="handleUpdate({id:scope.row.id,reason:scope.row.refuse_reason})"></el-button>
          <el-button type="danger" size="small" v-text="'删除'" @click="handelDelete({id:scope.row.id})"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getAccountList()"></i>
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
import { GetBlacklist, UpdateBlacklist, DelBlacklist } from '@/api/pages/member/blacklist'
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
        currentPage: 1,
        sizeArr: [20, 50, 100]
      }
    }
  },
  mounted () {
    this.getBlacklist()
  },
  methods: {
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.getBlacklist()
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
      this.getBlacklist()
    },
    /**
     * @description 更新拉黑原因
     */
    handleUpdate ({ id, reason }) {
      this.$prompt('请输入拉黑原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: reason
      }).then(({ value }) => {
        this.updateBlacklist({ id, reason: value })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    /**
     * 删除黑名单用户
     */
    handelDelete ({ id }) {
      this.$confirm('删除操作将不可撤销, 是否继续?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delBlacklist({ id })
      })
    },
    /**
     * @description 请求 - 获取黑名单列表
     */
    getBlacklist (refresh) {
      if (!refresh && this.loadView) return
      this.loadView = true
      GetBlacklist({ page: this.pg.currentPage, 'per-page': this.pg.pageSize })
        .then(res => {
          this.list = res || []
          // this.pg.total = res.pages.pageCount
        })
        .finally(() => {
          this.loadView = false
        })
    },
    /**
     * @description 请求 - 更新拉入黑名单的原因
     */
    updateBlacklist ({ id, reason }, tips = '更新拉黑原因') {
      if (this.loadView) return
      tool.notify({ status: 'loading', action: tips, vm: this })
      UpdateBlacklist({ id }, { refuse_reason: reason })
        .then(res => {
          tool.notify({ status: 'success', action: tips, vm: this })
          this.getBlacklist(true)
        })
        .catch(err => {
          console.log(err)
          tool.notify({ status: 'error', action: tips, vm: this })
        })
    },
    /**
     * @description 请求 - 删除黑名单
     */
    delBlacklist ({ id }, tips = '删除黑名单用户') {
      if (this.loadView) return
      tool.notify({ status: 'loading', action: tips, vm: this })
      DelBlacklist({ id })
        .then(res => {
          tool.notify({ status: 'success', action: tips, vm: this })
          this.getBlacklist(true)
        })
        .catch(err => {
          console.log(err)
          tool.notify({ status: 'error', action: tips, vm: this })
        })
    }
  }
}
</script>
<style lang="scss">
.shopkeeper-manage-table {
  margin: 30px auto 0;
  padding: 0 20px;
}
</style>
