$(function() {
    $.ajax({
        url: '/posts',
        type: 'get',
        success: function(data) {
            // console.log(data);
            var html = template('postTp1', { data: data.records })
            $('#postBox').html(html)
            var page = template('pageTp1', data)
            $('#pagination').html(page)
        }
    })

    function formateDate(date) {
        var date = new Date(date)
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
    template.defaults.imports.formateDate = formateDate;
   
    //获取文章分类
    $.ajax({
        url: '/categories',
        type: 'get',
        success: function(data) {
            // console.log(data);
            var html = template('postlistTp1', { data: data })
            $('#category').html(html)
        }
    })
    $('#filterForm').on('submit',function(){
        var params=$(this).serialize()
        // console.log(params);
        
        $.ajax({
            url: '/posts',
            type: 'get',
            data:params,
            success: function(data) {
            console.log(data);
            var html = template('postTp1', { data: data.records })
            $('#postBox').html(html)
            var page = template('pageTp1', data)
            $('#pagination').html(page)
        }
        })
        return false
    })

    //点击删除
    $('#postBox').on('click','.delete',function(){
        var id = $(this).attr('data-id')       
        if(confirm('确认删除？？')){
            $.ajax({
                url:`/posts/${id}`,
                type:'delete',
                success:function(data){
                    // console.log(data);
                    location.reload()                  
                }
            })
        }       
      preventDefault
    })
})

function changePage(page) {
    // console.log(page);
    $.ajax({
        url: '/posts',
        type: 'get',
        data: {
            page: page
        },
        success: function(data) {
            // console.log(data);
            var html = template('postTp1', { data: data.records })
            $('#postBox').html(html)
            var html = template('pageTp1', data)
            $('#pagination').html(html)

        }
    })
    
}