<template>
  <div class="footer-download">
    <ul>
      <li
        v-for="(link,index) in links"
        :key="index"
        @mouseover="selectStyle(link) "
        @mouseleave="mouseLeave(link)"
        :style="`color: #${link.color}`"
      >
        <el-popover placement="top" title trigger="hover">
          <img :src="link.img" alt width="250" height="auto" v-if="link.img">
          <div v-else style="text-align:center;padding:20px 0;">{{link.tip}}</div>
          <span slot="reference">
            <d2-icon :name="link.icon"></d2-icon>
          </span>
        </el-popover>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      links: [
        {
          icon: 'weixin',
          img: `${this.$baseUrl}image/kefu.jpeg`,
          color: '999',
          active: '0dbe14'
        },
        {
          icon: 'apple',
          tip: '暂无商家端IOS版本APP',
          color: '999',
          active: 'ebc026'
        },
        {
          icon: 'android',
          tip: '暂无商家端安卓版本APP',
          color: '999',
          active: '409eff'
        }
      ]
    }
  },
  methods: {
    selectStyle (item) {
      item.color = item.active
    },
    mouseLeave (item) {
      item.color = '999'
    }
  }
}
</script>
