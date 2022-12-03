//验证
//用户名的校验
export function RuleName(rule,value,callback){
    let reg=/(^[a-zA-Z0-9]{4,10}$)/;
    if(value===""){
        callback(new Error('请输入用户名'));
    }else if(!reg.test(value)){//判断是否符合正则规则
        callback(new Error('请输入4-10位用户名'))
    }else{
        callback();//验证通过
    }
}

//用户密码的校验
export function RulePass(rule,value,callback){
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