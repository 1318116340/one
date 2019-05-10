<template>
  <div class="task-index-search self-search">
    <!--批量操作 -->
    <div class="actions" >
      <span>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
      </span>
      <div class="inlineBlock">
        <el-button type="danger" size="mini" @click="handleBatch(item)">
            批量删除
            <d2-icon name="angle-double-down"></d2-icon>
          </el-button>
      </div>
      <div class="inlineBlock">
        <el-button
        v-for="(item,index) in btnOptions"
        :key="index"
        :type="item.type"
        size="mini"
        @click="handleAction(item.message)"
      >{{item.message}}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { concat } from 'lodash'
export default {
  data () {
    return {
      isIndeterminate: false,
      checkAll: [],
      btnOptions: [
        {
          type: 'primary',
          message: '搜索'
        }
      ]
    }
  },
  computed: {
    listenCheckParams () {
      return this.$store.state.taskManage.checkParams
    },
    listenLoadingOfList () {
      return this.$store.state.taskManage.loading
    }
  },
  watch: {
    optionsCate: function (val) {
      this.options_cate = concat([{ id: null, name: '不限分类' }], val)
    },
    listenCheckParams: function (val) {
      this.isIndeterminate = val.isIndeterminate
      this.checkAll = val.checkAll
    },
    listenLoadingOfList: function (val, old) {
      this.loadView = val
    }
  },
  methods: {
    /**
     * @description 操作
     */
    handleAction (msg, params = {}) {
      this.$store.commit('handelTaskManageState', { params: {} })
    },
    /**
     * @description 全选
     */
    handleCheckAllChange (val) {
      this.isIndeterminate = false
      this.$store.commit('handelTaskManageState', { checkAll: [val, new Date().getTime()] })
    },
    /**
     * @description 批量删除
     */
    handleBatch (val) {
      this.$store.commit('handelTaskManageState', { actions: [val, new Date().getTime()] })
    }
  }
}
</script>
<style lang="scss">
.task-index-search {
  &.self-search {
    padding-top: 0px;
  }
  .actions {
    display: block;
    margin-top: 20px;
    & > .inlineBlock {
      margin-left: 10px;
      & > span {
        margin-right: 10px;
      }
    }
  }
  .el-badge__content.is-fixed {
    top: 15px;
    right: 0px;
  }
  .task-index-tab {
    float: none;
    display: block;
    box-sizing: border-box;
    padding: 0;
    position: relative;
    margin: 0 0 15px;
    border-bottom: 2px solid #e1e4ec;
    background-color: transparent;
    height: 50px;
    .tab-scroll {
      overflow: hidden;
      white-space: nowrap;
    }
    .tab-nav {
      display: inline-block;
      position: relative;
      -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .tab-index {
      display: inline-block;
      position: relative;
      -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      background-color: transparent;
      color: #303133;
      &:before {
        border-radius: 0;
        width: 0;
        border-bottom: 2px solid #409eff;
        left: 50%;
        bottom: 0;
        content: "";
        position: absolute;
        -webkit-transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
      }
      &.active {
        z-index: 1;
        color: #409eff;
        background-color: transparent;
        &:before {
          width: 100%;
          left: 0;
        }
      }
    }
    .tab-inner {
      font-size: 14px;
      min-width: 90px;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-weight: 500;
      position: relative;
      cursor: pointer;
      text-decoration: none;
    }
  }
}
</style>
