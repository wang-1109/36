//每次调用$get()  $post()   $ajax()的时候,会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
     options.url='http://ajax.frontend.itheima.net'+options.url


     //统一为有权限的接口   设置headers请求头
     if(options.url.indexOf('/my/')!==-1){
          options.headers={
      Authorization: localStorage.getItem("token") || "",

          }
     }


     //全局挂载complete函数
     options.complete=function(res){
          if(res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败！'){
               //清除localStorage里的token
               localStorage.removeItem('token')
               //强制跳转到登录页面
               location.href='/login.html'
               }
     }
     
})



