<template>
  <div class="funds-cash-table">
    <el-table :data="list" border style="width: 100%" v-loading="loadView" size="small">
      <el-table-column prop="serial" label="流水号" :align="align" width="100"></el-table-column>
      <el-table-column prop="outlay" label="支出" :align="align" width="70"></el-table-column>
      <el-table-column prop="danwei" label="单位" :align="align" width="80"></el-table-column>
      <el-table-column prop="module" label="模块" :align="align" width="160"> </el-table-column>
      <el-table-column prop="title" label="标题" :align="align" width="200"></el-table-column>
      <el-table-column prop="payTime" label="支付时间" :align="align" ></el-table-column>
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
          serial: 35432,
          outlay: 0,
          danwei: '单位1',
          module: '模块1',
          title: '标题1',
          payTime: '2019-09-09 10:02'
        },
        {
          serial: 35432,
          outlay: 0,
          danwei: '单位1',
          module: '模块1',
          title: '标题1',
          payTime: '2019-09-09 10:02'
        },
        {
          serial: 35432,
          outlay: 0,
          danwei: '单位1',
          module: '模块1',
          title: '标题1',
          payTime: '2019-09-09 10:02'
        },
        {
          serial: 35432,
          outlay: 0,
          danwei: '单位1',
          module: '模块1',
          title: '标题1',
          payTime: '2019-09-09 10:02'
        },
        {
          serial: 35432,
          outlay: 0,
          danwei: '单位1',
          module: '模块1',
          title: '标题1',
          payTime: '2019-09-09 10:02'
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
