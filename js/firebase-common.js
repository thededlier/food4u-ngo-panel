function goToSettings() {
  window.location = "settings.html";
}

function userSignOut() {
  firebase.auth().signOut();
}

// Change in auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user signed in");
    var display_name;

    database.child('ngos').orderByChild('email').equalTo(user.email).on('child_added', function(data) {
      display_name = data.value().email;
    });

    console.log(display_name);
    document.getElementById('user-signed').innerHTML = display_name;
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});
