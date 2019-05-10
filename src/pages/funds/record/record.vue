<template>
  <div class="funds-charge self-container">
    <el-card shadow="always">
       <div slot="header" class="clearfix">
        <div class="title">
          <d2-icon name="comment-o"></d2-icon>资金流水
        </div>
      </div>
      <charge-table-search style="padding-top: 0;"></charge-table-search>
      <charge-table></charge-table>
      <!-- <div class="tab">
        <span
          v-for="item in tabs"
          :key="item.serial"
          :class="item.serial === active ? 'active':''"
          @click="changeTab(item.serial)"
        >{{item.title}}</span>
      </div> -->
      <!-- <div v-if="active === 0">
        <charge-table></charge-table>
      </div>
      <div v-else>
        <infomation-table></infomation-table>
      </div> -->
    </el-card>
  </div>
</template>
<script>
import chargeTableSearch from './components/charge-table-search.vue'
import chargeTable from './components/charge-table.vue'
import infomationTable from './components/infomation-table.vue'
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '资金流水'
        },
        {
          serial: 1,
          title: '信息付费'
        }
      ],
      active: 0
    }
  },
  components: {
    chargeTable,
    chargeTableSearch,
    infomationTable
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>
<style lang="scss">
  .funds-charge{
    &.self-container{
      margin-bottom: 0;
    }
  }
</style>
