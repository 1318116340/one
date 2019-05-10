<template>
  <div class="issue-infomation issue-statistics">
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      label-width="120px"
      size="small"
      v-loading="loadView"
    >
      <el-form-item label="追加佣金(元)">
        <el-input v-model="form.append_service_fee" @input="change"></el-input>
        <span class="tips">追加资金越多，平台将优先派单，更容易被买手申请，效率越高</span>
      </el-form-item>
      <el-form-item label="任务发布时间:" class="date">
        <el-date-picker @change="timePickerChange()" v-model="form.task_set_release_time" type="datetime" placeholder="选择日期时间" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions"></el-date-picker>
        <el-radio-group style="margin-left: 20px" v-model="option_time_select" >
          <el-radio @change="option_time_change(item.id)" :label="item.id" v-for="item in option_time" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="任务发布间隔:">
        <el-input v-model="form.task_release_intervals" clearable></el-input>
        <span class="tips">单位：分钟（间隔多长时间发布一个任务）</span>
      </el-form-item>
      <el-form-item label="是否保存模版:">
        <el-radio-group v-model="form.is_save_template">
          <el-radio :label="item.id" v-for="item in option_template" :key="item.id">{{item.name}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="模板名称:">
        <el-input v-model="form.template_name" clearable></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetTaskCate } from '@/api/pages/task'
import tool from '@/libs/tool'
export default {
  props: {
    // 容器样式
    info: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    loadView: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      append_service_fee: 0,
      form: {
        append_service_fee: 0,
        task_release_intervals: 0,
        is_save_template: 0,
        task_set_release_time: tool.formatDate(
          new Date(),
          'yyyy-MM-dd hh:mm:ss'
        ),
        template_name: ''
      },
      option_template: [{ id: 1, name: '保存' }, { id: 0, name: '不保存' }],
      pickerOptions: {
        shortcuts: [{
          text: '1小时后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 1)
            picker.$emit('pick', date)
          }
        }, {
          text: '2小时后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 2)
            picker.$emit('pick', date)
          }
        }, {
          text: '3小时后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 3)
            picker.$emit('pick', date)
          }
        }, {
          text: '4小时后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 4)
            picker.$emit('pick', date)
          }
        }, {
          text: '5小时后',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 1)
            picker.$emit('pick', date)
          }
        } ]
      },
      option_time_select: 0,
      option_time: [
        {
          id: 1,
          name: '1小时后'
        },
        {
          id: 2,
          name: '2小时后'
        },
        {
          id: 3,
          name: '3小时后'
        },
        {
          id: 4,
          name: '4小时后'
        },
        {
          id: 5,
          name: '5小时后'
        }
      ]
    }
  },
  watch: {
    info: function (val) {
      const info = val.task_info
      if (info && info.requirement) {
        console.log('a', val)
      }
    },
    // 限制要佣金不能小于0
    'form.append_service_fee': {
      deep: true,
      handler: function (newVal, oldVal) {
        const num = newVal.match(/\d+(\.\d{0,4})?/)
          ? newVal.match(/\d+(\.\d{0,4})?/)[0]
          : ''
        this.$nextTick(() => {
          this.$set(this.form, 'append_service_fee', num)
        })
        this.$emit('calcAddServiceFee', num)
      }
    }
  },
  mounted () {
    this.getTaskCate()
  },
  methods: {
    timePickerChange () {
      this.option_time_select = 0
    },
    /*
   * 几小时后时间点击事件
   * */
    option_time_change (val) {
      var myDate = new Date()
      myDate.setHours(myDate.getHours() + val)
      this.form.task_set_release_time = tool.formatDate(
        myDate,
        'yyyy-MM-dd hh:mm:ss'
      )
    },
    /**
     * @description 切换分类
     */
    changeCate (val) {
      this.getTaskInfo(val)
    },
    /**
     * @description 请求 - 获取分类信息
     */
    getTaskCate () {
      this.load_cate = true
      GetTaskCate()
        .then(res => {
          this.options_cate = res
        })
        .finally(() => {
          this.load_cate = false
        })
    }
  }
}
</script>
