<template>
  <div class="home">
    <carousel class="carousel"></carousel>
    <info class="info"></info>
     <div class="Mask" v-if="yc" v-bind="show ()">
      <div class="Tips" >
        <img @click="changea1()" src="../home/image/欢迎页面.png" alt="">
<!--        <button @click="changea1()">{{wz}}</button>-->
      </div>
      <div class="Tips" style="display: none;">
        <img @click="changea2()" src="../home/image/第一步.png" alt>
<!--        <button @click="changea2()">{{wz}}</button>-->
<!--        <div class="dhborder1"></div>-->
      </div>
      <div class="Tips" style="display: none;" >
        <img  @click="changea3()" src="../home/image/第二步.png" alt>
<!--        <button @click="changea3()">{{wz}}</button>-->
      </div>
      <div class="Tips" style="display: none;" >
        <img @click="changea4()" src="../home/image/第三步.png" alt>
<!--        <button @click="changea4()">{{wz}}</button>-->
      </div>
    </div>
  </div>
</template>
<script>
import carousel from './components/carousel'
import info from './components/info'
import util from '@/libs/util.js'
export default {
  components: {
    carousel,
    info
  },
  data () {
    return {
      wz: '确定',
      yc: false
    }
  },
  methods: {
    changea1 () {
      this.wz = '下一步'
      document.getElementsByClassName('Tips')[0].style.display = 'none'
      document.getElementsByClassName('Tips')[1].style.display = 'block'
    },
    changea2 () {
      document.getElementsByClassName('Tips')[1].style.display = 'none'
      document.getElementsByClassName('Tips')[2].style.display = 'block'
    },
    changea3 () {
      this.wz = '好的'
      document.getElementsByClassName('Tips')[2].style.display = 'none'
      document.getElementsByClassName('Tips')[3].style.display = 'block'
    },
    changea4 () {
      document.getElementsByClassName('Mask')[0].style.display = 'none'
      localStorage.setItem('price', '3')
    },
    show () {
      var a = localStorage.getItem('price')
      if (a == 3) {
        this.yc = false
      } else {
        const token = util.cookies.get('token')
        if (token && token !== 'undefined' && a != 3) {
          this.yc = true
        }
      }
    }
  },
  mounted () {
    this.show()
  },
  // watch: {
  //   '$route' () {
  //     this.show()
  //   }
  // }
}
</script>
<style lang="scss">
.Mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(3, 3, 3, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
}
.carousel {
  z-index: 1;
}
.Tips:nth-of-type(1){
  position: relative;
  display: flex;
  top: 370px;
}
.Tips:nth-of-type(2){
  position: relative;
  display: flex;
  top: 150px;
  left: 30px;
}
.Tips{
  position: relative;
  display: flex;
  top: 150px;
}
.Tips:nth-of-type(1) img{
  width: 700px;
  height: 300px;
}
.Tips:nth-of-type(1) button {
  position: absolute;
  width: 85px;
  height: 35px;
  top: 180px;
  left: 308px;
  color: white;
  background-color: #409eff;
  border: 1px solid white;
  border-radius:10px;
  outline: none;
}
.Tips:nth-of-type(2) img,.Tips:nth-of-type(3) img,.Tips:nth-of-type(4) img{
  width: 556px;
  /*height: 477px;*/
  margin-top: 20px;
  margin-right:80px;
}
.Tips:nth-of-type(3) img{
  margin-top: 10px;
  margin-right:100px;
}
.Tips:nth-of-type(4) img{
  margin-top: 10px;
  margin-right:120px;
}
.Tips:nth-of-type(2) button{
  position: absolute;
  width: 155px;
  height: 60px;
  top: 438px;
  left: 197px;
  color: white;
  background-color: #409eff;
  border: 1px solid white;
  border-radius:10px;
  font-size: 25px;
  outline: none;
}
.Tips:nth-of-type(3) button{
  position: absolute;
  width: 100px;
  height: 59px;
  top: 431px;
  left: 235px;
  color: white;
  background-color: #409eff;
  border: 1px solid white;
  border-radius:10px;
  font-size: 25px;
  outline: none;
}
.Tips:nth-of-type(4) button {
  position: absolute;
  width: 140px;
  height: 60px;
  top: 429px;
  left: 217px;
  color: white;
  background-color: #409eff;
  border: 1px solid white;
  border-radius:10px;
  font-size: 25px;
  outline: none;
}
</style>
