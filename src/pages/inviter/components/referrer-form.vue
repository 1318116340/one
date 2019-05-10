<template>
  <div class="inviter-ref-form form-shadow">
    <el-form ref="form" :model="form" label-position="right" label-width="100px" size="small">
      <el-form-item label="推广资格:">
        <div>已开通推广功能</div>
      </el-form-item>
      <el-form-item label="引导至:">
        <el-radio-group v-model="radio">
          <el-radio :label="0">网站首页</el-radio>
          <el-radio :label="1">会员注册</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推广网址:">
        <el-input v-model="form.link" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="推广资格:">
        <el-button type="text">点击查看>>></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        link: 'http://www.du17w.cn/member/invite.php?user=cs123&goto=register'
      },
      radio: 0
    }
  }
}
</script>
<style lang="scss">
.inviter-ref-form {
  width: 400px;
  margin: 40px auto;
  .el-form-item__label {
    padding-right: 30px;
  }
}
</style>
