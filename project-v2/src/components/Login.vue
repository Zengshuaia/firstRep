<template>
    <div class="login">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>通用后台管理系统</span>
        </div>
        <el-form  label-width="80px" :model="form" ref="form" :rules="rules">
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
import {RuleName,RulePass} from '../utils/validate.js'
import { setToken } from '../utils/setToken.js'
import {login} from '../api/api.js'
export default{
    data(){
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{validator:RuleName,trigger:'blur'}],
                password:[{validator:RulePass,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(form){//登录事件
            this.$refs[form].validate((valid)=>{
                if(valid){
                // this.$axios.post('http://localhost:3000/users/login',this.form).then(res=>{
                //     if(res.status===200){
                //         setToken('username',res.data.msg.username);
                //         this.$message({message:'登录成功',type:'success'});//这个是表单登录成功后会提示的样式
                //         this.$router.push('/Home');//路由的跳转
                //     }
                // }).catch(err=>{
                //     console.log(err);
                // })
                    // this.service.post('/users/login',this.form).then(res=>{
                    //     if(res.data.state===200){
                    //         setToken('username',res.data.token);//把token设置成了用户名
                    //         setToken('token',res.data.token);   
                    //         this.$message({message:res.data.message,type:'success'});
                    //         this.$router.push('/Home')
                    //     }       
                    // }).catch(err=>{
                    //     console.log(err);
                    // })
                    login(this.form).then((res)=>{
                        if(res.data.state===200){
                            setToken('username',res.data.token);//把token设置成了用户名
                            setToken('token',res.data.token);//登录后保存token
                            this.$message({message:res.data.message,type:'success'});
                            this.$router.push('/Home')
                        }      
                    }).catch(err=>{
                        console.error(err);
                    })
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
    .el-card{
        background:#65768577
    }
    .box-card{
        width:450px;
        margin:200px auto;
        color:#fff;
        .el-form .el-form-item__label{
           color:#fff;
        }
        .el-card__header{
            font-size:34px; 
        }
        .el-button{
            width:100%;
        }
    }
}
</style>