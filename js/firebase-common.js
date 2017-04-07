function goToSettings() {
  window.location = "./settings.html";
}

function goToIndex() {
  window.location = "./index.html";
}

function userSignOut() {
  firebase.auth().signOut();
}

// Change in auth state
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("user signed in");
    var display_name = user.email;
    document.getElementById('user-signed').innerHTML = display_name;
  } else {
    window.location = "./login.html";
    console.log("user not signed in");
  }
});
