function getProfByName() {
    // get name
    var lName = document.getElementById('sLName').value
        //construct URL and redirect
    window.location = '/professors/search/' + encodeURI(lName)
}