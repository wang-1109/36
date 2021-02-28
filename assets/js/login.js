$(function(){

//登录页面和注册页面的切换
    $('.zhuce').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.denglu').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })


//自定义校验规则
//获取到layUI的form对象
var form=layui.form
var layer=layui.layer

form.verify({
    //自定义一个passd的校验规则
    passd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,

    //注册页面的校验
    req:function(res){
//通过形参拿到确认密码框中的内容
//两者进行一次比较,如果失败就return一个错误提示
var qreq=$('#qreq').val()
if(qreq!=res){
    return '两次密码不一致'
}
    }
  });      
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    //阻止表单的默认提交行为
e.preventDefault()
//发起ajax的post请求
var data={
    username:$('#ming').val(),
    password:$('#qreq').val()
}
$.post('/api/reguser',data,function(res){
    if(res.status!=0){
        return layer.msg(res.message)
    }
        layer.msg('注册成功!')
        //模拟人的点击行为
        $('.denglu').click()

})

})


//监听登录的提交事件
$('#form_login').on('submit',function(e){
    //阻止表单的默认提交行为
    e.preventDefault()
    //发起ajax的post请求
    $.ajax({
        url:'/api/login',
        method:'post',
        data:$('#form_login').serialize(),
        success:function(res){
            if(res.status!=0){
                return layer.msg(res.message)
            }else{
                layer.msg('登录成功!')
                //将登录成功后的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)   
                //跳转页面
                location.href='/index.html'
            }
        }   
    })
})
})  