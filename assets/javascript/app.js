

//initialize firebase
var config = {
    apiKey: "AIzaSyD6bL4Gew4VIi6fn3wlYtuTqzvnddHsATo",
    authDomain: "train-times-project.firebaseapp.com",
    databaseURL: "https://train-times-project.firebaseio.com",
    storageBucket: "train-times-project.appspot.com",
    messagingSenderId: "786911484838"
  };

  firebase.initializeApp(config);
  

//global variables
	var database = firebase.database();
	var name = "";
	var destination = "";
	var frequency = 0;
	var nextArrival = 0;
	var minAway = 0;
	var firstTrain = "";
	var now = moment();

//click functions

	$('#addTrainButton').on('click', function(){

		name = $('#trainLineInput').val().trim();
		console.log(name);

		destination = $('#trainDestinationInput').val().trim();
		console.log(destination);

		frequency = $('#trainFrequencyInput').val();
		console.log(frequency);

		firstTrain = $('#firstTimeInput').val();
		console.log(firstTrain);

	//first time
	
		var firstTimeConverted = moment(firstTrain, 'hh:mm').subtract(0, "years");
		console.log(firstTimeConverted);

	//difference between times

		var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
		console.log(diffTime);

	//minutes away

		var tRemainder = diffTime % frequency;
		console.log(tRemainder)

		var minAway = frequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + minAway);

	//next arrival calculation

		nextArrival = moment().add(minAway, 'm').format('hh:mm A')
		console.log("ARRIVAL TIME:" + nextArrival);

//append to table

	$('.table').append('<tr>' +

		'<td>'+name+'</td>'+
		'<td>'+destination+'</td>'+
		'<td>'+now.format('hh:mm A')+'</td>'+
		'<td>'+frequency+'</td>'+
		'<td>'+nextArrival+'</td>'+
		'<td>'+minAway+'</td>');

//temp object to hold train data

	var trainData = {
		name: name,
		destination: destination,
		frequency:frequency,
		minAway:minAway,
		firstTrain:firstTrain
	}

//push to firebase

	database.ref().push(trainData);

//clear data

	$('#trainLineInput').val('');
	$('#trainDestinationInput').val('');
	$('#trainFrequencyInput').val('');
	$('#firstTimeInput').val('');

return false;

	});

//When info is added

	database.ref().on('child_added', function(snapshot, prevChildKey){
		var newPost = snapshot.val();
		$('#trainTable').append(newPost);
	})
