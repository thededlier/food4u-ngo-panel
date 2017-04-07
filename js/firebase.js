// Initialize Firebase
var config = {
  apiKey: "AIzaSyD8YVdYXsDRAjXZqmC-cZqSH6S5wVmfqno",
  authDomain: "food-save-app.firebaseapp.com",
  databaseURL: "https://food-save-app.firebaseio.com",
  projectId: "food-save-app",
  storageBucket: "food-save-app.appspot.com",
  messagingSenderId: "629221729413"
};
firebase.initializeApp(config);

var database = firebase.database();
