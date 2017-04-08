function createDeposit() {
  user = firebase.auth().currentUser;

  var postData = {
    'email'         : user.email,
    'title'         : document.getElementById('deposit-name').value,
    'desc'          : document.getElementById('deposit-desc').value,
    'contact'       : document.getElementById('deposit-contact').value,
    'start'         : document.getElementById('start-time').value,
    'end'           : document.getElementById('end-time').value,
    'region'        : document.getElementById('location').value,
    'address'       : document.getElementById('address').value
  }

  var newDepositKey = database.ref().child('deposit').push().key;

  var updates = {};
  updates['/deposit/' + newDepositKey] = postData;

  console.log('Created Deposit');
  swal("Deposit Site Created Successfully", "", "success");
  return database.ref().update(updates);
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
}, false);
