function getMajorByCollege() {
    // get name
    var Coll = document.getElementById('sMajorid').value
        //construct URL and redirect
    console.log(Coll)
    window.location = '/majors/search/' + encodeURI(lName)
}