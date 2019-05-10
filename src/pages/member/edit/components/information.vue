<template>
  <div class="member-edit-info form-shadow">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
      label-width="100px"
      :rules="rules"
      size="medium"
      v-loading="loadView"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" clearable :disabled="isDisabled('username')"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="form.realname" clearable :disabled="isDisabled('realname')"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" clearable :disabled="isDisabled('mobile')"></el-input>
      </el-form-item>
      <el-form-item label="QQ号" prop="qq">
        <el-input v-model="form.qq" clearable :disabled="isDisabled('qq')"></el-input>
      </el-form-item>

      <el-form-item label="银行账号" prop="bank_account">
        <el-input v-model="form.bank_account" clearable :disabled="isDisabled('bank_account')"></el-input>
      </el-form-item>
      <el-form-item label="收款银行" prop="bank_account">
        <el-input v-model="form.bank_name" clearable :disabled="isDisabled('bank_name')"></el-input>
      </el-form-item>
      <el-form-item label="支付宝账号" prop="alipay">
        <el-input v-model="form.alipay_account" clearable :disabled="isDisabled('alipay_account')"></el-input>
      </el-form-item>
      <!-- <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio-button :label="'0'">
            <i class="fa fa-male"></i>男
          </el-radio-button>
          <el-radio-button :label="'1'">
            <i class="fa fa-female"></i>女
          </el-radio-button>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="所在地区" prop="alipay">
        <el-cascader
          expand-trigger="hover"
          :options="citys"
          v-model="form.citys"
          :disabled="isDisabled('provinces')"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="开户行" prop="bank" style="width:100%">
        <el-row :gutter="0">
          <el-col :span="11">
            <el-cascader
              expand-trigger="hover"
              :options="citys2"
              v-model="form.open_bank_citys"
              placeholder="请选择开户省 / 市"
              :disabled="isDisabled('open_bank_provinces')"
              @change="handleChange"
            ></el-cascader>
          </el-col>
          <el-col :span="2" style="text-align:center;">-</el-col>
          <el-col :span="11">
            <el-input
              v-model="form.deposit_bank"
              :disabled="isDisabled('deposit_bank')"
              clearable
              placeholder="请输入开户银行"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <div style="margin-top:10px;">
        <el-button
          size="medium"
          type="primary"
          :loading="load_submit"
          @click="handleSubmit"
        >{{submitBtnText}}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { GetMemberInfo, HandleEditMemberInfo } from '@/api/pages/member/index'
import { cloneDeep, map, indexOf } from 'lodash'
import citys from '@/libs/citys'
import citys2 from '@/libs/citys2'
const formVal = {
  username: '',
  realname: '',
  mobile: '',
  qq: '',
  alipay_account: '',
  bank_account: '',
  bank_name: '',
  citys: '',
  open_bank_citys: ''
}
export default {
  mixins: [citys, citys2],
  data () {
    return {
      citys,
      citys2,
      form: cloneDeep(formVal),
      initData: cloneDeep(formVal),
      loadView: false,
      load_submit: false,
      btn_submit: ['保存', '保存中'],
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'change' }
        ]
      },
      load_province: false,
      options_province: [],
      load_city: false,
      options_city: [],
      load_area: false,
      options_area: []
    }
  },
  computed: {
    submitBtnText () {
      return this.btn_submit[this.load_submit ? 1 : 0]
    }
  },
  mounted () {
    this.getMemberInfo()
  },
  methods: {
    /**
     * @description 保存掌柜
     */
    handleSubmit () {
      this.$refs['form'].validate(valid => {
        if (valid) this.handleEditMemberInfo()
      })
    },
    /**
     * @description 生成提交所需参数
     */
    createSubmitParams (result = {}) {
      const formVal = cloneDeep(this.form)
      const keys = [
        'username',
        'alipay_account',
        'mobile',
        'qq',
        'bank_account',
        'bank_name',
        'deposit_bank',
        'gender'
      ]
      map(formVal, (val, key) => {
        if (key === 'citys') {
          result['provinces'] = val[0]
          result['city'] = val[1]
          result['area'] = val[2]
        } else if (key === 'open_bank_citys') {
          result['open_bank_provinces'] = val[0]
          result['open_bank_city'] = val[1]
        } else {
          if (indexOf(keys, key) !== -1) {
            result[key] = val
          }
        }
      })
      return result
    },
    /**
     * @description 是否disbale元素（存在即不可编辑）
     */
    isDisabled (key) {
      let val = this.initData[key]
      return !!val && val !== '0'
    },
    /**
     * @description 请求 - 获取用户信息
     */
    getMemberInfo () {
      this.loadView = true
      GetMemberInfo()
        .then(res => {
          const info = res.info
          info.open_bank_citys = [
            info.open_bank_provinces,
            info.open_bank_city
          ]
          info.citys = [
            res.info.provinces === '0' ? '' : res.info.provinces - 0,
            res.info.city === '0' ? '' : res.info.city - 0,
            res.info.area === '0' ? '' : res.info.area - 0
          ]
          this.form = info
          this.initData = cloneDeep(this.form)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.loadView = false
        })
    },
    /**
     * @description 请求 - 更改个人信息
     */
    handleEditMemberInfo () {
      console.log(this.createSubmitParams())
      const params = this.createSubmitParams()
      HandleEditMemberInfo(params)
        .then(res => {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getMemberInfo()
        })
        .catch(err => {
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
.member-edit-info {
  width: 800px;
  .el-radio-group {
    width: 100%;
    .el-radio-button {
      width: 50%;
      .el-radio-button__inner {
        width: 100%;
        .fa {
          margin-right: 10px;
        }
      }
    }
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    display: block;
    width: 50%;
    margin: 0 auto;
  }
  .el-form-item {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    padding: 0 10px;
  }
  .el-cascader {
    width: 100%;
  }
  .el-col-11 {
    width: 340px;
  }
  .el-col-2 {
    width: 20px;
  }
}
</style>
