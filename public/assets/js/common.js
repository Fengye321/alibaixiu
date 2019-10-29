$(function() {
    $('#logout').on('click', function() {
        var isConfirm = confirm('你要离开？不！你舍不得')
        if (isConfirm) {
            $.ajax({
                url: '/logout',
                type: 'post',
                success: function() {
                    location.href = 'login.html'
                },
                error: function() {
                    alert('退出失败')
                }
            })
        }
    })
})