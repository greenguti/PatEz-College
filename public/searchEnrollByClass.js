function searchEnrollByClass() {
    // get class name
    var cName = document.getElementById('sCname').value
        //construct URL and redirect
    console.log(cName)
    window.location = '/enrollments/by_class/' + encodeURI(cName)
}