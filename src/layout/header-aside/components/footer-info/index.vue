<template>
  <div class="footer-info">
    <ul class="footer-info-link">
      <li v-for="(link,index) in links" :key="index">
        <span>{{link.title}}</span>
      </li>
    </ul>
    <div
      class="footer-info-certificate"
    >©2019 haoshengyi Telecom Equipment Co., Ltd. All rights reserved.</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          title: '加盟分站'
        },
        {
          title: '辅助业务'
        },
        {
          title: '联系客服'
        },
        {
          title: '生财有道网规'
        },
        {
          title: '网站活动'
        },
        {
          title: '关于我们'
        },
        {
          title: '联系方式'
        },
        {
          title: '使用协议'
        },
        {
          title: '版权隐私'
        }
      ]
    }
  }
}
</script>
