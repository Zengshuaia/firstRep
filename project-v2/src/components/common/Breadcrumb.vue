<template>
    <div>
        <el-card>
                 <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
                {{item.name}}
            </el-breadcrumb-item>
                  </el-breadcrumb>
        </el-card>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    }
}
</script>