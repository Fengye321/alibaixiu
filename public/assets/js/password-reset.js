$(function() {
    $('.form-horizontal').on('submit', function() {
        var params = $(this).serialize()
        console.log(params);

        $.ajax({
            url: '/users/password',
            type: 'put',
            data: params,
            success: function(data) {
                // console.log(data);
                location.href = "login.html"
            }
        })
        return false
    })
})