const openWeatherApiKey = "ed3486fa717dade80795e0620a2c18af";
const searchParams = new URLSearchParams(window.location.search);

const getIcon = (id) => {
	return `http://openweathermap.org/img/wn/${id}.png`;
};

if (localStorage.getItem("recent-searches") !== null) {
	const recentSearches = Object.values(
		JSON.parse(localStorage.getItem("recent-searches"))
	).slice(-10);
	const listWrapper = $("#recent-searches-list");
	recentSearches.forEach((search) => {
		const searchEl = $(`<a
		class="list-group-item list-group-item-action"
		aria-current="true">
	</a>`);
		searchEl.text(search);
		searchEl.attr("href", `${window.location.origin}?q=${search}`);
		listWrapper.append(searchEl);
	});
}

if (searchParams.has("q")) {
	const qLoc = searchParams.get("q");
	const queryLocURL = `http://api.openweathermap.org/geo/1.0/direct?q=${qLoc}&limit=1&appid=${openWeatherApiKey}`;

	fetch(queryLocURL)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const {lat, lon} = data[0];
			const queryForecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;
			const queryTodayURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${openWeatherApiKey}`;

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
						const subtitle = $(
							`<img class="bg-primary rounded-5" src=${iconUrl} />`
						);
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

			fetch(queryTodayURL)
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
		});
}

$("#button-search").on("click", () => {
	const searchTerm = $("#input-search").val();
	const queryParams = {q: searchTerm};
	const searchParams = new URLSearchParams(queryParams);
	const recentSearchesJson = localStorage.getItem("recent-searches");
	if (recentSearchesJson === null) {
		localStorage.setItem("recent-searches", JSON.stringify({1: searchTerm}));
	} else {
		const recentSearches = JSON.parse(recentSearchesJson);
		recentSearches[Object.keys(recentSearches).length + 1] = searchTerm;
		localStorage.setItem("recent-searches", JSON.stringify(recentSearches));
	}

	window.location.replace(
		`${window.location.origin}?${searchParams.toString()}`
	);
});
