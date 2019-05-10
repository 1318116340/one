<template>
  <div class="member-blacklist">
    <el-card shadow="always">
      <div slot="header" class="clearfix">
        <div><d2-icon name="comment-o" style="margin-right:5px;"></d2-icon> 添加黑名单后，发布方的任务就会被接手方禁止接手。</div>
      </div>
      <!-- <div class="title"><d2-icon name="comment-o" style="margin-right:5px;"></d2-icon> 添加黑名单后，发布方的任务就会被接手方禁止接手。</div> -->
      <div class="tab">
        <span
          v-for="item in tabs"
          :key="item.serial"
          :class="item.serial === active ? 'active':''"
          @click="changeTab(item.serial)"
        >{{item.title}}</span>
      </div>
      <div v-if="active === 0">
        <blacklist-form  @changeTab="changeTab"></blacklist-form>
      </div>
      <div v-else>
        <blacklist-table></blacklist-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import blacklistForm from './components/blacklist-form.vue'
import blacklistTable from './components/blacklist-table.vue'
export default {
  data () {
    return {
      tabs: [
        {
          serial: 0,
          title: '添加黑名单'
        },
        {
          serial: 1,
          title: '黑名单管理'
        }
      ],
      active: 0
    }
  },
  created () {
    console.log(`created`)
  },
  components: {
    blacklistForm,
    blacklistTable
  },
  methods: {
    changeTab (serial) {
      this.active = serial
    }
  }
}
</script>

<style lang="scss">
.member-blacklist {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  .subTitle {
    margin: 5px 0;
    padding-left: 30px;
    font-size: 13px;
    color: #606266;
    line-height: 22px;
  }
  .tab {
    text-align: center;
    margin-top: 30px;
    span {
      display: inline-block;
      width: 120px;
      border: 1px solid #409eff;
      cursor: pointer;
      line-height: 38px;
      text-align: center;
      font-size: 15px;
      color: #409eff;
      font-weight: 500;
      -webkit-transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
      &.active {
        background-color: #409eff;
        color: #fff;
      }
    }
  }
}
</style>
