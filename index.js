const apiKey = '7bb9b35cc693855543828b7927f507f0';
const apiUrl =
	'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const card = document.querySelector('.card');

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
	var data = await response.json();

	if (response.status == 404) {
		document.querySelector('.error').style.display = 'block';
		document.querySelector('.weather').style.display = 'none';
	} else {
		document.querySelector('.city').innerHTML = data.name;
		document.querySelector('.temp').innerHTML =
			Math.round(data.main.temp) + '°C';
		document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
		document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

		let colorGradient;
		switch (data.weather[0].main) {
			case 'Clouds':
				weatherIcon.src = 'images/clouds.png';
				card.style.background = `linear-gradient(160deg, #6e6ecb, #71a7f1, #a7c8f6)`;
				break;

			case 'Clear':
				weatherIcon.src = 'images/clear.png';
				card.style.background = `linear-gradient(135deg, #dccee2, #F5B041)`;
				break;

			case 'Rain':
				weatherIcon.src = 'images/rain.png';
				card.style.background = `linear-gradient(135deg, #0B3954,#4a7690 ,#696565)`;
				break;

			case 'Drizzle':
				weatherIcon.src = 'images/drizzle.png';
				card.style.background = `linear-gradient(175deg, #f4a65d,#eed4bb, #BBD2C5, #688497, #304352)`;
				break;

			case 'Mist':
				weatherIcon.src = 'images/mist.png';
				card.style.background = `linear-gradient(135deg, #F7CAC9, #92A8D1)`;
				break;

			case 'Snow':
				weatherIcon.src = 'images/snow.png';
				card.style.background = `linear-gradient(160deg,#e8ebee,#b2e7f1,#50c6de, #78dff3)`;
				break;

			default:
				weatherIcon.src = 'images/clouds.png';
				card.style.background = `linear-gradient(135deg, #F7CAC9, #92A8D1)`;
		}

		document.querySelector('.weather').style.display = 'block';
		document.querySelector('.error').style.display = 'none';
	}
}

searchBtn.addEventListener('click', () => {
	checkWeather(searchBox.value);
});

// Add the ENTER key event
document.addEventListener('keydown', (event) => {
	if (event.key == 'Enter') {
		checkWeather(searchBox.value);
	}
});
