function getClassByID() {
    // get name
    var Clname = document.getElementById('sCid').value
        //construct URL and redirect
    console.log(Clname)
    window.location = '/classes/search/' + encodeURI(lName)
}