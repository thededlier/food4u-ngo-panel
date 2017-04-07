function signUpNewUser() {
  var name      = document.getElementById('name-register').value;
  var email     = document.getElementById('email-register').value;
  var password  = document.getElementById('password-register').value;
  var phone     = document.getElementById('phone-register').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorMessage);
  });

  var newUserData = {
    'ngo_email'       : email,
    'ngo_name'        : name,
    'ngo_phone'       : phone,
    'impact_factor'   : 0,
    'orders_taken'    : 0,
    'size'            : 0
  };

  var newUserKey = database.ref().child('ngos').push().key;

  var updates = {};
  updates['/ngos/' + newUserKey] = newUserData;

  return database.ref().update(updates);
}


function signInUser() {
  var email     = document.getElementById('email-login').value;
  var password  = document.getElementById('password-login').value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

// On auth change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location = "index.html";
    console.log("user signed in");
  } else {
    console.log("user not signed in");
  }
});
