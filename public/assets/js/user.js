$(function() {
    //添加用户功能
    $('#userForm').on('submit', function() {
        var formData = $(this).serialize()
        $.ajax({
            url: '/users',
            type: 'post',
            data: formData,
            success: function(data) {
                // console.log(data);
                location.reload()
            },
            error: function() {
                console.log('创建用户失败');

            }
        })
        return false
    })

    //上传头像设置
    $('#modifyBox').on('change', '#avatar', function() {
            var formData = new FormData()
            formData.append('avatar', this.files[0])
            console.log(this.files[0]);

            $.ajax({
                url: '/upload',
                type: 'post',
                data: formData,
                processData: false,
                contentType: false,
                success: function(data) {
                    console.log(data);
                    $('#youphone').attr('src', data[0].avatar)
                    $('#hiddenAvatar').val(data[0].avatar)

                },
                error: function() {
                    alert('上传头像失败')
                }
            })
        })
        //用户列表显示
    $.ajax({
            url: '/users',
            type: 'get',
            success: function(data) {
                var html = template('tp1', {
                    data: data
                })
                $('#tbodyBox').html(html)

            }
        })
        //根据id查询用户
    $('#tbodyBox').on('click', '.edit', function() {
            var id = $(this).attr('data-id')
            $.ajax({
                url: `/users/${id}`,
                type: 'get',
                success: function(data) {
                    // console.log(data);
                    //将获取到的数据显示在左侧
                    var html = template('modifyTp2', data)
                    $('#modifyBox').html(html)
                }
            })
        })
        // 根据获取后的数据修改用户数据
    $('#modifyBox').on('submit', '#editForm', function() {
            var params = $(this).serialize()
            var id = $(this).attr('data-id')
            $.ajax({
                url: `/users/${id}`,
                type: 'put',
                data: params,
                success: function(data) {
                    // console.log(data);
                    location.reload()

                }
            })

            return false
        })
        //删除当前点击的数据
        // var id = ''
        //     id = id += $(this).attr('data-id') + '-'
        //     var id = id.split('-')[0]
        //     console.log(id);
    $('#tbodyBox').on('click', '.delete', function() {
        var isConfirm = confirm('是否确定删除???')
        if (isConfirm) {
            var id = $(this).attr('data-id')
            $.ajax({
                url: `/users/${id}`,
                type: 'delete',
                success: function(data) {
                    // console.log(data);
                    location.reload()

                }
            })
        }
    })
})