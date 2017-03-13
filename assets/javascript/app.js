// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWLlt3a2HfxtcuGW8IPfk7etsXhQtAmHI",
  authDomain: "firstproject-c5433.firebaseapp.com",
  databaseURL: "https://firstproject-c5433.firebaseio.com",
  storageBucket: "firstproject-c5433.appspot.com",
  messagingSenderId: "527205288560"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var nextArrival;
var minutesAway;

// Capture Button Click
$("#submit-btn").on("click", function(event) {
  console.log("done");
  event.preventDefault();

  // Grabbed values from text boxes
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#first-train").val().trim();
  var frequency = $("#frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  //console.log(childSnapshot.val().name);
  //console.log(childSnapshot.val().role);
  //console.log(childSnapshot.val().startDate);
  //console.log(childSnapshot.val().monthlyRate);

  //Start date math
  // numMonths = (moment().diff(moment(childSnapshot.val().startDate), 'months'));
  // console.log(numMonths);

  // totalBilled = numMonths * childSnapshot.val().monthlyRate;


  var tableRow = $("<tr>");
  tableRow.attr("data-key", childSnapshot.key);
  var tableName = $("<td>"+childSnapshot.val().name+"</td>");
  var tableRole = $("<td>"+childSnapshot.val().role+"</td>");
  var tableStartDate = $("<td>"+childSnapshot.val().startDate+"</td>");
  var tableWorked = $("<td>"+numMonths+"</td>");
  var tableMonthlyRate = $("<td>"+childSnapshot.val().monthlyRate+"</td>");
  var tableBilled = $("<td>"+totalBilled+"</td>");
  tableRow.append(tableName,tableRole,tableStartDate,tableWorked,tableMonthlyRate,totalBilled);
  $("tbody").append(tableRow);


});