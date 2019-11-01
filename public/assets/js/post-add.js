$(function() {
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
        //上传文章封面
    $('#feature').on('change', function() {
            var formData = new FormData()
            formData.append('cover', this.files[0])
            $.ajax({
                url: '/upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    // console.log(data);
                    $('#imgs').attr('src', data[0].cover)
                    $('#thumbnail').val(data[0].cover)
                }
            })
        })
        //实现用户上传功能
    $('#addForm').on('submit', function() {
        var params = $(this).serialize()
        $.ajax({
            url: '/posts',
            type: 'post',
            data: params,
            success: function(data) {
                // console.log(data);
                location.href = "posts.html"
            }
        })
        return false
    })

})