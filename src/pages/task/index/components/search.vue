<template>
  <div class="task-index-search self-search">
    <!-- 自定义tab -->
    <div class="task-index-tab" v-loading="loadTab">
      <div class="tab-scroll">
        <div class="tab-nav">
          <div
            class="tab-index"
            v-for="(value,key) in tabs"
            :key="key"
            :class="value.actived === form.status ? 'active' : ''"
            @click="changeTabs(value.actived)"
          >
            <div class="tab-inner">
              <el-badge :value="info[key]" class="item">
                <div>{{value.name}}</div>
              </el-badge>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索条件 -->
    <div>
      <el-select
        v-model="form.task_cate_id"
        placeholder="请选择分类"
        :loading="load_cate"
        size="small"
        style="width:120px"
      >
        <el-option v-for="item in options_cate" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div>
      <el-select v-model="form.search_key" placeholder="请选择条件" size="small" style="width:120px">
        <el-option
          v-for="item in options_condition"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div>
      <el-input
        placeholder="任务编号"
        prefix-icon="el-icon-search"
        v-model="form.order_id"
        size="small"
        style="width:150px"
      ></el-input>
    </div>
    <div>
      <el-input
        placeholder="搜索值"
        prefix-icon="el-icon-search"
        v-model="form.search_value"
        size="small"
        style="width:150px"
      ></el-input>
    </div>
    <div>
      <el-date-picker
        v-model="form.timer"
        style="width:250px;"
        size="small"
        type="daterange"
        align="right"
        unlink-panels
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
    <div>
      <el-button
        v-for="(item,index) in btnOptions"
        :key="index"
        :type="item.type"
        size="small"
        @click="handleAction(item.message)"
      >{{item.message}}</el-button>
    </div>
    <!--批量操作 -->
    <div class="actions" v-if="isHandleBatch" >
      <span>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
      </span>
      <div class="inlineBlock">
        <span v-for="item in activedBtns" :key="item.value">
          <el-button :type="item.type || 'primary'" size="mini" @click="handleBatch(item)">
            {{item.label}}
            <d2-icon name="angle-double-down"></d2-icon>
          </el-button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { GetManageInfo } from '@/api/pages/task'
