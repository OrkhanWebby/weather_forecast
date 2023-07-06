// TARGETING ELEMENTS FROM HTML
let upperCont = document.querySelector(".upper-count");
let lowerCont = document.querySelector(".lower-count");
let input = document.querySelector("input");
let mainContainer = document.querySelector(".main-container");
let additionalInfo = document.querySelector(".additional-info");

// THE MAIN FUNCTION
function getCityData(city) {
	// STEP 1
	const xhr = new XMLHttpRequest();

	// STEP 2
	xhr.open(
		"GET",
		`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=dc1695ffcecd1bafca37eadb0cc41a5b`
	);

	// STEP 4
	xhr.addEventListener("readystatechange", function () {
		if (xhr.readyState === xhr.DONE && xhr.status === 200) {
			const info = JSON.parse(xhr.responseText);
			document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1280x720/?${city},city)`;
			document.body.classList.add("background");
			document.body.classList.add("body-responsive");

			let c = info.list.length;
			// LOOPING THROUGH THE ELEMENTS FOR RETRIVING THE INFORMATION
			// INCREMENT I BY 8 SINCE 24/3 = 8 (DATA IS IN 3 HOURS INCREMENTS)
			for (let i = 0; i < c; i += 8) {
				// USING THE 'IF' CONDITION FOR RETRIEVING THE INFORMATION FOR THE FIRST PART
				if (i == 0) {
					// ADDING THE BACKGROUND TO THE UPPER CONTAINER
					upperCont.classList.add("upper-container-background");

					// FOR GETTING THE CITY NAME
					let cityName = document.createElement("h1");
					cityName.textContent = info.city.name;
					upperCont.appendChild(cityName);

					// FUNCTION FOR GETTING DAY OF THE WEEK
					function getDayName(dayName) {
						let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
						return weekdays[dayName];
					}

					// FOR GETTING THE DAY OF THE WEEK (USING THE 'getDayName' FUNCTION)
					let date = new Date(`${info.list[i].dt_txt}`);
					let dayName = date.getDay();
					let weekday = document.createElement("h1");
					weekday.textContent = getDayName(dayName);
					upperCont.appendChild(weekday);

					// FOR GETTING THE ICON
					let icon = document.createElement("img");
					icon.src = `https://openweathermap.org/img/wn/${info.list[i].weather[0].icon}.png`;
					upperCont.appendChild(icon);

					// FOR GETTING THE TEMPERATURE INFO
					let temp = document.createElement("h1");
					temp.textContent = `${parseInt(info.list[i].main.temp)}°`;
					upperCont.appendChild(temp);

					// FOR GETTING THE DESCRIPTION ABOUT THE WEATHER
					let weatherState = document.createElement("h1");
					weatherState.textContent = info.list[i].weather[0].description;
					upperCont.appendChild(weatherState);

					// TARGETING A NEW CONTAINER FOR ADDING THE INFORMATION
					upperCont.appendChild(additionalInfo);

					// CREATING SPAN FOR THE 'WIND' INFORMATION
					let windSpan = document.createElement("span");
					windSpan.textContent = `Wind: ${info.list[i].wind.speed} m/s`;
					additionalInfo.appendChild(windSpan);

					// CREATING SPAN FOR THE 'PRESSURE' INFORMATION
					let pressure = document.createElement("span");
					pressure.textContent = `Pressure: ${info.list[i].main.pressure} hPA`;
					additionalInfo.appendChild(pressure);

					// CREATING SPAN FOR THE 'HUMIDITY' INFORMATION
					let humidity = document.createElement("span");
					humidity.textContent = `Humidity: ${info.list[i].main.humidity}%`;
					additionalInfo.appendChild(humidity);

					// CREATING SPAN FOR THE 'CLOUDINESS' INFORMATION
					let cloudiness = document.createElement("span");
					cloudiness.textContent = `Cloudiness: ${info.list[i].clouds.all}%`;
					additionalInfo.appendChild(cloudiness);
				} else {
					// FOR ADDING THE INFORMATION TO THE REMAINING CONTAINERS

					// CREATING LOWER CONTAINERS
					let div = document.createElement("div");
					div.className = "week-day";
					lowerCont.appendChild(div);

					// FOR GETTING THE DAY OF THE WEEK (USING THE 'getDayName' FUNCTION)
					let date = new Date(`${info.list[i].dt_txt}`);
					let dayName = date.getDay();
					let weekday = document.createElement("h1");
					weekday.textContent = getDayName(dayName);
					div.appendChild(weekday);

					// FOR GETTING THE ICON
					icon = document.createElement("img");
					icon.src = `https://openweathermap.org/img/wn/${info.list[i].weather[0].icon}.png`;
					div.appendChild(icon);

					// FOR GETTING THE TEMPERATURE INFO
					temp = document.createElement("h1");
					temp.textContent = `${parseInt(info.list[i].main.temp)}°`;
					div.appendChild(temp);

					// FOR GETTING THE DESCRIPTION ABOUT THE WEATHER
					weatherState = document.createElement("h1");
					weatherState.textContent = info.list[i].weather[0].description;
					weatherState.classList.add("week-day-description");
					div.appendChild(weatherState);

					lowerCont.appendChild(div);
				}
			}
			// document.body.replaceChild(mainContainer.cloneNode(true), mainContainer);
		} else if (xhr.readyState === xhr.DONE && xhr.status === 404) {
			// WHEN THE INPUT IS INVALID
			let imageInvalid = document.createElement("h1");
			imageInvalid.textContent = ":'(";
			imageInvalid.classList.add("invalid");
			upperCont.appendChild(imageInvalid);
			upperCont.classList.add("upper-container-background");
			let invalid = document.createElement("h1");
			invalid.textContent = "404 NOT FOUND";
			invalid.classList.add("invalid");
			upperCont.appendChild(invalid);
		}
	});
	// STEP 3
	xhr.send(null);

	// FOR CLEARING THE DATA, AND NOT ADDING THE NEW DATA WHEN THE DATA IS ALREADY RETRIVED
	upperCont.innerHTML = "";
	lowerCont.innerHTML = "";
	additionalInfo.innerHTML = "";
}

// CREATING THE EVENT FOR THE INPUT SPACE
input.addEventListener("keyup", function (e) {
	if (e.key === "Enter") {
		let location = input.value.toLowerCase();
		getCityData(location);
		input.value = "";
	}
});
