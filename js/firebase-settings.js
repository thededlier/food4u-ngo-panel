function fetchData(user) {
  firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
    ngoKey = data.key;
    document.getElementById('ngo-name').value     = data.val().ngo_name;
    document.getElementById('ngo-email').value    = data.val().ngo_email;
    document.getElementById('ngo-phone').value    = data.val().ngo_phone;
    document.getElementById('website').value      = data.val().website;
    document.getElementById('ngo-size').value     = data.val().size;
  });
}

function clickContact() {
  $("#addContactModal").modal();
}

function addContact() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
        ngoKey = data.key;

        contactKey = firebase.database().ref('ngos/' + ngoKey + '/contacts').push().key;

        var name      = document.getElementById('contact-name').value;
        var phone     = document.getElementById('contact-phone').value;
        var location  = document.getElementById('contact-loc').value;

        var postContact = {
          'contact_name'      : name,
          'contact_phone'     : phone,
          'contact_location'  : location
        };

        console.log(postContact);
        var updates = {};
        updates['ngos/' + ngoKey + '/contacts/' + contactKey] = postContact;

        $("#addContactModal").modal("hide");
        console.log('Contact Added')
        return database.ref().update(updates);
      });
    } else {
      window.location = "./login.html";
      console.log("user not signed in");
    }
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    fetchData(user);
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});

window.addEventListener('load', function() {
  console.log('Loaded');
}, false);
