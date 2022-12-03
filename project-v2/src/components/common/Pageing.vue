<template>
<div>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :url="url">
        </el-pagination>
</div>
</template>
<script>
import {getDataWork} from '../../utils/table'
export default{
    props:{
        "total":Number,
        "url":String
        //这里有些错误
    },
    data(){
        return{
            currentPage:1,
            pageSize:5,
        }
    },
    methods:{
        handleSizeChange(val) {
        this.pageSize=val;
        getDataWork(this.$parent,'/users/studebts/works',{},['completed']);
      },
      handleCurrentChange(val) {
        this.currentPage=val;
        getDataWork(this.$parent,'/users/studebts/works',{},['completed']);
      }
    },
    created(){
        getDataWork(this,'/users/studebts/works',{},['completed']);
    }
}
</script>
<style lang="less" scoped>

</style>