<template>
  <div class="member-grade">
    <div class="banner">
      <img src="http://www.du17w.cn/skin/ypmili/css/img/grade.jpg" alt>
    </div>
    <grade-table></grade-table>
  </div>
</template>
<script>
import gradeTable from './components/grade-table.vue'
export default {
  components: {
    gradeTable
  }
}
</script>

<style lang="scss">
.member-grade {
  .banner {
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
