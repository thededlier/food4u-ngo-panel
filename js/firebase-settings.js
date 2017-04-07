function fetchData(user) {
  firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
    ngoKey = data.key;
    console.log(data);
    document.getElementById('ngo-name').value     = data.val().ngo_name;
    document.getElementById('ngo-email').value    = data.val().ngo_email;
    document.getElementById('ngo-phone').value    = data.val().ngo_phone;
    document.getElementById('website').value      = data.val().website;
    document.getElementById('ngo-size').value     = data.val().size;
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
