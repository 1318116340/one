<template>
  <div class="task-manage self-container">
    <el-card type="always">
      <manage-search></manage-search>
      <manage-list></manage-list>
    </el-card>
  </div>
</template>
<script>
const manageSearch = () => import('./components/manage-search')
const manageList = () => import('./components/manage-list')
export default {
  components: {
    manageSearch,
    manageList
  }
}
</script>
<style lang="scss">
  .task-manage{
    .el-card__body{
      padding: 10px 30px 10px;
    }
  }
</style>
