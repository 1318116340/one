<template>
  <div class="news">
    <div class="self-container">
      <el-row :gutter="20">
        <el-col :span="4">
          <news-aside></news-aside>
        </el-col>
        <el-col :span="20">
          <news-content></news-content>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import newsAside from './components/news-aside'
import newsContent from './components/news-content'
export default {
  components: {
    newsAside,
    newsContent
  }
}
</script>
