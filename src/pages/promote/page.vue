<template>
    <div class="promote-page">
        <div class="page-top">
            <img src="./image/banner.png" alt>
        </div>
        <div class="page-center">
            <div class="table-bg">
                <div class="title">各平台佣金价格表</div>
                <el-row type="flex" justify="space-between" class="row-bg" :gutter="20">
                    <el-col :span="8">
                        <img src="./image/taobaoyongjinzhi.png" alt>
<!--                        <el-table-->
<!--                                :data="tableData"-->
<!--                                border-->
<!--                                style="width: 100%;background-color: #000"-->
<!--                                :row-style="tableRowStyle"-->
<!--                                :header-cell-style="tableHeaderColor">-->
<!--                            <el-table-column-->
<!--                                    label="淘宝天猫商家佣金表"-->
<!--                            >-->

<!--                                <el-table-column-->
<!--                                        prop="date"-->
<!--                                        label="本金"-->
<!--                                >-->
<!--                                </el-table-column>-->
<!--                                <el-table-column-->
<!--                                        prop="name"-->
<!--                                        label="普通商家佣金"-->
<!--                                >-->
<!--                                </el-table-column>-->
<!--                            </el-table-column>-->
<!--                        </el-table>-->

                    </el-col>
                    <el-col :span="8">
                        <img src="./image/jindongyongjinzhi.png" alt>
                    </el-col>
                    <el-col :span="8">
                        <img src="./image/pddrenwuyongjinzhi.png" alt>
                    </el-col>

                </el-row>
            </div>
        </div>
        <div class="page-three">
            <div class="page-three-bg">
                <el-row type="flex" :gutter="80" justify="space-between">
                    <el-col v-for="(item,index) in options_three" :key="index" :span="8">
                        <img :src="item.img" alt>
                        <div class="title">{{item.title}}</div>
                        <div class="content">{{item.content}}</div>
                    </el-col>
                </el-row>
            </div>

        </div>
        <div class="page-ping">
            <img src="./image/333.jpg" alt>
        </div>
        <div class="page-info">
            <div class="page-info-bg">
                <div class="title">三大承诺</div>
                <el-row type="flex" :gutter="30" justify="space-between">
                    <el-col v-for="(item,index) in options_bottom" :key="index" :span="8">
                        <div class="co-title">{{item.title}}</div>
                        <div class="co-content">{{item.content}}</div>
                        <div class="co-content">{{item.content_small}}</div>
                    </el-col>
                </el-row>
            </div>

        </div>

        <div class="fix-btn">
            <div class="btn-login" @click="goRegister()">
                <div>点击注册</div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "page",
        data(){
            return{
                options_three:[
                    {
                        img:'http://fssup.com/tg/img/bb-1.jpg',
                        title:'资金安全',
                        content:'提现当日打款，如担心资金安全问题，我公司可以派经理上门拜访，也可以联系我们大客户经理，来我们公司考察！'
                    },
                    {
                        img:'http://fssup.com/tg/img/bb-2.jpg',
                        title:'真实买号',
                        content:'淘内真实买家，全国各地真实收货地址，试客全部实人认证，买号全部照妖镜严格筛选，确保质量！'
                    },
                    {
                        img:'http://fssup.com/tg/img/bb-3.jpg',
                        title:'提升搜索排名',
                        content:'匹配最新规则，7天内提升关键字排名，14天内新品手淘搜索流量飙升！'
                    }
                ],
                options_bottom:[
                    {
                        title:'降权包赔',
                        content:'赔付近十天降权的补单链接佣金',
                        content_small:'（不包含快递）'

                    },
                    {
                        title:'退款包赔',
                        content:'出现买手退款 我们全额赔付',
                        content_small:''
                    },
                    {
                        title:'真实买号',
                        content:'一人一机一号 严格筛选审核 绝对安全可靠',
                        content_small:''
                    }
                ],
                fixed:false
            }
        },
        methods:{
            // 修改table tr行的背景色
            tableRowStyle({ row, rowIndex }) {
                return 'background-color: #000;color:#fff'
            },
            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                return 'background-color: #000;color:#fff'
            },
            goRegister(){
                this.$router.push({
                    path: 'register',
                    query: {
                        code: '0GVW'
                    }
                })
            }
        },
        mounted () {
            const script = document.createElement('script')
            script.src = 'https://s5.cnzz.com/z_stat.php?id=1277584365&web_id=1277584365'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        watch: {
            '$route' () {
                if (window._czc) {
                    let location = window.location
                    let contentUrl = location.pathname + location.hash
                    let refererUrl = '/'
                    window._czc.push(['_trackPageview', contentUrl, refererUrl])
                }
            }
        }
    }
</script>

<style lang="scss">
.promote-page{
    width: 100%;
    position: relative;
    background-color: #000;
    display: block;
    overflow: hidden;
    .page-top{
        width: 100%;
    }
    .page-center{
        position: relative;
        display: block;
        width: 100%;
        background-color: #000;
        margin-top: 50px;
        margin-bottom: 50px;
        .table-bg
        {
            width: 1200px;
            position: relative;
            text-align: center;
            margin: 0 auto;
            padding: 0;
            .title{
                text-align: center;
                color: #E6A23C;
                font-size: 40px;
                font-weight: 500;
                padding: 20px 0;
            }
            img{
                width: 100%;
            }
        }

    }
    .page-three{
        position: relative;
        background-color: #fff;
        padding: 60px 0;
        .page-three-bg
        {
            width: 1200px;
            text-align: center;
            margin: 0 auto;
            padding: 0;
            img{
                width: 100%;
                margin: 0 auto;
                border-radius: 1000px;
            }
            .title{
                font-size: 40px;
                font-weight: 500;
            }
            .content{
                font-size: 20px;
            }

        }

    }
    .page-ping{
        width: 100%;
        img{
            width: 100%;
            margin: 0 auto;
        }
    }
    .page-info{
        width: 100%;
        background-color: #F2F3F8;
        padding: 50px 0;
        .page-info-bg{
            width: 1200px;
            margin: 0 auto;
            .title{
                font-size: 50px;
                font-weight: 500;
                text-align: center;
                padding: 20px 0;
            }
            .co-title{
                font-size: 40px;
                font-weight: 500;
            }
            .co-content{
                font-size: 20px;
            }
        }

    }
    .fix-btn{
        width: 100%;
        position: fixed;
        top: 0;
        z-index: 10;
        margin-top: 20px;
        .btn-login{
            cursor: pointer;
            background-color: red;
            height: 150px;
            width: 150px;
            border-radius: 150px;
            margin: 0 auto;
            text-align: center;
            font-size: 25px;
            color: #fff;
            line-height: 150px;
        }
    }



}
</style>
