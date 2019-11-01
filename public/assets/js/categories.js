$(function() {
    //添加分类
    $('#categoriesForm').on('submit', function() {
        var params = $(this).serialize()
        console.log(params);

        $.ajax({
            url: '/categories',
            type: 'post',
            data: params,
            success: function(data) {
                // console.log(data);
                location.reload()
            }
        })
        return false
    })
    $.ajax({
            url: '/categories',
            type: 'get',
            success: function(data) {
                // console.log(data);
                var html = template('categoriesTp1', { data: data })
                $('#categoriesBox').html(html)
            }
        })
        //编辑分类
    $('#categoriesBox').on('click', '.edit', function() {
            var id = $(this).attr('data-id')
            $.ajax({
                url: `/categories/${id}`,
                type: 'get',
                success: function(data) {
                    console.log(data);
                    var html = template('categoriesFromTp1', data)
                    $('#categoriesAll').html(html)
                }
            })

        })
        //修改分类
    $('#categoriesAll').on('submit', '#categorieslist', function() {
            var params = $(this).serialize()
            var id = $(this).attr('data-id')
            $.ajax({
                url: `/categories/${id}`,
                type: 'put',
                data: params,
                success: function(data) {
                    // console.log(data);
                    location.reload()
                }
            })
            return false
        })
        //根据id删除分类
    $('#categoriesBox').on('click', '.delete', function() {
            var id = $(this).attr('data-id')
            if (confirm('确认删除？')) {
                $.ajax({
                    url: `/categories/${id}`,
                    type: 'delete',
                    success: function(data) {
                        location.reload()
                            // console.log(data);

                    }
                })
            }
        })
        //批量删除
    var checkedAll = $('#checkedAll')
    checkedAll.on('change', function() {
        var status = $(this).prop('checked')
        if (status) {
            $('#deletes').show()
        } else {
            $('#deletes').hide()
        }
        $('.checkedOne').prop('checked', status)
    })
    $('#categoriesBox').on('change', '.checkedOne', function() {
        var inputs = $('#categoriesBox').find('.checkedOne')
        if (inputs.length == inputs.filter(':checked').length) {
            checkedAll.prop('checked', true)
        } else {
            checkedAll.prop('checked', false)
        }
        if (inputs.filter(':checked').length > 0) {
            $('#deletes').show()
        } else {
            $('#deletes').hide()
        }

    })
    $('#deletes').on('click', function() {
        var ids = []
        var deleteMany = $('#categoriesBox').find('.checkedOne').filter(':checked')
        deleteMany.each(function(index, item) {
            ids.push($(item).attr('data-id'))
        })
        console.log(ids);
        $.ajax({
            url: `/categories/${ids.join('-')}`,
            type: 'delete',
            success: function() {
                location.reload()
            }
        })

    })

})