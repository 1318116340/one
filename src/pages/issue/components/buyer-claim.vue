<template>
  <div class="issue-infomation buyer-claim">
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      label-width="130px"
      size="small"
      v-loading="loadView"
    >
      <div v-if="info.task_info && info.task_info.requirement">
        <el-form-item
          :label="item.title"
          v-for="(item,index) in info.task_info.requirement['3']"
          :key="index"
        >
          <div v-if="item.field_name === 'ban_area'" class="area">
            <el-row
              :gutter="20"
              style="margin:0 0 10px;width:410px;"
              v-for="(item,index) in form.requirement['ban_area']"
              :key="index"
            >
              <el-col :span="15">
                <el-cascader
                  :options="citys2"
                  filterable
                  change-on-select
                  :clearable="true"
                  v-model="item.open_bank_citys"
                  placeholder="请选择禁用省 / 市"
                ></el-cascader>
              </el-col>
              <el-col :span="9">
                <el-button
                  type="danger"
                  size="small"
                  @click="handleDelArea(index)"
                  v-if="index !==0"
                >删除</el-button>
                <el-button
                  type="success"
                  size="small"
                  @click="handleAddArea()"
                  v-if="index === form.requirement['ban_area'].length - 1 && index < 4"
                >增加</el-button>
              </el-col>
            </el-row>
          </div>
          <div v-else style="display:inline-block;">
            <el-input
              v-model="form.requirement[item.field_name]"
              type="textarea"
              :rows="2"
              v-if="item.form_type === '2'"
            ></el-input>
            <el-radio-group v-model="form.requirement[item.field_name]" v-else>
              <el-radio
                :label="radio.value"
                v-for="radio in item.option"
                :key="radio.value"
              >{{radio.value_name}}</el-radio>
            </el-radio-group>
          </div>
          <span class="tips" v-if="item.tips">{{`* ${item.tips}`}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { map, remove, cloneDeep } from 'lodash'
import citys2 from '@/libs/citys2'

export default {
  props: {
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
  mixins: [citys2],
  data () {
    return {
      form: {
        requirement: {
          ban_area: [
            {
              open_bank_citys: ['', '']
            }
          ]
        }
      },
      citys2: citys2
    }
  },

  watch: {
    info: function (val) {
      if (val.task_info && val.task_info.requirement) {
        const requirement = val.task_info.requirement['3']
        map(requirement, item => {
          if (item.field_name !== 'ban_area') {
            this.$set(this.form.requirement, item.field_name, item.default)
          } else {
            let info = item.default
            if (info !== '') {
              info = JSON.parse(info)
              let arr = []
              map(info, i => {
                let obj = {}
                obj['open_bank_citys'] = [i.provinces, i.city]
                arr.push(obj)
              })
              this.$set(this.form.requirement, item.field_name, arr)
            }
          }
        })
      }
    },
    'form.requirement': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.$emit('calcExtraServiceFee', newVal)
      }
    }
  },
  methods: {
    /**
     * @description 删除填写的地区
     */
    handleDelArea (val) {
      const area = cloneDeep(this.form.requirement['ban_area'])
      remove(area, (n, i) => {
        return val === i
      })
      this.$set(this.form.requirement, 'ban_area', area)
    },
    /**
     * @description 填写禁用地区
     */
    handleAddArea () {
      const area = cloneDeep(this.form.requirement['ban_area'])
      area.push({
        open_bank_citys: ['', '']
      })
      this.$set(this.form.requirement, 'ban_area', area)
    }
  }
}
</script>
<style lang="scss">
.buyer-claim {
  .area {
    .el-select {
      width: 100%;
      .el-input {
        width: 100%;
      }
    }
    .el-button {
      vertical-align: top;
    }
  }
  .el-cascader {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }
}
</style>
