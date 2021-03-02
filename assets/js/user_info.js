$(function(){

    var form=layui.form
    var layer=layui.layer

    form.verify({
        nickname:function(res){
            if(res.length>6){
                return '用户昵称必须在 1~6个字符之间!'
            }
        }
    })

    initUserInfo()
    //获取用户基本信息
function initUserInfo(){
//发起ajax请求
$.ajax({
    method:'get',
    url:'/my/userinfo',
    success:function(res){
        if(res.status!=0){  
            return layer.msg('获取用户信息失败!')
        }else{

           form.val('formUserInfo',res.data)
        }
    }
})
}


//重置表单数据
$('.btnReset').on('click',function(e){
//阻止表单默认重置行为
    e.preventDefault()
    //调用initUserInfo函数重新把用户信息渲染到输入框中
    initUserInfo()
})


//监听表单的提交事件
$('.layui-form').on('submit',function(e){
    //阻止表单的默认提交行为
e.preventDefault()
    //发起ajax请求
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        //快速获取表单数据
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('修改用户信息失败!')
            }else{
                layer.msg('修改用户信息成功!')
                //调用父页面中的方法,重新渲染用户头像和信息
                window.parent.getUserInfo()
            }
        }
    })
})
})