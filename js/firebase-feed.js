function loadEvent(user, key, dat) {

  var html_code =   '<div class="card col-lg-8">' +
                      '<div class="card-content">' +
                        '<h3>' + dat.title + '</h3>' +
                        '<i>' + dat.publisher_name + '</i><br>' +
                        '<p>' + dat.desc + '</p>' +
                        '<p><b>' + dat.address + '</b></p><br>' +
                        '<p><b>Can feed ' + dat.impact + ' people</b></p><br><br>' +
                        '<div class="card-submit">' +
                          '<button class="btn btn-warning">Expires on ' + dat.expire_time + '</button>' +
                          '<button class="btn btn-default">Region : ' + dat.region + '</button>' +
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
    document.getElementById('event-key').value = key;
    document.getElementById('location').value = data.val().region;
    document.getElementById('address').value = data.val().address;
    document.getElementById('req-quantity').value = data.val().impact;
    document.getElementById('req-quantity').setAttribute('max', data.val().impact);
    getContactOptions(data.val().region);
  });
}

function sendRequest(key) {

  key         = document.getElementById('event-key').value;
  region      = document.getElementById('location').value;
  address     = document.getElementById('address').value;
  impact      = document.getElementById('req-quantity').value;
  contactKey  = document.getElementById('ngo-contact').value;
  var user    = firebase.auth().currentUser;

  var ngoKey, contact_name, contact_number, setImpact;

  firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
    ngoKey = data.key;

    firebase.database().ref('/feed/' + key).on('value' , function(data) {
      publisher_name    = data.val().publisher_name;
      publisher_number  = data.val().mobile;
    });

    firebase.database().ref('/ngos/' + ngoKey + '/contacts/' + contactKey).on('value' , function(data) {
      contact_name = data.val().contact_name;
      contact_number = data.val().contact_phone;
    });


    firebase.database().ref('feed/' + key + '/ngos/' + ngoKey).set({
      'status'  : 'waiting',
      'impact'  : impact
    });
    firebase.database().ref('feed/' + key + '/ngos/' + ngoKey + '/contacts/' + contactKey).update({
        'contact_name'    : contact_name,
        'contact_number'  : contact_number
    });
    firebase.database().ref('feed/' + key).on('value', function(data){
      setImpact = data.val().impact;
    });

    firebase.database().ref('feed/' + key).update({
      'order_status'  : 'partial'
    });

    firebase.database().ref('feed/' + key).update({
      'impact' : setImpact-impact
    })
  });

  swal("Sent Request!",  "Contact : "  + publisher_name + " - " + publisher_number, "success");
}

function getContactOptions(loc) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
        var ngoKey = data.key;
        var html = "";
        firebase.database().ref('ngos/' + ngoKey + '/contacts/').on('child_added', function(data){
          console.log(data.val());
          if(loc == data.val().contact_location) {
            html += '<option value="' + data.key + '">' + data.val().contact_name + ' - ' + data.val().contact_phone + '</option>';
          }
        });

        document.getElementById('ngo-contact').innerHTML = html;
      });
    } else {
      window.location = "./login.html";
      console.log("user not signed in");
    }
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    ;
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});

window.addEventListener('load', function() {
  console.log('Loaded');
  var user = firebase.auth().currentUser;
  firebase.database().ref('feed').on('child_added', function(data) {
    console.log("Impact : " + data.val().impact);
    dat = {
      'title'           : data.val().title,
      'desc'            : data.val().desc,
      'address'         : data.val().address,
      'region'          : data.val().region,
      'expire_time'     : data.val().expire_time,
      'publisher_name'  : data.val().publisher_name,
      'impact'          : data.val().impact
    };
    loadEvent(user, data.key, dat);
    console.log(data.val());
  });
}, false);
