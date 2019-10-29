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
    $('#avatar').on('change', function() {
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
})