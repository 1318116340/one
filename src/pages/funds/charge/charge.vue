<template>
  <div class="funds-charge self-container">
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
        <charge-form @changeTab="changeTab"></charge-form>
      </div>
      <div v-else>
        <charge-table></charge-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import chargeForm from './components/charge-form.vue'
import chargeTable from './components/charge-table.vue'
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '银行转账'
        },
        {
          serial: 1,
          title: '充值记录'
        }
      ],
      active: 0
    }
  },
  components: {
    chargeForm,
    chargeTable
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>
