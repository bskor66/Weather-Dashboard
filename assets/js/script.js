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

		const dailyDiv = $("#daily-wrapper");
		dailyForecast.forEach((day) => {
			const card = $('<div class="card" style="width: 15rem"></div>');
			const header = $('<div class="card-header"></div>');
			card.append(header);
			const title = $('<h5 class="card-title"></h5>');
			title.text("Date");
			header.append(title);
			const subtitle = $(
				'<h6 class="card-subtitle mb-2 text-body-secondary">Emoji</h6>'
			);
			subtitle.text("icon");
			header.append(subtitle);
			const list = $('<ul class="list-group list-group-flush"></ul>');
			card.append(list);
			const temp = $('<li class="list-group-item"></li>');
			temp.text("Temperature:");
			list.append(temp);
			const wind = $('<li class="list-group-item"></li>');
			wind.text("Wind:");
			list.append(wind);
			const humidity = $('<li class="list-group-item"></li>');
			humidity.text("Humidity:");
			list.append(humidity);
			dailyDiv.append(card);
		});
	});
