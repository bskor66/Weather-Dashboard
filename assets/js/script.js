const openWeatherApiKey = "ed3486fa717dade80795e0620a2c18af";

let lat = "40";
let lon = "50";
let queryURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;

fetch(queryURL)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		const location = data.city.name;
		const forecast = data.list;
		let dailyForecast = [];
		for (i = 0; i < forecast.length; i = i + 8) {
			dailyForecast.push(forecast[i]);
		}
		console.log(dailyForecast);
	});
