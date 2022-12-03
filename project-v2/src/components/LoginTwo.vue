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
export default{
    data(){
        //验证用户名
        const validtorName=(rule,value,callback)=>{
            let reg=/(^[a-zA-Z0-9]{4,10}$)/;
            if(value===""){
                callback(new Error('请输入用户名'));
            }else if(!reg.test(value)){//判断是否符合正则规则
                callback(new Error('请输入4-10位用户名'))
            }else{
                callback();//验证通过
            }
        }
        //验证用户密码
        const validtorPass=(rule,value,callback)=>{
            //6到12位包含大小写以及特殊字符
            let pass=/^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
            if(value===""){
                callback(new Error('密码不能为空'))
            }else if(!pass.test(value)){
                callback(new Error('请输入6-12位密码必须包含大小写以及特殊字符'))
            }else{
                callback();
            }
        }
        return{
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[{validator:validtorName,trigger:'blur'}],
                password:[{validator:validtorPass,trigger:'blur'}]
            }
        }
    },
    methods:{
        login(form){//登录事件
            this.$refs[form].validate((valid)=>{
                if(valid){
                    console.log(this.form);
                this.$axios.post('http://localhost:3000/users/login',this.form).then(res=>{
                    if(res.status===200){
                        localStorage.setItem('username',res.data.msg.username);
                        this.$message({message:'登录成功',type:'success'});//这个是表单登录成功后会提示的样式
                        this.$router.push('/Home');//路由的跳转
                    }
                }).catch(err=>{
                    console.log(err);
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