<template>
  <div class="member-index">
    <el-card shadow="always">
      <div slot="header" class="header clearfix">
        <img
          class="avatar"
          :src="calcAvatarImg()"
          alt
        >
        <div class="username">
          {{info.username}} (商家会员)
        </div>
        <div class="info">
          <span>
            手机认证
            <d2-icon name="check-circle"></d2-icon>
          </span>
          <span>
            <el-button type="text" @click="$router.push({name:'shopkeeper'})">绑定掌柜</el-button>
          </span>
        </div>
        <div class="actions">
          <div class="icon" v-for="(item,index) in actions" :key="index" @click="$router.push({name:item.router.name})">
            <d2-icon :name="item.icon"></d2-icon>
            <div class="desc">{{item.desc}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">我的资金</div>
        <div class="info">
          <span style="margin-right:20px;color: orangered;">{{info.balance}}元</span>
          <el-button type="text" @click="$router.push({name:'funds-charge'})">充值</el-button>
          <el-button type="text" @click="$router.push({name:'funds-cash'})">提现</el-button>
          <el-button type="text" @click="$router.push({name:'funds-record'})">明细</el-button>
        </div>
      </div>
      <div class="content">
        <div class="title">接手任务六大注意事项</div>
        <ul class="desc">
          <li>一、严禁通过旺旺联系发布方或旺旺聊天中带有平台、提升销量等忌讳字眼；</li>
          <li>二：禁止在任务过程中，辱骂任务一方，出言不逊；</li>
          <li>三、禁止使用花呗、淘金币、天猫积分、返利网、淘宝客、信用卡支付；</li>
          <li>四、必须物流信息签收后才能在淘宝确认收货！（无法获取物流信息的联系发布方）；</li>
          <li>五、禁止以任何理由给对方差评及非五星好评等行为；</li>
          <li>六、严禁好评乱写评语，广告评语或恶意乱写评语</li>
        </ul>
      </div>
      <div class="content">
        <div class="title">发布任务三大注意事项</div>
        <ul class="desc">
          <li>一、禁止发布方发布不实任务，骗取流量!</li>
          <li>二、禁止发布一个任务却以各种理由让接手方拍淘宝多个商品/链接；</li>
          <li>三、禁止发布方不勾选对应要求却在留言中要求接手完成，如"货比三家"。</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>
<script>
import { GetMemberInfo } from '@/api/pages/member/index'
export default {
  data () {
    return {
      actions: [
        {
          icon: 'thumb-tack',
          desc: '可处理任务',
          router: {
            name: 'task-index'
          }
        },
        {
          icon: 'exclamation-circle',
          desc: ' 可处理投诉',
          router: {
            name: 'task-index'
          }
        }
      ],
      info: {
        username: ''
      }
    }
  },
  mounted () {
    this.getMemberInfo()
  },
  methods: {
    /**
     * @description 请求 - 获取用户信息
     */
    getMemberInfo () {
      GetMemberInfo()
        .then(res => {
          this.info = res.info
        })
        .finally(() => {})
    },
    /**
     * @description 头像图片
     * @returns {String} 图片URL
     */
    calcAvatarImg () {
      return `${this.$baseUrl}image/avatar.jpg`
    }
  }
}
</script>

<style lang="scss">
.member-index {
  width: 1200px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  position: relative;
  .header {
    position: relative;
    .avatar {
      width: 100px;
      height: 100px;
      float: left;
      margin-right: 20px;
    }
    .username {
      font-size: 22px;
      margin: 5px auto 10px;
      span {
        font-size: 16px;
        color: #606266;
        margin-left: 10px;
      }
    }
    .info {
      font-size: 14px;
      i {
        color: #06b506;
        margin-right: 20px;
      }
    }
    .actions {
      position: absolute;
      right: 0;
      top: 0;
      .icon {
        padding: 10px;
        display: inline-block;
        margin-left: 20px;
        cursor: pointer;
        i {
          display: block;
          font-size: 50px;
          text-align: center;
          color: #409eff;
          font-weight: 500;
        }
        .desc {
          margin-top: 10px;
          font-size: 14px;
        }
      }
    }
  }
  .content {
    border-bottom: 1px dotted #dcdfe6;
    padding: 15px 10px;
    .title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .info {
      font-size: 26px;
      color: #606266;
      .lock {
        font-size: 18px;
        margin: 0 30px 0 10px;
        color: orangered;
      }
      .el-button{
        margin-right: 15px;
      }
    }
    .desc{
      li{
        margin-bottom: 10px;
        color: #606266;
      }
    }
  }
}
</style>
