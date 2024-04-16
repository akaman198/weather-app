document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    const cityInput = document.querySelector('.search-box input');

    const searchWeather = async () => {
        const APIKey = 'YOUR API KEY';
        const city = cityInput.value.toLowerCase();

        if (city === '') {
            return;
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
            const json = await response.json();

            if (json.cod === '404') {
                showError();
                return;
            }

            updateWeatherInfo(json);

        } catch (error) {
            console.error('Error fetching weather data:', error);
            showError();
        }
    };

    search.addEventListener('click', searchWeather);

    cityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });

    function showError() {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
    }

    function updateWeatherInfo(json) {
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // Reset styles and hide the error message
        container.style.height = '590px';
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear.png';
                break;
            case 'Rain':
                image.src = 'images/rain.png';
                break;
            case 'Snow':
                image.src = 'images/snow.png';
                break;
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            case 'Haze':
                image.src = 'images/mist.png';
                break;
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display = '';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
    }
});
