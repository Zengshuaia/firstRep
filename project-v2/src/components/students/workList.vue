<template>
    <div>
        <el-table
            :data="comData"
            stripe
            style="width: 100%"
            v-loading="loading">
            <el-table-column
            prop="id"
            label="用户ID"
            align="center">
            </el-table-column>
            <el-table-column
            prop="userid"
            label="所属班级"
            align="center" >
            </el-table-column>
            <el-table-column
            prop="title"
            label="作业名称"
            align="center">
            </el-table-column>
            <el-table-column
            prop="completed_text"
            label="完成情况"
            align="center">
            </el-table-column>
        </el-table>
       <Page :total="total" :url="url"/>
    </div>
</template>
<script>
import Page from '../common/Pageing.vue'
export default{
    components:{
        Page
    },
    data(){
        return{
            tableData:[],
            total:0,
            loading:true,
            url:'/users/studebts/works'
        }
    },
    computed:{
        comData(){
            return this.tableData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize);
        }
    }
}
</script>
<style lang="less" scoped>
.el-pagination{
    text-align: left;
}
</style>