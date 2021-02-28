//每次调用$get()  $post()   $ajax()的时候,会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
     options.url='http://ajax.frontend.itheima.net'+options.url
})