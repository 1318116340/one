<template>
  <div class="home-task">
    <div class="navigation-buckets">
      <el-row :gutter="30">
        <el-col :span="8" v-for="item in options_cate" :key="item.id">
          <div class="grid-content bg-purple" @click="enterIssueView(item.id)">
            <img :src="calcIconUrl(item.cate)" alt>
            <div>{{item.name}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { GetTaskCate } from '@/api/pages/task'
export default {
  data () {
    return {
      options_cate: [
        { id: '1', name: '淘宝任务', cate: '1' },
        { id: '2', name: '京东任务', cate: '2' },
        { id: '3', name: '拼多多任务', cate: '3' }
      ]
    }
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
    },
    /**
     * @description 计算图标地址
     * @param {Sting} cate 类型
     */
    calcIconUrl (cate) {
      const urls = ['taobao', 'jingdong', 'pingduoduo']
      return `${this.$baseUrl}image/${urls[cate - 1]}.png`
    },
    /**
     * @description 进入发布界面
     * @param {String} id 分类ID
     */
    enterIssueView (id) {
      this.$router.push({
        name: 'issue',
        query: {
          cateId: id,
          task: 1
        }
      })
    }
  }
}
</script>

<style lang="scss">
.home-task {
  margin-right: auto;
  margin-left: auto;
  width: 100% !important;
  max-width: 900px;
  .navigation-buckets {
    background: #fff;
    display: block;
    position: relative;
    width: 100%;
    padding: 20px;
    border-radius: 6px;
    bottom: 80px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.2);
    z-index: 9;
  }
}
.grid-content {
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
}
</style>
