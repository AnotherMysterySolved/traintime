$(document).ready(function() {

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

    var minutesAway = 0;
    var trainName = "";
    var destination = "";
    var firstTrain = 0;
    var frequency = 0;


    // Capture Button Click
    $("#submit-btn").on("click", function(event) {
        event.preventDefault();

        // Grabbed values from text boxes
        trainName = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        // Code for handling the push
        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        //empty the form
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");
    });

    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    database.ref().on("child_added", function(childSnapshot) {

        var nameVar = childSnapshot.val().name;
        var destinationVar = childSnapshot.val().destination;
        var firstTrainVar = childSnapshot.val().firstTrain;
        var frequencyVar = childSnapshot.val().frequency;

        //current time - first train time (in minutes)
        var differenceTimes = moment().diff(moment(firstTrainVar, "HH:mm"), "minutes");
        //if > 0, get remainder and subtract from frequency = hoursMinsAway. hoursMinsAway + current time = nextArrival
        if (differenceTimes > 0) {
            var remainder = differenceTimes % frequencyVar;
            var hoursMinsAway = frequencyVar - remainder;
            var nextArrival = moment().add(hoursMinsAway, "m").format("HH:mm");
        }
        //nextArrival = firstTrainVar. Make differenceTimes positive and add to current time = hoursMinsAway
        else {
            var nextArrival = firstTrainVar;
            var positiveNum = differenceTimes * -1;
            var hoursMinsAway = moment.utc().startOf('day').add(positiveNum, 'minutes').format('HH:mm');
        }


        //Push to DOM
        var tableRow = $("<tr>");
        tableRow.attr("data-key", childSnapshot.key);
        var tableTrainName = $("<td>" + childSnapshot.val().name + "</td>");
        var tableDestination = $("<td>" + childSnapshot.val().destination + "</td>");
        var tableFrequency = $("<td>" + childSnapshot.val().frequency + "</td>");
        var tableNextArrival = $("<td>" + nextArrival + "</td>");
        var tableMinutesAway = $("<td>" + hoursMinsAway + "</td>");

        tableRow.append(tableTrainName, tableDestination, tableFrequency, tableNextArrival, tableMinutesAway);
        $("tbody").append(tableRow);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code)


    });
});
