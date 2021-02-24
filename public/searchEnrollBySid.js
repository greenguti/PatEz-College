function searchEnrollBySid() {
    // get sid
    var sid = document.getElementById('sSid').value
    console.log(sid)
        //construct URL and redirect
    window.location = '/enrollments/by_sid/' + encodeURI(sid)
}