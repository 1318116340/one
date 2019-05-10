<template>
  <div class="self-search">
    <div>
      <el-select v-model="form.type" placeholder="类型" size="small" style="width:150px">
        <el-option
          v-for="item in options_type"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div>
      <el-select v-model="form.key" placeholder="条件" size="small" style="width:150px">
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
        v-model="form.value"
        placeholder="关键词"
        size="small"
        prefix-icon="el-icon-search"
        @keyup.enter.native="handleSearch()"
      ></el-input>
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
  type: '',
  keykey: '',
  value: ''
}
export default {
  data () {
    return {
      form: cloneDeep(formVal),
      options_type: [
        {
          id: null,
          name: '不限类型'
        },
        {
          id: 1,
          name: '收入'
        },
        {
          id: 2,
          name: '支出'
        }
      ],
      options_condition: [
        {
          id: null,
          name: '不限条件'
        },
        {
          id: 1,
          name: '事由'
        },
        {
          id: 2,
          name: '备注'
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
      ]
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
      }
      this.$store.commit('handelFundsRecordChargeState', { params })
    }
  }
}
</script>
<style lang="scss">
.task-index-search {
}
</style>
