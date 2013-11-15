function successCallback(position) {
	console.log("Got position:");
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
}

function errorCallback(error) {
	console.log("Got error:");
	console.log(error);
}

Pebble.addEventListener("ready", function(e) {
	console.log("Hello world! - Sent from your javascript application.");

	var intervalID = setInterval(function() {
		console.log("Getting lat/long");
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, 10000);

	console.log("And in theory, everything should be set up");
});

