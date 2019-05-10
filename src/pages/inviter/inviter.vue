<template>
  <div class="invite">
    <div class="banner">
      <img src="http://www.du17w.cn/skin/ypmili/css/img/extension.jpg" alt>
    </div>
    <div class="self-container">
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
          <referrer-form></referrer-form>
        </div>
        <div v-else-if="active === 1">
          <direct-referrer-table></direct-referrer-table>
        </div>
        <div v-else>
          <indirect-referrer-table></indirect-referrer-table>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import referrerForm from './components/referrer-form.vue'
import directReferrerTable from './components/direct-referrer-table.vue'
import indirectReferrerTable from './components/indirect-referrer-table.vue'
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '推广链接'
        },
        {
          serial: 1,
          title: '直接推荐人'
        },
        {
          serial: 2,
          title: '间接推荐人'
        }
      ],
      active: 0
    }
  },
  components: {
    referrerForm,
    directReferrerTable,
    indirectReferrerTable
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>

<style lang="scss">
.invite {
  .banner {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
