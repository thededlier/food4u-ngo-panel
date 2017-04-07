function fetchData(user) {
  firebase.database().ref().child('ngos').orderByChild('ngo_email').equalTo(user.email).on('child_added', function(data) {
    ngoKey = data.key;
    document.getElementById('ngo-email').value = data.val().ngo_email;
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user signed in");
    var display_name = user.email;
    document.getElementById('user-signed').innerHTML = display_name;
    fetchData(user);
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});

window.addEventListener('load', function() {
  console.log('Loaded');
}, false);
