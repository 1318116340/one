<template>
  <div class="home-carousel">
    <div class="home-carousel-panel">
      <el-carousel height="440px" :autoplay="false">
        <el-carousel-item v-for="(item,index) in lists" :key="index">
          <img :src="item.img" alt>
        </el-carousel-item>
      </el-carousel>
    </div>
    <task></task>
  </div>
</template>
<script>
import task from './task.vue'
export default {
  data () {
    return {
      lists: [
        {
          img: require(`@/pages/home/image/画板 2.png`)
        },
        {
          img: require('@/pages/home/image/画板 1.png')
        }
      ]
    }
  },
  components: {
    task
  }
}
</script>
<style lang="scss">
.home-carousel {
  .home-carousel-panel {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
  .el-carousel {
    width: 1200px;
    margin: 0 auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
  }
}
</style>
