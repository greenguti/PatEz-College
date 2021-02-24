function getMajorByCollege() {
    // get name
    var Coll = document.getElementById('CollegeName').value
        //construct URL and redirect
    window.location = '/majors/search/' + encodeURI(lName)
}