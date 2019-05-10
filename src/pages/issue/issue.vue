<template>
  <div class="issue self-container">
    <el-card>
      <div class="title">
        <d2-icon name="comment-o" style="margin-right:5px;"></d2-icon>所有商家都要注意在生财有道推广务必严格控制好以下4点：
      </div>
      <ul class="subTitle" style="list-style:inherite;">
        <li>1.
          <b>物流一定要有真实物流记录，一定要有全程重量并且重量跟真实商品一致！一定不要网上买那些小快递的，便宜的空包（稽查系统在不断升级，有些以前没出事不代表现在或以后没事）</b>；目前可以选用平台提供的空包（不要信当地快递网点手动输入的重量，当地网点无法控制包裹在中转站和到达点的重量统计）
        </li>
        <li>2. 移动端搜索转化率务必不要过高，保持在行业平均转化率的1.5倍左右最佳</li>
        <li>
          3. 推广期间请<b>务必关掉商品淘客佣金</b>，推广过程有诸多不确定因素可能导致产生佣金造成您的损失。
        </li>
      </ul>
      <div class="title" style="margin-top:20px;">
        <d2-icon name="comment-o" style="margin-right:5px;"></d2-icon>各平台商品最低佣金参考值：（仅展示部分数值，有超过部分以此递增类推）
      </div>
      <img src="../issue/image/lALPBE1XX-rP5xPM_M0D0A_976_252.png" alt>
    </el-card>
    <tabs style="margin-top:20px;"></tabs>
  </div>
</template>
<script>
import tabs from './components/tabs'

export default {
  components: {
    tabs,
    searchBarFixed: false
  }
}
</script>
<style lang="scss">
.issue {
  .subTitle,
  .subTitle li {
    list-style: inherit;
    b {
      color: red;
    }
  }
}
</style>
