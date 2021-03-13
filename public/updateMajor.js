function updateMajor(id){
    $.ajax({
        url: '/majors/' + id,
        type: 'PUT',
        data: $('#update-major').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
