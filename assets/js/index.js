$(function () {
  //调用getUserInfo函数
  getUserInfo();
});
var layer = layui.layer;
//获取用户基本信息
function getUserInfo() {
  //调用ajax
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status != 0) {
        return layui.layer.msg('获取用户信息失败！')
      } else {
        //调用renderAvatar函数渲染用户头像
        renderAvatar(res.data); 
      }
    },
    //不论成功还是是啊比,最终都会调用complete这个函数
//     complete:function(res){
// //在complete函数中   可以使用res.responseJSON拿到服务器响应回来的数据
// if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
// //清除localStorage里的token
// localStorage.removeItem('token')
// //强制跳转到登录页面
// location.href='/login.html'
// }
//     }
  });
}

//渲染用户头像
function renderAvatar(user) {
//获取用户名称
var name=user.nickname || user.username
//设置欢迎文本
$('#welcome').html('欢迎&nbsp;&nbsp'+name)
//按需渲染用户头像
if(user.user_pic!=null){
    //渲染图片头像
$('text-avatar').hide()
$('.layui-nav-img').attr('src',user.user_pic).show()
    
}else{
    //渲染文字头像
$('.layui-nav-img').hide()
//获取到用户名首字母并大写
var fist=name[0].toUpperCase()
$(".text-avatar").html(fist).show()

}
}


//实现退出功能
$('.btnLogout').on('click',function(){
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
//清空本地存储token
localStorage.removeItem('token')
//重新跳转到登录页面
location.href='/login.html'
        //关闭询问框
        layer.close(index);
      });
})