import { concat, pickBy, indexOf, cloneDeep } from 'lodash'
const formVal = {
  task_cate_id: '',
  search_key: '',
  order_id: '',
  search_value: '',
  timer: '',
  status: 0
}
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
  data () {
    return {
      form: cloneDeep(formVal),
      tabs: {
        wait_apply_num: {
          name: '待申请',
          actived: 0
        },
        applied_num: {
          name: '已申请',
          actived: 1
        },
        order_num: {
          name: '已下单',
          actived: 2
        },
        confirm_received: {
          name: '已确认收货',
          actived: 6
        },
        done_num: {
          name: '任务完成',
          actived: 3
        },
        complaint_num: {
          name: '投诉中',
          actived: -2
        }
      },
      info: {
        applied_num: '0',
        complaint_num: '0',
        confirm_received: '0',
        done_num: '0',
        order_num: '0',
        wait_apply_num: '0'
      },
      list: [],
      loadTab: false,
      isIndeterminate: false,
      checkAll: [],
      loadView: false,
      load_cate: false,
      options_cate: [],
      options_condition: [
        {
          id: null,
          name: '不限条件'
        },
        {
          id: 1,
          name: '掌柜'
        },
        {
          id: 2,
          name: '买号'
        },
        {
          id: 3,
          name: '订单ID'
        },
        {
          id: 4,
          name: '商家QQ'
        },
        {
          id: 5,
          name: '商家QQ'
        }
      ],
      options_actions: [
        // { value: 1, label: '批量导出任务(cvs)' },
        // { value: 2, label: '批量导出任务(xslx)' }
        // { value: 4, label: '保存转出账号' },
        // { value: 5, label: '导出浦发银行转账格式' },
        // { value: 6, label: '导出招商银行转账格式' },
        // { value: 7, label: '批量设置已返款' },
        // { value: 8, label: '筛选未返款任务' },
        // { value: 9, label: '筛选已返款任务' }
      ],
      actions: [
        { value: 1, status: [0], label: '批量增加时间' },
        { value: 2, status: [0], label: '批量追加奖励' },
        { value: 3, status: [0], label: '批量回收任务', type: 'danger' },
        { value: 4, status: [0, 1, 2, 3, 6, -2], label: '批量导出任务(cvs)' },
        { value: 5, status: [0, 1, 2, 3, 6, -2], label: '批量导出任务(xslx)' }
      ],
      btnOptions: [
        {
          type: 'primary',
          message: '搜索'
        },
        {
          type: 'warning',
          message: '重置'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      exportData: {
        columns: [
          {
            label: 'ID',
            prop: 'id'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '创建日期',
            prop: 'creatDate'
          },
          {
            label: '地址',
            prop: 'address'
          },
          {
            label: '邮编',
            prop: 'zip'
          }
        ],
        data: [{ id: '1', name: 'aaa', creatDate: '2019-01-02', address: '浦城县', prop: '353400' }],
        title: '测试保存'
      }
    }
  },
  computed: {
    // 是否显示批量操作
    isHandleBatch () {
      return this.list.length !== 0
    },
    activedBtns () {
      return this.actions.filter(item => {
        return indexOf(item.status, this.form.status) !== -1
      })
    },
    listenCheckParams () {
      return this.$store.state.task.checkParams
    },
    listenLoadingOfList () {
      return this.$store.state.task.loading
    },
    listenStateOfList () {
      return this.$store.state.task.list
    }
  },
  watch: {
    optionsCate: function (val) {
      this.options_cate = concat([{ id: null, name: '不限分类' }], val)
    },
    listenCheckParams: function (val) {
      this.isIndeterminate = val.isIndeterminate
      this.checkAll = val.checkAll
    },
    listenLoadingOfList: function (val, old) {
      this.loadView = val
    },
    listenStateOfList: function (val, old) {
      if (val) this.list = val.list
      if (val && val.count_info) {
        this.info = val.count_info
      }
    }
  },

  mounted () {
    this.getManageInfo()
  },
  methods: {
    /**
     * @description 操作
     */
    handleAction (msg, params = {}) {
      if (msg === '重置') {
        this.form = cloneDeep(formVal)
      }
      params = pickBy(this.form, val => {
        if (typeof val === 'string') {
          return val.trim().length !== 0
        } else {
          return val !== null
        }
      })
      // 处理时间参数
      if (params.timer) {
        params.start_time = params.timer[0]
        params.end_time = params.timer[1]
        delete params.timer
      }
      this.$store.commit('handelTaskState', { params })
    },
    /**
     * @description 切换tabs选项
     */
    changeTabs (index) {
      if (index !== this.form.status && !this.loadView) {
        this.form.status = index
        this.handleAction()
      }
    },
    /**
     * @description 全选
     */
    handleCheckAllChange (val) {
      this.isIndeterminate = false
      this.$store.commit('handelTaskState', { checkAll: [val, new Date().getTime()] })
    },
    /**
     * @description 批量操作
     */
    handleBatch (val) {
      this.$store.commit('handelTaskState', { actions: [val, new Date().getTime()] })
    },
    /**
     * @description 请求 - 获取任务管理信息
     */
    getManageInfo () {
      if (this.loadTab) return
      this.loadTab = true
      GetManageInfo()
        .then(res => {
          this.info = res
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadTab = false
        })
    }
  }
}
</script>
<style lang="scss">
.task-index-search {
  &.self-search {
    padding-top: 0px;
  }
  .actions {
    display: block;
    margin-top: 20px;
    & > .inlineBlock {
      margin-left: 10px;
      & > span {
        margin-right: 10px;
      }
    }
  }
  .el-badge__content.is-fixed {
    top: 15px;
    right: 0px;
  }
  .task-index-tab {
    float: none;
    display: block;
    box-sizing: border-box;
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    border-bottom: 2px solid #e1e4ec;
    background-color: transparent;
    height: 50px;
    .tab-scroll {
      overflow: hidden;
      white-space: nowrap;
    }
    .tab-nav {
      display: inline-block;
      position: relative;
      -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .tab-index {
      display: inline-block;
      position: relative;
      -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      background-color: transparent;
      color: #303133;
      &:before {
        border-radius: 0;
        width: 0;
        border-bottom: 2px solid #409eff;
        left: 50%;
        bottom: 0;
        content: "";
        position: absolute;
        -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      }
      &.active {
        z-index: 1;
        color: #409eff;
        background-color: transparent;
        &:before {
          width: 100%;
          left: 0;
        }
      }
    }
    .tab-inner {
      font-size: 14px;
      min-width: 90px;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 500;
      position: relative;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>
