<template>
  <div class="issue-infomation">
    <el-form
      ref="form"
      :model="form"
      label-position="right"
      label-width="120px"
      size="small"
      v-loading="loadView"
    >
      <el-form-item label="所属分类:">
        <el-select v-model="form.task_cate_id" placeholder="请选择" @change="changeTaskCate">
          <el-option
            v-for="(value,key) in info.task_cate_list"
            :key="key"
            :label="value"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="掌柜:">
        <el-select v-model="form.shop_id" placeholder="请选择">
          <el-option
            v-for="(value,key) in info.account_list"
            :key="key"
            :label="value"
            :value="key"
          ></el-option>
        </el-select>
        <div>
          <span class="tips" style="display:inline-block;">* 就是您想提升信誉的掌柜，申请任务的朋友用来确认您的身份。</span>
          <el-button
            type="text"
            size="medium"
            @click="$router.push({ name: 'shopkeeper' })"
          >【{{info.account_list && info.account_list.length === 0 ?'添加掌柜':'管理掌柜'}}】</el-button>
        </div>
      </el-form-item>
      <el-form-item label="宝贝分类:">
        <el-select v-model="form.item_cate" placeholder="请选择">
          <el-option
            v-for="(value,key) in info.item_cate_list"
            :key="key"
            :label="value"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品链接地址:">
        <el-input v-model="form.item_url" type="textarea" :rows="2"></el-input>
        <span class="tips">* 填写您要对方购买的商品地址，尽量使用不同商品来发布试用</span>
      </el-form-item>
      <el-form-item label="商品主图:">
                  <!-- :action="`http://pig.api.la55l.cn/api/hirer/file/images?access-token=${util.cookies.get('token')}`" -->
        <el-upload
          :action="`http://pig.api.la55l.cn/api/hirer/file/images?access-token=${util.cookies.get('token')}`"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :limit="3"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
        <span class="tips">* 方便买手查找，图片格式为JPG、JPEG、PNG其中一种，500KB以下，最多上传三张主图。</span>
      </el-form-item>
      <el-form-item label="商品价格:">
        <el-input v-model="form.unit_price" clearable></el-input>
      </el-form-item>
      <el-form-item label="拍下数量:">
        <el-input v-model="form.quantity" clearable></el-input>
      </el-form-item>
      <el-form-item label="最终拍下:">
        <el-input v-model="endPrice">
          <template slot="append">元</template>
        </el-input>
        <span class="tips">* 此价格为您发布的宝贝改价后包括邮费的总价，买手购买商品时支付给您的价钱总和，远程付款填写0</span>
      </el-form-item>
      <el-form-item label="关键搜索词:" class="keywords">
        <div v-for="(item,index) in form.multi_search_words" :key="index" style="margin-bottom:10px;">
          <el-tag
            style="font-weight:500;"
            closable
            type="success"
            @close="handleClose(item)"
          >搜索词：{{item.search_keyword}}&nbsp;&nbsp;|&nbsp;&nbsp;任务数量：{{item.task_num}}</el-tag>
        </div>
        <el-popover placement="right" width="350" trigger="click" v-model="visible">
          <el-form ref="searchwordsForm" :model="searchwordsForm" label-width="100px" :rules="rules" size="small">
            <el-form-item label="搜索关键词" prop="search_keyword">
              <el-input v-model="searchwordsForm.search_keyword"></el-input>
            </el-form-item>
            <!-- <el-form-item label="搜索提示" prop="search_tips">
              <el-input v-model="searchwordsForm.search_tips"></el-input>
            </el-form-item> -->
            <el-form-item label="任务数量" prop="task_num">
              <el-input v-model="searchwordsForm.task_num"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmitKeywords">立即创建</el-button>
            </el-form-item>
          </el-form>
          <el-button slot="reference" type="primary" style="display:block;" @click="addSearchWords">添加搜索词</el-button>
        </el-popover>
      </el-form-item>
      <!-- <el-form-item label="任务数量:" :inline="true">
        <el-input v-model="form.task_num" clearable></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="商品搜索提示:" :inline="true" v-if="form.task_cate_id === '2'">
        <el-input v-model="form.search_tips" clearable></el-input>
      </el-form-item> -->
      <el-form-item label="商品规格:">
        <el-input v-model="form.item_spec" clearable></el-input>
        <span class="tips">* 要提升销量的宝贝的规格、分类</span>
      </el-form-item>
      <div v-if="info.task_info && info.task_info.requirement">
        <el-form-item
          :label="item.title"
          v-for="(item,index) in info.task_info.requirement['1']"
          :key="index"
        >
          <el-radio-group v-model="form.requirement[item.field_name]">
            <el-radio
              :label="radio.value"
              v-for="radio in item.option"
              :key="radio.value"
            >{{radio.value_name}}</el-radio>
          </el-radio-group>
          <span
            class="add-fee"
            v-if="calcSingleAppendFee({ options:item.option, val: form.requirement[item.field_name]}) !== 0"
          >
            【追加佣金:
            <b>{{calcSingleAppendFee( { options:item.option, val: form.requirement[item.field_name]})}}</b>元】
          </span>
          <span class="tips" v-if="item.tips">{{`* ${item.tips}`}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import { GetTaskCate } from '@/api/pages/task'
import { map, cloneDeep, indexOf } from 'lodash'
import util from '@/libs/util'
const searchwordsFormVal = {
  search_keyword: '',
  // search_tips: '',
  task_num: ''
}
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
  mixins: [util],
  data () {
    return {
      util: util,
      show: true,
      form: {
        task_cate_id: '',
        shop_id: '',
        item_cate: '',
        item_url: '',
        item_pic: [],
        unit_price: '',
        search_keyword: '',
        multi_search_words: [],
        item_spec: '',
        task_num: 1,
        quantity: 1,
        requirement: {},
        search_tips: ''
      },
      endPrice: '',
      load_cate: false,
      options_cate: [],
      dialogImageUrl: '',
      dialogVisible: false,
      extra_service_fee: {},
      fileList: [],
      keyword: '',
      searchwordsForm: cloneDeep(searchwordsFormVal),
      visible: false,
      rules: {
        search_keyword: [
          { required: true, message: '请输入搜索关键词', trigger: 'blur' }
        ],
        // search_tips: [
        //   { required: true, message: '请输入搜索提示', trigger: 'blur' }
        // ],
        task_num: [
          { required: true, message: '请输入任务数量', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    info: function (val) {
      const info = val.task_info
      if (info && info.requirement) {
        console.log('a', val)
        this.form = Object.assign(
          { task_cate_id: this.form.task_cate_id },
          null,
          {
            shop_id: info.shop_id !== 0 ? String(info.shop_id) : '',
            item_cate: info.item_cate !== 0 ? String(info.item_cate) : '',
            item_url: info.item_url || '',
            item_pic: [],
            unit_price: info.unit_price !== '0.00' ? info.unit_price : '',
            search_keyword: info.unit_price || '',
            multi_search_words: this.$route.query.tmp ? info.multi_search_words : [],
            item_spec: info.item_spec || '',
            task_num: info.task_num || 1,
            quantity: info.quantity || 1,
            requirement: {},
            search_tips: ''
          }
        )
        this.fileList = []
        if (info.item_pic.length > 0) {
          const pics = info.item_pic.split(',')
          let imgs = ''
          map(pics, (item, index) => {
            this.fileList.push({ url: item })
            imgs += `/images${item.split('/images')[1]}`
            if (index !== pics.length - 1) {
              imgs += ','
            }
          })
          this.form.item_pic = imgs
        }
        const requirement = val.task_info.requirement['1']
        map(requirement, item => {
          this.$set(
            this.form.requirement,
            item.field_name,
            item.form_type !== '2' ? item.default : ''
          )
        })
      }
    },
    'form.requirement': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.$emit('calcExtraServiceFee', newVal)
        this.$store.commit('handelIssueState', {
          enterType: [newVal, new Date().getTime()]
        })
      }
    },
    // 单价变化
    'form.unit_price': {
      deep: true,
      handler: function (newVal, oldVal) {
        const num = newVal.match(/\d+(\.\d{0,4})?/)
          ? newVal.match(/\d+(\.\d{0,4})?/)[0]
          : ''
        this.$nextTick(() => {
          this.$set(this.form, 'unit_price', num)
        })
        this.$emit('calcMainServiceFee', num)
        this.calcEndPrice()
      }
    },
    // 拍下数量变化
    'form.quantity': {
      deep: true,
      handler: function (newVal, oldVal) {
        // 任务数量要为大于0的正整数
        const regex = /^[1-9]\d*$/
        if (!regex.test(newVal) && newVal !== '') {
          this.$nextTick(() => {
            this.$set(this.form, 'quantity', 1)
          })
        } else {
          this.calcEndPrice()
          this.$emit('calcTaskPressing', { taskNum: newVal })
        }
      }
    },
    // 任务数量变化
    'form.task_num': {
      deep: true,
      handler: function (newVal, oldVal) {
        // 任务数量要为大于0的正整数
        const regex = /^[1-9]\d*$/
        if (!regex.test(newVal) && newVal !== '') {
          this.$nextTick(() => {
            this.$set(this.form, 'task_num', 1)
          })
        } else {
          this.$emit('calcTaskPressing', { taskNum: newVal })
        }
      }
    }
  },
  created () {
    this.form.task_cate_id = this.$route.query.cateId || '1'
  },
  mounted () {
    this.getTaskCate()
  },
  methods: {
    handleSubmitKeywords () {
      this.$refs['searchwordsForm'].validate(valid => {
        if (valid) {
          this.form.multi_search_words.push(cloneDeep(this.searchwordsForm))
          this.visible = false
          this.calcLastTasks()
        }
      })
    },
    handleClose (item) {
      this.form.multi_search_words.splice(this.form.multi_search_words.indexOf(item), 1)
    },
    // 计算总任务数量
    calcLastTasks (taskNums = 0) {
      map(this.form.multi_search_words, (item) => {
        taskNums += item.task_num - 0
      })
      this.form.task_num = taskNums
    },
    addSearchWords () {
      this.searchwordsForm = cloneDeep(searchwordsFormVal)
    },
    handleRemove (file, fileList) {
      this.form.item_pic = this.creatPicData(fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload (file) {
      const isLegalType =
        indexOf(['image/jpg', 'image/png', 'image/jpeg'], file.type) !== -1
      const isLegalSIze = file.size / 1024 < 500

      if (!isLegalType) {
        this.$message.error('上传图片只能是 JPG、JPEG、PNG 格式!')
      }
      if (!isLegalSIze) {
        this.$message.error('上传图片大小不能超过 500KB!')
      }
      if (isLegalType && isLegalSIze) {
        this.uploadTips('图片开始上传')
      }
      return isLegalType && isLegalSIze
    },
    handleSuccess (response, file, fileList) {
      if (response.code === 200) {
        this.fileList = fileList
        this.form.item_pic = this.creatPicData(fileList)
        this.uploadTips('图片上传成功')
      } else {
        this.uploadTips('图片上传失败', true)
        this.fileList = cloneDeep(this.fileList)
      }
    },
    /**
     * @description 生成符合规则的图片数据
     */
    creatPicData (val) {
      let result = []
      if (val.length > 0) {
        map(val, item => {
          result.push(item.response ? item.response.data.path : `/images${item.url.split('/images')[1]}`)
        })
      }
      return result.join(',')
    },
    uploadTips (message, error) {
      this.$notify({
        title: message,
        type: error ? 'error' : 'success',
        duration: 2000
      })
    },
    /**
     * @description 计算单项追加佣金
     */
    calcSingleAppendFee ({ options, val }, i = 0) {
      for (let length = options.length; i < length; i++) {
        if (options[i].value === val) {
          return options[i].extra_service_fee - 0
        }
      }
      return 0
    },
    /**
     * @description 计算最终价格
     */
    calcEndPrice () {
      const price = this.form.unit_price - 0
      this.endPrice = price > 0 ? price * this.form.quantity : 0
    },
    /**
     * @description 切换分类
     */
    changeTaskCate (val) {
      this.$emit('switchCate', val)
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
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.load_cate = false
        })
    }
  }
}
</script>
<style lang="scss">
.issue-infomation {
  .el-input,
  .el-textarea {
    width: 250px;
  }
  .el-form-item__label {
    padding-right: 30px;
  }
  .tips {
    display: block;
    color: orangered;
    font-size: 12px;
  }
  .add-fee {
    line-height: 32px;
    vertical-align: middle;
    margin-left: 30px;
    font-size: 14px;
    color: #ff8888;
    b {
      margin: 0 5px;
      font-size: 16px;
    }
  }
  .keywords {
    .el-button {
      vertical-align: top;
      // border-top-left-radius: 0;
      // border-bottom-left-radius: 0;
    }
  }
}
</style>
