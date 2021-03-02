$(function(){
    var layer=layui.layer
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)


//为上传按钮绑定点击事件
$('.shchuan').on('click',function(){
    $('.file').click()
})      


//为文件选择框绑定change事件   change  当元素值发生改变是就会触发change事件
$('.file').on('change',function(e){
//获取用户选择的文件
var filelist=e.target.files
if(filelist.length===0){
    return layer.msg('请选择图片!    ')
}
// 1. 拿到用户选择的文件
       var file = e.target.files[0]
// 2. 根据选择的文件，创建一个对应的 URL 地址：
       var newImgURL = URL.createObjectURL(file)
// 3. 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
       $image       
          .cropper('destroy')      // 销毁旧的裁剪区域
          .attr('src', newImgURL)  // 重新设置图片路径
          .cropper(options)        // 重新初始化裁剪区域
   
//为确定按钮绑定点击事件
$('.layui-btn-danger').on('click',function(){
    //拿到用户裁剪过后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串


//发起ajax请求   吧用户选择的头像上传到服务器
$.ajax({
    method:'post',
    url:'/my/update/avatar',
    data:{
        avatar:dataURL
    },
    success:function(res){
        if(res.status!==0){
            return layer.msg('更换头像失败!')
        }else{
            layer.msg('更换头像成功!')
            //调用父页面中的方法  重新渲染用户头像
            window.parent.getUserInfo()
        }
    }
})
    })

})
})
