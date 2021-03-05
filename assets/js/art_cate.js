$(function(){

var form=layui.form
var layer=layui.layer
    initArtCateList()

    //获取文章分类的列表
    function initArtCateList(){
$.ajax({
    method:'get',
    url:'/my/article/cates',
    success:function(res){
        //使用模板引擎获取到列表数据    
        var strhtml=template('tpl-table',res)
$('tbody').html(strhtml)
    }
})
    }

var index=null
//为添加类别绑定点击事件
$('.btnAddCate').on('click',function(){
    index=layer.open({
        title:'添加文章类别',
        type:1,
        content: $('#dialog-add').html(),
        area:['500px','250px']
    })
})



//通过代理形式添加文章分类
$('body').on('submit','#form-add',function(e){
    //阻止表单默认提交行为
e.preventDefault()
//发起ajax请求
$.ajax({
    method:'post',
    url:'/my/article/addcates',
    //快速获取到表单数据
    data:$(this).serialize(),
    success:function(res){
        if(res.status!==0){
            return layer.msg('添加分类失败!')
        }else{
            layer.msg('添加类别成功!')
            //关闭弹出层
            layer.close(index)
            initArtCateList()
        }
    }  
})
})


var indexs=null
//通过代理为编辑按钮绑定点击事件
$('body').on('click','.btn-edit',function(){
    indexs=layer.open({
        title:'修改文章类别',
        type:1,
        content: $('#dialog-edit').html(),
        area:['500px','250px']
    })




    //获取到分类所对应的ID值
    var id=$(this).attr('data-id')
//发起请求获取到对应的数据
$.ajax({
    method:'get',
    url:'/my/article/cates/'+id,
    success:function(res){
        form.val('form-edit',res.data)
    }
})


})

//根据ID  通过代理为form表单绑定提交事件
$('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/article/updatecate',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg('修改分类失败!')
            }else{
                layer.msg('修改分类成功!')
                //关闭弹出层
                layer.close(indexs)
                initArtCateList()
            }
        }
    })
})



    
//根据ID   通过代理为删除按钮绑定点击事件
$('tbody').on('click','.layui-btn-danger',function(){
//获取到ID值
var id=$(this).attr('data-id')
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
$.ajax({
    method:'get',
    url:'/my/article/deletecate/'+id,
    success:function(res){
        if(res.status!==0){
            return layer.msg('删除分类失败!')
        }else{
            layer.msg('删除分类成功!')
            layer.close(index); 
            initArtCateList()
        }
    }
})
        

      });
})

})