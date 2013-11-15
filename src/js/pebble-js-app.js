Pebble.addEventListener("ready", function(e) {
	console.log("Hello world! - Sent from your javascript application.");

	var intervalID = setInterval(function() {
		console.log("Getting lat/long");
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, 10000);

	console.log("And in theory, everything should be set up");
});

function successCallback(position) {
	console.log("Got position:");
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log(latitude);
	console.log(longitude);

	data = {
		"1": String(latitude),
		"2": String(longitude)
	};
	Pebble.sendAppMessage(data, ackHandler, nackHandler)
}

function errorCallback(error) {
	console.log("Got error:");
	console.log(error);
}

function ackHandler(e) {
	console.log("Message sent to pebble successfully");
}

function nackHandler(e) {
	console.log("Error sending message to pebble");
	console.log(JSON.stringify(e, null, 4));
}
