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
      <div v-if="info.task_info && info.task_info.requirement">
        <el-form-item
          :label="item.title"
          v-for="(item,index) in info.task_info.requirement['2']"
          :key="index"
        >
          <div class="inlineBlock" v-if="item.field_name === 'images_of_evaluate'">
            <el-upload
              :action="`http://pig.api.la55l.cn/api/hirer/file/images?access-token=${util.cookies.get('token')}`"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              :before-upload="beforeUpload"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </div>
          <div class="inlineBlock" v-else>
            <div v-if="item.form_type === '2'">
              <el-input v-model="form.requirement[item.field_name]" type="textarea" :rows="2"></el-input>
              <span class="add-fee" v-if="item.extra_service_fee - 0 !== 0">
                【追加佣金:
                <b>{{item.extra_service_fee}}</b>元】
              </span>
            </div>
            <div v-else>
              <el-radio-group v-model="form.requirement[item.field_name]" :disabled="item.disabled">
                <el-radio
                  :label="radio.value"
                  v-for="radio in item.option"
                  :key="radio.value"
                >{{radio.value_name}}</el-radio>
              </el-radio-group>
              <span class="add-fee" v-if="calcSingleAppendFee({ options:item.option, val: form.requirement[item.field_name]}) !== 0">
                【追加佣金:
                <b>{{calcSingleAppendFee( { options:item.option, val: form.requirement[item.field_name]})}}</b>元】
              </span>
            </div>
          </div>

          <span class="tips" v-if="item.tips">{{`* ${item.tips}`}}</span>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { map, indexOf } from 'lodash'
import util from '@/libs/util'

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
      form: {
        requirement: {
          images_of_evaluate: []
        }
      },
      dialogImageUrl: '',
      dialogVisible: false,
      compare_shops: '',
      fileList: []
    }
  },
  computed: {
    listenReqParams () {
      return this.$store.state.issue.enterType
    }
  },
  watch: {
    info: function (val) {
      if (val.task_info && val.task_info.requirement) {
        const requirement = val.task_info.requirement['2']
        map(requirement, item => {
          if (item.field_name === 'compare_shops') {
            this.compare_shops = item
          }
          if (item.field_name === 'images_of_evaluate') {
            this.fileList = []
            if (item.default.length > 0) {
              const pics = item.default.split(',')
              let imgs = ''
              map(pics, (item, index) => {
                this.fileList.push({ url: item })
                imgs += `/images${item.split('/images')[1]}`
                if (index !== pics.length - 1) {
                  imgs += ','
                }
              })
              this.$set(
                this.form.requirement,
                item.field_name,
                imgs
              )
            } else {
              this.$set(
                this.form.requirement,
                item.field_name,
                ''
              )
            }
          } else {
            this.$set(
              this.form.requirement,
              item.field_name,
              // item.form_type !== '2' ? item.default : ''
              item.default
            )
          }
        })
        console.log(';;;;', this.form)
      }
    },
    'form.requirement': {
      deep: true,
      handler: function (newVal, oldVal) {
        this.$emit('calcExtraServiceFee', newVal)
      }
    },
    listenReqParams: function (val) {
      const bool = val[0].go_into_ways === '2'
      this.$set(this.compare_shops, 'disabled', bool)
      this.$set(
        this.form.requirement,
        this.compare_shops.field_name,
        bool ? '0' : this.compare_shops.default
      )
    }
  },
  methods: {
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
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.form.requirement.images_of_evaluate = fileList
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeUpload (file) {
      const isLegalType = indexOf(['image/jpg', 'image/png', 'image/jpeg'], file.type) !== -1
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
        this.form.requirement.images_of_evaluate = this.creatPicData(fileList)
      }
      this.uploadTips('图片上传成功')
    },
    uploadTips (message, error) {
      this.$notify({
        title: message,
        type: error ? 'error' : 'success',
        duration: 2000
      })
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
    }
  }
}
</script>
