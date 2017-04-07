function loadEvent(user, key, title, desc, address, region, expire_time) {

  var html_code =   '<div class="card col-lg-8">' +
                      '<div class="card-content">' +
                        '<h3>' + title + '</h3>' +
                        '<p>' + desc + '</p>' +
                        '<p class="pull-left"><b>' + address + '</b></p><br><br>' +
                        '<div class="card-submit">' +
                          '<button class="btn btn-warning">Expires on ' + expire_time + '</button>' +
                          '<button class="btn btn-default">Region : ' + region + '</button>' +
                          '<button class="btn btn-success pull-right" onclick="clickRequest(' + "'" +  key + "'" + ')">Send Request</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>';

  var div = document.getElementById('feed');
  div.innerHTML += html_code;
}

function clickRequest(key) {
    data = firebase.database().ref('feed').child(key);

     $("#sendRequestModal").modal();
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.database().ref('feed').on('child_added', function(data) {
      loadEvent(user, data.key, data.val().title, data.val().desc, data.val().address, data.val().region, data.val().expire_time);
      console.log(data.val());
    });
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});
