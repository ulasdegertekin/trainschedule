
var config = {
    apiKey: "AIzaSyDgZxAE-9ABbXZWNbX-M0fpwIPyT8AYNWM",
    authDomain: "tcdd-train-schedule.firebaseapp.com",
    databaseURL: "https://tcdd-train-schedule.firebaseio.com",
    projectId: "tcdd-train-schedule",
    storageBucket: "tcdd-train-schedule.appspot.com",
    messagingSenderId: "911875663135"
};

firebase.initializeApp(config);

var database = firebase.database();

var trName = "";
var trDestin = "";
var firstTr = "";
var freqTr = "";
var nextArrival = "";
var nextArrTime= ""
var minAway = "";
var firstTrTime= "";
var currentTime= "";
var remainTime= "";
var timeDifference= "";



$("#train-form").on("submit", function (event) {
    event.preventDefault();

    trName = $("#train-name").val().trim();
    trDestin = $("#destination-name").val().trim();
    firstTr = $("#train-time").val().trim();
    freqTr = $("#frequency-min").val().trim();
    console.log(trName);
    console.log(trDestin);
    console.log(firstTr);
    console.log(freqTr);
    
    firstTrTime = moment(firstTr, "hh:mm").subtract(1, "years");
    currentTime = moment();
    timeDifference = moment().diff(moment(firstTrTime), "minutes");
    remainTime = timeDifference % freqTr;
    minAway = freqTr - remainTime;
    nextArrival = moment().add(minAway, "minutes");
    nextArrTime = moment(nextArrival).format("hh:mm");
    
    database.ref().push({
        trName: trName,
        trDestin: trDestin,
        freqTr: freqTr,
        nextArrival: nextArrTime,
        minAway: minAway
    });

    // $("#train-name").value("");
    // $("#destination-name").value("");
    // $("#frequency-min").value("");
    // $("#nexttrain").value("");
    // $("#minaway").value("");
    // return false;
   


});

database.ref().on("child_added", function (snapshot) {
    $("#train-name").text(snapshot.val().trName);
    $("#destination-name").text(snapshot.val().trDestin);
    $("#frequency-min").text(snapshot.val().freqTr);
    $("#nexttrain").text(snapshot.val().nextArrival);
    $("#minaway").text(snapshot.val().minAway);

    // var firstTr= moment.unix(firstTr).format("hh:mm: ap");
    // console.log(moment(firstTr).format("hh:mm: ap"));
    var tBody = $("tbody");
    var tRow = $("<tr>");


    var trName = $("<td>").append(snapshot.val().trName);
    var trDestin = $("<td>").append(snapshot.val().trDestin);
    var freqTr = $("<td>").append(snapshot.val().freqTr);
    var nextArrival = $("<td>").append(snapshot.val().nextArrival);
    var minAway = $("<td>").append(snapshot.val().minAway);

    tRow.append(trName, trDestin, freqTr, nextArrival, minAway);
    tBody.append(tRow);
    console.log(snapshot.val());
    console.log(snapshot.val().trName);
    console.log(snapshot.val().trDestin);
    console.log(snapshot.val().freqTr);

    
    console.log(nextArrival);

});

