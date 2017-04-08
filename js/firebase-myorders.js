firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);

    var rootKey, eventKey, orderKey;
    var html='', contacts_html='', title, address, user_name, user_phone, contact_name, contact_phone;

    firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
      rootKey = data.key;
      firebase.database().ref('ngos/' + rootKey + '/orders/').on('child_added', function(data) {
        eventKey = data.key;

        firebase.database().ref('feed/' + eventKey).on('value', function(data) {
          console.log(data.val());
          title       = data.val().title;
          address     = data.val().address;
          user_name   = data.val().publisher_name;
          user_phone  = data.val().mobile;
          html = ""; contact_html = '';
          html +=
                  '<div class="card">' +
                    '<div class="card-content">' +
                      '<h2>' + title + '</h2>' +
                      '<h5> Name : ' + user_name + '</h5>' +
                      '<h5> Mobile Number : ' + user_phone + '</h5>' +
                      '<h3> Assigned Contacts </h3>';
          firebase.database().ref('feed/' + eventKey + '/ngos/' + rootKey).child('contacts').on('child_added', function(data) {
            // console.log(data.val());
            console.log(data.val());
            contact_name    = data.val().contact_name;
            contact_phone   = data.val().contact_number;

            contact_html +=
                    '<div class="assigned">' +
                      '<h5>' + contact_name + ' - ' + contact_phone + '</h5>' +
                    '</div>';

          });
          html +=   contact_html +
                  '</div>' +
                '</div>';

          var div = document.getElementById('order-feed');
          div.innerHTML += html;
        });
      });
    });
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});

window.addEventListener('load', function() {
  console.log('Loaded');
  var user = firebase.auth().currentUser;
}, false);
