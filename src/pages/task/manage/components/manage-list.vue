<template>
  <div class="task-manage-list" v-loading="loadView">
    <div class="empty-data" v-if="list.length === 0">暂无数据</div>
    <el-checkbox-group
      v-model="checkLists"
      @change="changeChecked"
      v-loading="loadView"
      v-else
      class="list"
    >
      <el-card v-for="item in list" :key="item.id">
        <div slot="header" class="clearfix">
          <el-checkbox :label="item.id" >{{item.title}}</el-checkbox>

          <div class="header">
            <span style="margin-right:40px;">
              模版名称：
              <b style="color: #409EFF;font-size: 14px;">{{item.name}}</b>
            </span>
            <img :src="calcCateIconUrl(item.task.task_cate_id)" alt>
            <span>【{{calcCateName(item.task.task_cate_id)}}】</span>
            <span>
              任务编号：
              <b>{{item.task_info_order_id}}</b>
            </span>
            <span>
              发布时间：
              <b>{{tool.formatDate(item.created_at * 1000)}}</b>
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
                <b>{{item.task.shop_name || '-'}}</b>
              </li>
               <li>
                价格：
                <b>{{item.task.order_price}}</b> 元
              </li>
            </ul>
            <ul style="width:200px;" class="desc-ul">

              <li>
                奖励 ：
                <b>{{item.task.service_fee}}</b> 元
              </li>
            </ul>
           <ul class="task-index-list-actions">
            <div>
              <li>
                <el-button
                    type="success"
                    size="mini"
                    @click="confirmActions({id:item.id,cate:0})"
                  >发布任务</el-button>
              </li>
              <li>
                <el-button
                    type="danger"
                    size="mini"
                    @click="confirmActions({id:item.id,cate:1})"
                  >删除模版</el-button>
              </li>
            </div>
          </ul>
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
          <div style="float:right;font-size:14px;">
            备注:
            <el-input v-model="item.remark" size="small"></el-input>
            <el-button
              type="primary"
              size="small"
              @click="saveRemark({id:item.id,remark:item.remark})"
            >保存</el-button>
          </div>
        </div>
      </el-card>
    </el-checkbox-group>
    <div class="pageController">
      <i class="el-icon-refresh" @click="getTaskTemplate(params_refresh)"></i>
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
  </div>
</template>
<script>
import {
  GetTaskTemplate,
  GetTaskCate,
  HandleDelTaskTemplate,
  HandleRemarkTaskTemplate
} from '@/api/pages/task'
import tool from '@/libs/tool'
import { map, cloneDeep } from 'lodash'
import Vue from 'vue'
import pluginExport from '@/plugin/export'
Vue.use(pluginExport)
export default {
  mixins: [tool],
  data () {
    return {
      tool: tool,
      loadView: false,
      checkLists: [],
      list: [],
      ids: [],
      params: { },
      params_refresh: {},
      remark: '',
      pg: {
        pageSize: 20,
        total: 1,
        currentPage: 1,
        sizes: [20, 50, 100]
      },
      optionsCate: []
    }
  },
  computed: {
    listenReqParams () {
      return this.$store.state.taskManage.params
    },
    listenCheckAll () {
      return this.$store.state.taskManage.checkAll
    },
    // 批量操作
    listenHandlebatch () {
      return this.$store.state.taskManage.actions
    }
  },
  watch: {
    // 通过监听search传过来的参数刷新列表
    listenReqParams: function (val) {
      this.params.status = val.status
      this.params_refresh = val
      this.getTaskTemplate(val)
    },
    // 通过全选操作
    listenCheckAll: function (val) {
      this.checkLists = val[0] ? cloneDeep(this.ids) : []
    },
    listenHandlebatch: function (val) {
      // const param = val[0]
      if (this.checkLists.length === 0) {
        this.$message.error(
          '请选勾选要操作的任务，点击左侧全选可勾选当页所有任务'
        )
      } else {
        this.confirmActions({ id: this.checkLists.join(','), cate: 1 })
      }
    }
  },
  mounted () {
    this.getTaskCate()
    this.getTaskTemplate()
  },
  methods: {
    // confirm - 删除模版
    confirmActions ({ id, cate }) {
      if (cate === 0) {
        this.$router.push({ name: 'issue', query: { tmp: id } })
      } else {
        this.$confirm(`确认要删除模版吗？此操作不可撤销`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelTaskTemplate({ id })
        })
      }
    },
    // 删除模版
    handleDelTaskTemplate (params) {
      HandleDelTaskTemplate(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getTaskTemplate(this.params_refresh)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {})
    },
    /**
     * @description 请求 - 获取分类信息
     */
    getTaskCate () {
      GetTaskCate()
        .then(res => {
          this.optionsCate = res
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @description 改变分页数量
     * @param {Number} 新的分页数量
     */
    changePageSize (val) {
      this.pg.pageSize = val
      this.scrollViewToTop()
      this.getTaskTemplate(this.params_refresh)
    },
    /**
     * @description 改变当前页码
     * @param {Number} val 新的页码
     */
    changeCurrentPage (val) {
      this.pg.currentPage = val
      this.scrollViewToTop()
      this.getTaskTemplate(this.params_refresh)
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
        arr.push(item.id)
      })
      this.ids = arr
    },
    /**
     * @description 保存备注
     */
    saveRemark ({ id, remark }) {
      this.handleRemarkTaskTemplate({ id, remark })
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
     * @description 请求 - 获取任务列表
     */
    getTaskTemplate (val = this.params_refresh) {
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
      GetTaskTemplate(params)
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
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.changeTaskLoadStatus(false)
        })
    },
    /**
     * @description 请求 - 添加/更新备注
     */
    handleRemarkTaskTemplate ({ id, remark }) {
      HandleRemarkTaskTemplate({
        id: id,
        remark: remark
      })
        .then(res => {
          this.$message({
            type: 'success',
            message: '备注成功'
          })
          this.getTaskTemplate(this.params_refresh)
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
.task-manage-list {
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
      margin-right: 20px;
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
.task-index-list-actions {
  float: right;
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
