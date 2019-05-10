<template>
  <div class="member-grade-table">
    <el-card shadow="always">
      <div slot="header" class="clearfix">
        <div class="title">
          <d2-icon name="comment-o" style="margin-right:5px;"></d2-icon>生财有道会员服务一览表
        </div>
      </div>
      <div class="list">
        <el-row>
          <el-col :span="8">
            <ul class="ul-unstyle">
              <li>服务范围\会员组</li>
              <li>收费模式</li>
              <li>30 天</li>
              <li>升级</li>
              <li>会员类型</li>
              <li>拥有VIP标识</li>
              <li>掌柜数量限制</li>
              <li>24小时发布任务数量</li>
              <li>发布任务总数限制</li>
              <li>批量发布任务数量</li>
              <li style="line-height:110px;">任务要求选项</li>
              <li style="line-height:80px;">买家要求选项</li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="ul-unstyle">
              <li>商家会员</li>
              <li>免费</li>
              <li>-</li>
              <li>你所有的会员</li>
              <li>商家会员</li>
              <li>
                <d2-icon name="minus-circle" style="color:red;font-size:18px;"></d2-icon>
              </li>
              <li>10</li>
              <li>100</li>
              <li>不限</li>
              <li>50</li>
              <li class="clearfix" style="padding: 10px 20px;">
                <el-tag size="small" v-for="(item,index) in taskTags" :key="index">{{item}}</el-tag>
              </li>
              <li class="clearfix" style="padding: 10px 20px;">
                <el-tag type="success" size="small" v-for="(item,index) in buyerTags" :key="index">{{item}}</el-tag>
              </li>
            </ul>
          </el-col>
          <el-col :span="8">
            <ul class="ul-unstyle">
              <li>荣誉商家会员</li>
              <li>收费</li>
              <li>60元</li>
              <li>
                <el-button type="primary" size="mini">立即升级</el-button>
              </li>
              <li>商家会员</li>
              <li >
                <d2-icon name="check-circle" style="color:green;font-size:18px;"></d2-icon>
              </li>
              <li>不限</li>
              <li>500</li>
              <li>不限</li>
              <li>不限</li>
              <li class="clearfix" style="padding: 10px 20px;">
                <el-tag size="small" v-for="(item,index) in taskTags" :key="index">{{item}}</el-tag>
              </li>
              <li class="clearfix" style="padding: 10px 20px;">
                <el-tag type="success" size="small" v-for="(item,index) in buyerTags" :key="index">{{item}}</el-tag>
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      align: 'center',
      taskTags: [
        '设备要求',
        '货比三家',
        '拍前聊天',
        '浏览评价',
        '加购物车',
        '收藏宝贝',
        '评价建议',
        '要求确认时间',
        '任务回收时间',
        '留言提醒'
      ],
      buyerTags: [
        '需要审核',
        '接任务限制',
        '禁止地区',
        '是否商保会员',
        '买号信用要求',
        '买号淘气值要求'
      ]
    }
  }
}
</script>

<style lang="scss">
.member-grade-table {
  width: 1200px;
  max-width: 1200px;
  margin: 30px auto;
  .el-table {
    th {
      background-color: #f2f2f2;
      color: #777;
      font-weight: 600;
    }
  }
  .list {
    border-top: 1px solid #dcdfe6;
    border-left: 1px solid #dcdfe6;
    ul {
      li {

        line-height: 50px;
        text-align: center;
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        font-size: 14px;
        &:first-child {
          font-weight: 600;
          background-color: #f7f7f7;
          color: #606266;
        }
      }
    }
    .el-tag {
      float: left;
      margin: 0 10px 6px 0;
      font-weight: 500;
    }
  }
}
</style>
