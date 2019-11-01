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
                    $('#hiddenAvatar').val(data[0].avatar)
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
        //用户批量删除
    var sclectAll = $('#sclectAll')
    var deleteMany = $('#deleteMany')
        //全选  反选
    sclectAll.on('change', function() {
            var status = $(this).prop('checked')
                //全选按钮选中，则批量删除按钮选中
            if (status) {
                deleteMany.show()
            } else {
                deleteMany.hide()
            }
            $('#tbodyBox').find('.checkedOne').prop('checked', status)
        })
        //小选择框全选，全选按钮选中，否则全选按钮不选中
    $('#tbodyBox').on('change', '.checkedOne', function() {
        var inputs = $('#tbodyBox').find('.checkedOne')
        if (inputs.length == inputs.filter(':checked').length) {
            sclectAll.prop('checked', true)
        } else {
            sclectAll.prop('checked', false)
        }
        //如果选择框有选中，则显示批量删除按钮
        if (inputs.filter(':checked').length > 0) {
            deleteMany.show()
        } else {
            deleteMany.hide()
        }
    })
    deleteMany.on('click', function() {
        var ids = []
        var deletes = $('#tbodyBox').find('.checkedOne').filter(':checked')
        deletes.each(function(index, item) {
            ids.push($(item).attr('data-id'))
        })
        if (confirm('确认删除')) {
            $.ajax({
                url: `/users/${ids.join('-')}`,
                type: 'delete',
                success: function() {
                    location.reload()
                }
            })
        }
    })
})