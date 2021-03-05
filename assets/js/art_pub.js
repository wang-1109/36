$(function(){

var layer=layui.layer
var form=layui.form
    // 初始化富文本编辑器
initEditor()
initCate()

//定义文章分类的方法
function initCate(){
$.ajax({
    method:'get',
    url:'/my/article/cates',
    success:function(res){
        if(res.status!==0){
            return layer.msg('获取文章分类失败!')
        }else{
            var strhtml=template('tpl-cate',res)
            $('[name="cate_id"]').html(strhtml)
            form.render(); //更新全部
        }
    }
})
}


  // 1. 初始化图片裁剪器
  var $image = $('#image')
  
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  
  // 3. 初始化裁剪区域
  $image.cropper(options)

$('.btnChooseImage').on('click',function(){
    $('#coverFile').click()
})


  //监听#coverFile的change事件,获取用户选择的文件
  $('#coverFile').on('change',function(e){
      //获取到文件的列表数组
      var files=e.target.files
      //判断用户是否选择了文件
      if(files.length===0){
          return
      }
      //根据用户选择的文件,创建一个URL地址
        var newImgURL = URL.createObjectURL(files[0])
      $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })



  //定义文章发布状态
  var art_state='已发布'

  //为存为草稿绑定点击事件  ,让存为草稿按钮状态改为已存草稿
  $('.layui-btn-primary').on('click',function(){
    art_state='草稿'
  })



  //为form表单绑定submit事件
  $('#form-pub').on('submit',function(e){
    e.preventDefault()

    //基于form表单,快速创建一个formdata对象
    var fd=new FormData($(this)[0])
    //往表格数据里附加一个状态
    fd.append('state',art_state)


    //将封面裁剪过后的对象,输出为一个文件对象
    $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function(blob) {
      // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      //  将文件对象，存储到 fd 中
      fd.append('cover_img', blob)
      //  发起 ajax 数据请求
      publishArticle(fd)
    })
  })




 
  function publishArticle(fd){
    $.ajax({
      method:'post',
      url:"/my/article/add",
      data:fd,
      //注意:   如果想服务器提交的是formdata数据,必须添加两个配置项
      contentType: false,
      processData: false,
      success:function(res){
        if(res.status!==0){
          return layer.msg('发布文章失败!')
        }else{
          layer.msg('发布文章成功!')
          //成功后是页面跳转到文章类表
          location.href='/article/art_list.html'
        }
      }
    })
  }
})