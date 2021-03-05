$(function(){

var layer=layui.layer
var form=layui.form
var laypage=layui.laypage
//定义一个查询的参数对象
//需要将请求参数对象提交到服务器
var q={
    pagenum:1,//页码值  默认请求第一页的数据
    pagesize:2,   //每页显示几条数据,默认每页显示两条
    cate_id:'',   //文章分类的ID
    state:''   //	文章的状态  可选值有:草稿,已发布
}

//定义美化时间过滤器
// template.defaults.imports.dataFormat=function(res){
//     var dt=new Date(res)

// var y=dt.getFullYear()
// var m=padZero(dt.getMonth()+1)
// var d =padZero(dt.getDate())


// var hh=padZero(dt.getHours())
// var mm=padZero(dt.getMinutes())
// var ss=padZero(dt.getSeconds())

// //拼接时间
// return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss


// //定义补零函数
// function padZero(s){
//     return s>9?n:'0'+n
// }
// }

    initTable()
 
    initCate()
    //获取文章列表数据的方法
    function initTable(){
$.ajax({
    method:'get',
    url:'/my/article/list',
    data:q,
    success:function(res){
        if(res.status!==0){ 
return layer.msg('获取文章列表失败!')
        }else{
            //成功后使用模板引擎来渲染页面
            var htmlstr=template('tpl-table',res)
            $('tbody').html(htmlstr)
            renderPage(res.total)
        }
    }
})
    }




    // 初始化文章分类的方法
    function initCate() {
      $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('获取分类数据失败！')
          }
          // 调用模板引擎渲染分类的可选项
          var htmlStr = template('tpl-cate', res)
          $('[name=cate_id]').html(htmlStr)
          // 通过 layui 重新渲染表单区域的UI结构
form.render()
        }
      })
    }



    //为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        //获取到两个选择框选中的值
        var id=$('[name="cate_id"]').val()
        var sate=$('[name="state"]').val()

        //向q里面添加最新值
        q.cate_id=id
        q.state=sate


        //重新渲染列表页面
        initTable()
    })



    //定义渲染分页的方法
    function renderPage(total){
        laypage.render({
            elem:'pageBox',//分页容器的ID
            count:total,//总数据条数
            limit:q.pagesize,//每页显示几条数据
            curr:q.pagenum,//分页的起始位置
            //自定义排版
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,4,5,7],
            //分页发生切换时,就会触发jump回调
            //触发jump回调方法有两种:
            //1.点击触发
            //2. 调用了  laypage.render方法触发
            jump: function(obj, first){
               //可以通过first的值来判断是通过哪种方式触发的jump回调
               //如果first的值为true证明是 laypage.render触发的
                 //吧最新的页码值赋值给q这个查询参数对象中
                q.pagenum=obj.curr
                //吧最新的条目数赋值给q,然后重新渲染
                // console.log(obj.limit); //得到每页显示的条数
                q.pagesize=obj.limit
                //根据最新的q获取对应的数据列表,并渲染表格

                if(!first){
                    initTable()
                }
              }
        })
    }


    //通过代理形式,为删除按钮绑定点击删除事件
    $('body').on('click','.layui-btn-danger',function(){
        //获取删除按钮的个数
        var les=$('.layui-btn-danger').length
        //通过ID删除对应的数据
        var id=$(this).attr('data_id')
        //询问用户是否要删除数据
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/delete/'+id,
                success:function (res) {
                    if(res.status!==0){
                        return layer.msg('删除失败')
                    }else{  
                        layer.msg('删除成功')
//当数据删除完成之后,需要判断当前页面是否还有数据,如果有,让页码值-1,再调用initTable()重新渲染
if(les===1){
    //如果les值为1,则证明页面上已经没有数据了,页码值最小为1
    q.pagenum=pagenum==1?1:q.pagenum-1
}

                            
                        initTable()
                    }
                  }
            })
            
            layer.close(index);
          });
    })
})