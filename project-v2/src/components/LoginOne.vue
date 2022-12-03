<template>
    <div class="login">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>通用后台管理系统</span>
        </div>
        <el-form  label-width="80px" :model="form" ref="form" :rules="rules">
            <!-- 第二种校验方法，自己写 -->
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item >
            <el-button type="primary" @click.native="login( 'form')">登录</el-button>
        </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>
<script>
export default{
    data(){
        //验证账号的规则
        const validateName=(rule,value,callback)=>{
            //请输入4-10位的昵称
            let reg=/(^[a-zA-Z0-9]{4,10}$)/;
            if(value===""){
                callback(new Error('请输入用户名'));
            }else if(!reg.test(value)){
                callback(new Error('请输入4-10位用户名'))
            }else{
                callback();
            }
        };
        //验证密码的规则
        const validatePass=(rule,value,callback)=>{
            let reg=/(^[a-zA-Z0-9]{8,12}$)/
            if(value===''){
                callback(new Error('请输入密码'));
            }else if(!reg.test(value)){
                callback(new Error('请输入8-12位的密码'));
            }else{
                callback();
            }
        }
        return{
            form:{
                username:'',
                password:''
            },
            rules:{//自定义登录规则验证
                username:[{validator:validateName,trigger:'blur'}],
                password:[{validator:validatePass,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(form){//登录事件
            this.$refs[form].validate((valid)=>{
                if(valid){
                    console.log(this.form)//通过后
                }else{
                    console.error(this.form)
                }
            })
        }
    }
}
</script>
<style lang="less">
.login{
    width:100%;
    height:100%;
    position:absolute;
    background:#409EFF;
    .box-card{
        width:450px;
        margin:200px auto;
        .el-card__header{
            font-size:34px; 
        }
        .el-button{
            width:100%;
        }
    }
}
</style>