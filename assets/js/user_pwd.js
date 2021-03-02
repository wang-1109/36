$(function(){

var form=layui.form
var layer=layui.layer

//为表单添加自定义校验规则
form.verify({
    pwb: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
      samePwd:function(value){
          if(value===$('[name="oldPwd"]').val()){
              return '新旧密码不能一致!'
          }
      },    
      rePwd:function(value){
          if(value!==$('[ name="newPwd"]').val()){
              return '两次密码不一致'
          }
      }
})


//发起请求实现重置密码
$('.layui-form').on('submit',function(e){
    //阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/updatepwd',
        //快速获取获取表单数据
        data:$(this).serialize(),
        success:function(res){
            console.log(res);
            if(res.status!=0){
                return layer.msg('更新密码失败!')
            }else{
                layer.msg('更新密码成功!')
                //重置表单  需要把表单转换为dom元素,在调用dom里的reset属性
                $('.layui-form')[0].reset()
                //跳转到登录页面
 window.parent.location.href='/login.html' 
            }
        }

    })
})
})