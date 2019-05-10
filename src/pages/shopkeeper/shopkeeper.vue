<template>
  <div class="shopkeeper-manage self-container">
    <el-card shadow="always">
       <div slot="header" class="clearfix">
       <div class="title">
         <d2-icon name="comment-o" style="margin-right:5px;"></d2-icon>请输入您的店铺的任意一件宝贝，然后点击绑定掌柜。系统可以自动识别淘宝、阿里巴巴、京东掌柜.
       </div>
       <div class="title">
         <d2-icon name="comment-o" style="margin-right:5px;"></d2-icon>拼多多商家可选择以下方式绑定掌柜：
       </div>
       <ul class="subTitle">
        <li>1.商家可以输入pdd|店铺名称 自己进行绑定</li>
        <li>2.商家将账号密码，需要绑定店铺名，发给我们客服 我们后台帮您绑定。</li>
      </ul>
      </div>
      <div class="tab">
        <span
          v-for="item in tabs"
          :key="item.serial"
          :class="item.serial === active ? 'active':''"
          @click="changeTab(item.serial)"
        >{{item.title}}</span>
      </div>
      <div v-if="active === 0">
        <manage-form @changeTab="changeTab"></manage-form>
      </div>
      <div v-else>
        <manage-table></manage-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import manageForm from './components/manage-form.vue'
import manageTable from './components/manage-table.vue'
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '绑定掌柜'
        },
        {
          serial: 1,
          title: '掌柜列表'
        }
      ],
      active: 0
    }
  },
  components: {
    manageForm,
    manageTable
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>

<style lang="scss">
.shopkeeper-manage {
}
</style>
