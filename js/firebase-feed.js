function loadEvent(user, key, title, desc, address, region, expire_time, publisher) {

  var html_code =   '<div class="card col-lg-8">' +
                      '<div class="card-content">' +
                        '<h3>' + title + '</h3>' +
                        '<i>' + publisher + '</i><br>' +
                        '<p>' + desc + '</p>' +
                        '<p class="pull-left"><b>' + address + '</b></p><br><br>' +
                        '<div class="card-submit">' +
                          '<button class="btn btn-warning">Expires on ' + expire_time + '</button>' +
                          '<button class="btn btn-default">Region : ' + region + '</button>' +
                          '<button class="btn btn-success pull-right" onclick="clickRequest(' + "'" + key + "'" + ')">Send Request</button>' +
                        '</div>' +
                      '</div>' +
                    '</div>';

  var div = document.getElementById('feed');
  div.innerHTML += html_code;
}

function clickRequest(key) {
  console.log(key);
  firebase.database().ref('feed/' + key).on('value', function(data) {
    $("#sendRequestModal").modal("show");
    console.log(data);
    document.getElementById('location').value = data.val().region;
    document.getElementById('address').value = data.val().address;
  });
}

function getContactOptions() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
        var ngoKey = data.key;

        var html = "";
        firebase.database.ref('ngos/' + ngoKey + '/contacts/').on('child_added', function(data){
          ;
        });
      });
    } else {
      window.location = "./login.html";
      console.log("user not signed in");
    }
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.database().ref('feed').on('child_added', function(data) {
      loadEvent(user, data.key, data.val().title, data.val().desc, data.val().address, data.val().region, data.val().expire_time, data.val().publisher_name);
      console.log(data.val());
    });
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});
