<template>
    <div class="header">
        <el-header>
            <div class="title">通用后台管理系统</div>
            <div>{{name}}</div>
        </el-header>
    </div>
</template>
<script>
import { getToken } from '../../utils/setToken';

export default{
    data(){
        return{
            name:''
        }
    },
    created(){
        this.name=getToken('username');
    }
}
</script>
<style lang="less">
.header{
    .title{
        width:200px;    
    }
    .el-header{
        background-color:#2578b5;
        color:#fff;
        line-height:60px;   
        display: flex;
        display: flex;
        justify-content: space-between;
    }
}
</style>