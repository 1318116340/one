<template>
  <div class="self-search">
    <div>
      <el-select v-model="form.payment_term" placeholder="收款方式" size="small" style="width:150px">
        <el-option
          v-for="item in options_payment"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div>
      <el-date-picker
        v-model="form.timer"
        style="width:280px;"
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
  </div>
</template>
<script>
import { pickBy, cloneDeep } from 'lodash'
const formVal = {
  payment_term: '',
  timer: ''
}
export default {
  data () {
    return {
      form: cloneDeep(formVal),
      options_payment: [
        {
          id: null,
          name: '不限方式'
        },
        {
          id: '中国银行',
          name: '中国银行'
        },
        {
          id: '支付宝',
          name: '支付宝'
        }
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
      }
    }
  },

  methods: {
    /**
     * @description 操作
     * @param {String} msg 操作信息
     */
    handleAction (msg, params = {}) {
      if (msg === '重置') {
        this.form = cloneDeep(formVal)
      } else {
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
      }
      this.$store.commit('handelFundsCashState', { params })
    }
  }
}
</script>
