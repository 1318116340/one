<template>
  <div class="funds-cash self-container">
    <el-card shadow="always">
      <div slot="header" class="clearfix">
        <div class="title">
          <d2-icon name="comment-o"></d2-icon>提现无需手续费！提现还有额外奖励！
        </div>
        <ul class="subTitle">
          <li>500元起提，额外奖励3元现金！</li>
          <li>1000元起提，额外奖励6元现金！</li>
          <li>以此类推，提现金额越大奖励越多！</li>
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
        <cash-apply @changeTab="changeTab"></cash-apply>
      </div>
      <div v-else-if="active === 1">
        <cash-table-search></cash-table-search>
        <cash-table></cash-table>
      </div>
      <div v-else>
        <cash-account></cash-account>
      </div>
    </el-card>
  </div>
</template>
<script>
const cashApply = () => import('./components/cash-apply.vue')
const cashTable = () => import('./components/cash-table.vue')
const cashAccount = () => import('./components/cash-account.vue')
const cashTableSearch = () => import('./components/cash-table-search.vue')
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '申请提现'
        },
        {
          serial: 1,
          title: '提现记录'
        },
        {
          serial: 2,
          title: '账号设置'
        }
      ],
      active: 0
    }
  },
  components: {
    cashApply,
    cashTable,
    cashAccount,
    cashTableSearch
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>
