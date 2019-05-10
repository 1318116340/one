<template>
  <div class="home-info">
    <div class="title">核心竞争力</div>
    <div class="line"></div>
    <div class="desc">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="7" v-for="(item,index) in list" :key="index">
          <el-card shadow="hover">
            <img :src="item.img" alt="">
            <div class="msg">{{item.msg}}</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          img: require('../image/core1.png'),
          msg: '全国各地真实用户'
        },
        {
          img: require('../image/core2.png'),
          msg: '多平台 多类型 任务'
        },
        {
          img: require('../image/core3.png'),
          msg: '资金安全担保 全额赔付'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.home-info {
  width: 1200px;
  margin: 0 auto;
  .title {
    margin: 30px auto 20px;
    font-size: 24px;
    text-align: center;
  }
  .line {
    width: 80px;
    height: 4px;
    background-color: #409eff;
    margin: 0 auto;
    border-radius: 2px;
  }
  .el-card__body{
    padding: 0;
    border: none;
    img{
      display: block;
      width: 100%;
    }
    .msg{
      padding: 25px 20px;
      font-size: 18px;
      font-weight: 500;
      text-align: center;
    }
  }
  .desc{
    margin: 30px auto 80px;
  }
}
</style>
