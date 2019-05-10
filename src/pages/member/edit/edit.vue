<template>
  <div class="member-edit self-container">
    <el-card shadow="always">
      <div class="tab">
        <span
          v-for="item in tabs"
          :key="item.serial"
          :class="item.serial === active ? 'active':''"
          @click="changeTab(item.serial)"
        >{{item.title}}</span>
      </div>
      <div v-if="active === 0">
        <information></information>
      </div>
      <div v-else>
        <password></password>
      </div>
    </el-card>
  </div>
</template>
<script>
const information = () => import('./components/information.vue')
const password = () => import('./components/password.vue')
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '个人资料'
        },
        {
          serial: 1,
          title: '密码管理'
        }
      ],
      active: 0
    }
  },
  components: {
    information,
    password
  },
  mounted () {
    if (this.$route.query.sign === 'pwd') {
      this.active = 1
    }
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>
