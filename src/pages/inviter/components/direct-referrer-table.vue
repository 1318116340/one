<template>
  <div class="funds-cash-table">
    <el-table :data="list" border style="width: 100%" v-loading="loadView">
      <el-table-column prop="group" label="会员组" :align="align"></el-table-column>
      <el-table-column prop="username" label="用户名" :align="align"></el-table-column>
      <el-table-column prop="payStatus" label="是否缴费" :align="align"></el-table-column>
      <el-table-column prop="sex" label="性别" :align="align"></el-table-column>
      <el-table-column prop="registerTime" label="注册时间" :align="align"></el-table-column>
      <el-table-column prop="loginNum" label="登陆次数" :align="align"></el-table-column>
      <el-table-column prop="overNum" label="完成任务数" :align="align"></el-table-column>
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
export default {
  data () {
    return {
      loadView: false,
      list: [
        {
          group: '商家会员',
          username: '很菜的机器人',
          payStatus: '否',
          sex: '男',
          registerTime: '2019-02-22 10:00',
          loginNum: 20,
          overNum: 8
        },
        {
          group: '普通任务会员',
          username: '会哭的小孩',
          payStatus: '否',
          sex: '男',
          registerTime: '2019-02-22 10:00',
          loginNum: 22,
          overNum: 16
        },
        {
          group: '商家会员',
          username: '很菜的机器人',
          payStatus: '否',
          sex: '男',
          registerTime: '2019-02-22 10:00',
          loginNum: 20,
          overNum: 8
        },
        {
          group: '普通任务会员',
          username: '会哭的小孩',
          payStatus: '否',
          sex: '男',
          registerTime: '2019-02-22 10:00',
          loginNum: 22,
          overNum: 16
        }
      ],
      align: 'center',
      pg: {
        pageSize: 20,
        total: 1,
        currentPage: 1, // 当前页
        sizeArr: [20, 50, 100] // 可选单页数据数量集合
      }
    }
  },
  methods: {
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
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
    }
  }
}
</script>
