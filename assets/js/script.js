const openWeatherApiKey = "ed3486fa717dade80795e0620a2c18af";

let lat = "40";
let lon = "50";
let queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;
let queryTodayUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;

const getIcon = (id) => {
	return `http://openweathermap.org/img/wn/${id}.png`;
};

fetch(queryForecastURL)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		const location = data.city.name;
		const forecast = data.list;
		console.log(forecast);
		let dailyForecast = [];
		for (i = 0; i < forecast.length; i = i + 8) {
			dailyForecast.push(forecast[i]);
		}

		const dailyDiv = $("#daily-wrapper");
		dailyForecast.forEach((day) => {
			const card = $('<div class="card" style="width: 15rem"></div>');
			const header = $('<div class="card-header"></div>');
			card.append(header);
			const title = $('<h5 class="card-title"></h5>');
			const date = dayjs(day.dt_txt);
			title.text(date.format("M/DD/YYYY"));
			header.append(title);
			const iconUrl = getIcon(day.weather[0].icon);
			const subtitle = $(`<img class="bg-primary rounded-5" src=${iconUrl} />`);
			subtitle.text("icon");
			header.append(subtitle);
			const list = $('<ul class="list-group list-group-flush"></ul>');
			card.append(list);
			const temp = $('<li class="list-group-item"></li>');
			temp.text(`Temperature: ${day.main.temp} °F`);
			list.append(temp);
			const wind = $('<li class="list-group-item"></li>');
			wind.text(`Wind: ${day.wind.speed} MPH`);
			list.append(wind);
			const humidity = $('<li class="list-group-item"></li>');
			humidity.text(`Humidity: ${day.main.humidity} %`);
			list.append(humidity);
			dailyDiv.append(card);
		});
	});

fetch(queryTodayUrl)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
		$("#current-location").text(
			`${data.name} (${dayjs().format("M/DD/YYYY")})`
		);
		$("#current-temp").text(`Temperature: ${data.main.temp} °F`);
		$("#current-icon").attr("src", getIcon(data.weather[0].icon));
		$("#current-wind").text(`Wind: ${data.wind.speed} MPH`);
		$("#current-humidity").text(`Humidity: ${data.main.humidity} %`);
	});
