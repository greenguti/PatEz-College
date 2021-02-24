function getClassByName() {
    // get name
    var Clname = document.getElementById('ClName').value
        //construct URL and redirect
    window.location = '/classes/search/' + encodeURI(lName)
}