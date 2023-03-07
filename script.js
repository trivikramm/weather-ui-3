const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");
const mapContainer = document.getElementById('map-container');
const map = document.getElementById("map");

const apiKey = "b1fcdd11dabd1065e7fa2353536ee9ed"; // Replace with your OpenWeatherMap API key

searchButton.addEventListener("click", () => {
    const cityName = searchInput.value;
    const searchValue = searchInput.value;
    mapContainer.querySelector('h2').textContent = `You searched for: " ${searchValue} "`;

    // Get weather information using OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherDescription = data.weather[0].description;
            const temperature = Math.round((data.main.temp) - 273.15) + " &deg;";
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            // Display weather information
            weatherInfo.innerHTML = `
        <p>Weather description: ${weatherDescription}</p>
        <p>Temperature: ${temperature} C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind speed: ${windSpeed} m/s</p>
      `;
            /*let videoUrl;
            if (temperature >= 30) {
                videoUrl = "https://example.com/hot-video.mp4";
            } else if (temperature >= 20) {
                videoUrl = "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/NIHmZbghlilb1qj7b/videoblocks-misty-nordic-forest-in-early-morning-with-fog_h08j0122p__e70f23f6ecfd507ee310663e628483e7__P360.mp4";
            } else if (temperature >= 10) {
                videoUrl = "https://example.com/cool-video.mp4";
            } else {
                videoUrl = "https://example.com/cold-video.mp4";
            }
            const video = document.getElementById("bg-video");
            const source = document.createElement("source");
            source.setAttribute("src", videoUrl);
            source.setAttribute("type", "video/mp4");
            video.innerHTML = ""; // Clear any existing source elements
            video.appendChild(source);
            video.load();
            video.play();*/

            // Display map using Google Maps API
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            const mapUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyCSmjuw4jVy3_D_IRBb4ulS4IXdp4PY_B8&center=${lat},${lon}&zoom=12`;
            map.innerHTML = `<iframe src="${mapUrl}" width="600" height="250" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
            const mapOptions = {
                zoom: 12,
                center: new google.maps.LatLng(lat, lon),
                styles: [{
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#ff0000',
                        weight: 2
                    }]
                }]
            };
            const mapInstance = new google.maps.Map(document.getElementById('map'), mapOptions);
            const marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lon),
                map: mapInstance,
                title: cityName
            });
            marker.setMap(mapInstance);



        })
        .catch(error => console.error(error));
});

/* Draw red line around searched location
            const lineCoordinates = [
                { lat: lat + 0.01, lng: lon + 0.01 },
                { lat: lat + 0.01, lng: lon - 0.01 },
                { lat: lat - 0.01, lng: lon - 0.01 },
                { lat: lat - 0.01, lng: lon + 0.01 },
                { lat: lat + 0.01, lng: lon + 0.01 }
            ];
            const redLine = new google.maps.Polygon({
                paths: lineCoordinates,
                strokeColor: '#ff0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#ff0000',
                fillOpacity: 0.35
            });
            redLine.setMap(mapInstance);*/