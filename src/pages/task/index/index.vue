<template>
  <div class="task-index self-container">
    <el-card type="always">
      <search :optionsCate="options_cate"></search>
      <list :optionsCate="options_cate"></list>
    </el-card>
  </div>
</template>
<script>
import { GetTaskCate } from '@/api/pages/task'
const search = () => import('./components/search')
const list = () => import('./components/list')
export default {
  data () {
    return {
      options_cate: []
    }
  },
  components: {
    search,
    list
  },
  mounted () {
    this.getTaskCate()
  },
  methods: {
    /**
     * @description 请求 - 获取分类信息
     */
    getTaskCate () {
      GetTaskCate()
        .then(res => {
          this.options_cate = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
.task-index {
}
</style>
