function deleteStudent(id){
    $.ajax({
        url: '/students/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteStudentCert(pid, cid){
  $.ajax({
      url: '/students/pid/' + pid + '/cert/' + cid,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
