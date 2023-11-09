const openWeatherApiKey = "ed3486fa717dade80795e0620a2c18af";

let city_name = "Hartford";
let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&&appid=${openWeatherApiKey}`;

fetch(queryURL)
	.then((response) => {
		return response.json();
	})
	.then((data) => console.log(data));
