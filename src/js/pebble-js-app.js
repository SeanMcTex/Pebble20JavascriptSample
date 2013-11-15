Pebble.addEventListener("ready", function(e) {
	console.log("Hello world! - Sent from your javascript application.");

	var intervalID = setInterval(function() {
		console.log("Getting lat/long");
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, 10000);

	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

	console.log("And in theory, everything should be set up");
});

function successCallback(position) {
	console.log("Got position:");
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	console.log(latitude);
	console.log(longitude);

	getFoursquareData(latitude, longitude);
}

function getFoursquareData(latitude, longitude) {
	var queryString = "https://api.foursquare.com/v2/venues/search?ll=" + latitude + "," + longitude + "&limit=1&&client_id=SP2DN3CY5EBLVHIBZWTXYTLVGPBILJBLJ2VGIGHHRPIT3FKH&client_secret=ALC31KIBGEXM3VVB0OMQUY15BHTD5VV4DUNFBNTT3QMG53XQ&v=20131016";
	console.log("I'd like to ask foursquare this: " + queryString);

	var req = new XMLHttpRequest();
	req.open('GET', queryString, true);
	req.onload = function(e) {
		if (req.readyState == 4 && req.status == 200) {
			if (req.status == 200) {
				var response = JSON.parse(req.responseText);
				console.log("Got this from Foursquare: " + JSON.stringify(response, null, 4));
				console.log("4sq: " + response.response.venues[0].name);

				data = {
					"1": String(latitude),
					"2": String(longitude),
					"3": String(response.response.venues[0].name)
				};
				Pebble.sendAppMessage(data, ackHandler, nackHandler)

			} else {
				console.log("Error");
			}
		}
	}
	console.log("sending request to foursquare");
	req.send(null);

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
