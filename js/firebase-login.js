function signUpNewUser() {
  var name      = document.getElementById('name-register').value;
  var email     = document.getElementById('email-register').value;
  var password  = document.getElementById('password-register').value;
  var phone     = document.getElementById('phone-register').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  var newUserData = {
    'ngo-contact'   : '',
    'ngo-email'     : email,
    'ngo-name'      : name,
    'ngo-phone'     : phone
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
