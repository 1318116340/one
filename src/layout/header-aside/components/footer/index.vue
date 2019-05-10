<template>
  <div class="d2-theme-footer">
    <div class="d2-theme-footer-panel" flex>
      <div flex-box="1" style="width:740px;">
        <d2-footer-info></d2-footer-info>
      </div>
      <div flex-box="1" style="width:200px;text-align: center;">
        <div style="font-size:12px;color: #999;">周一至周五 9:00-18:00</div>
        <div style="font-size: 22px;color: #409EFF;font-weight: 500;margin-top: 5px;">客服微信号：tfc55c</div>
      </div>
      <div flex-box="1" style="width:220px;">
        <d2-footer-download></d2-footer-download>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    'd2-footer-info': () => import('../footer-info'),
    'd2-footer-download': () => import('../footer-download')
  }
}
</script>
<style lang="scss">
.d2-theme-footer {
  padding: 48px 20px;
  background-color: #fff;
  border-top: 1px solid #f1f1f1;
  .d2-theme-footer-panel {
    width: 1160px;
    max-width: 1160px;
    margin: 0 auto;
    .footer-info {
      .footer-info-link {
        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 12px;
        color: #999;
        li {
          display: inline-block;
          padding-right: 15px;
          border-right: 1px solid #d6d6d6;
          margin-right: 15px;
          span {
            display: block;
            line-height: 18px;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
      .footer-info-certificate {
        font-size: 12px;
        padding-top: 10px;
        color: #999;
        text-align: center;
      }
    }
    .footer-download {
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        color: #999;
        text-align: center;
        margin-top: 13px;
        li {
          display: inline-block;
          font-size: 20px;
          padding: 0 20px;
          cursor: pointer;
          &:not(:last-child) {
            border-right: 1px solid #d6d6d6;
          }
        }
      }
    }
  }
}
</style>
