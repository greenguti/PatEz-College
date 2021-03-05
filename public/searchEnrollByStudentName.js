function searchEnrollByStudentName() {
    // get name
    var name = document.getElementById('sName').value
        //construct URL and redirect
    window.location = '/enrollments/by_name/' + encodeURI(name)
}