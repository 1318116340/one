<template>
  <div class="news-aside">
    <el-card shadow="always">
      <ul class="ul-unstyle">
        <li
          v-for="tab in tabs"
          :key="tab.id"
          :class="actived === tab.id ? 'active':''"
          @click="changeTab(tab.id)"
        >
          {{tab.title}}
          <d2-icon name="angle-right"></d2-icon>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [
        {
          id: 1,
          title: '公告中心'
        },
        {
          id: 2,
          title: '新手帮助'
        },
        {
          id: 3,
          title: '电商咨询'
        }
        // {
        //   id: 4,
        //   title: '下载APP'
        // }
      ],
      actived: 1
    }
  },
  watch: {
    $route: function (to) {
      this.actived = to.params.type - 0
    }
  },
  created () {
    this.actived = this.$route.params.type - 0
  },
  methods: {
    /**
     * @description 切换tab
     */
    changeTab (id) {
      if (id !== this.actived) {
        this.actived = id
        this.$router.replace({ name: 'news', params: { type: id } })
      }
    }
  }
}
</script>

<style lang="scss">
.news-aside {
  .el-card {
    min-height: 500px;
  }
  .el-card__body {
    padding: 0;
    li {
      padding: 20px;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 1px dotted #dcdfe6;
      &.active {
        color: #409eff;
      }
      &:hover {
        color: #409eff;
      }
      i {
        margin-left: 20px;
      }
    }
  }
}
</style>
