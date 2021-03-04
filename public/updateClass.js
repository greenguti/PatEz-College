function updateClass(id){
    $.ajax({
        url: '/classes/' + id,
        type: 'PUT',
        data: $('#update-class').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
