function getStudentByName() {
    // get name
    var lName = document.getElementById('sLName').value
        //construct URL and redirect
    window.location = '/students/search/' + encodeURI(lName)
}