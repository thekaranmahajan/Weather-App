const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const locationn = document.querySelector("#location");
const temperature = document.querySelector("#temperature");
const wind_speed = document.querySelector("#wind_speed");
const humidity = document.querySelector("#humidity");
const weather_widget = document.querySelector(".weather-widget");
const widget_icon = document.querySelector("#widget-icon");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const search_location = search.value;

    fetch(window.location.host+'/weather?address='+search_location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                locationn.textContent = "Error";
                temperature.textContent = "--°C";
                humidity.textContent = "Humidity: --%";
                wind_speed.textContent = "Wind Speed: --km/h";

                weather_widget.style.backgroundColor = '#3498db';
                widget_icon.classList.remove("night-icon");
                widget_icon.textContent = "☁️";
            } else {
                locationn.textContent = data.location + ", " + data.country;
                    if(data.country_iso2) {
                        var image = document.createElement("img");
                        var imageParent = document.getElementById("location");
                        image.src = "https://flagsapi.com/"+ data.country_iso2 +"/flat/64.png";
                        image.style.height = "40px";
                        image.style.marginLeft = "4px";
                        imageParent.appendChild(image);
                    }

                temperature.textContent = data.temperature + "°C";
                humidity.textContent = "Humidity: " + data.humidity + "%";
                wind_speed.textContent = "Wind Speed: " + data.wind_speed + " km/h";

                    if(data.is_day == "no") {
                        weather_widget.style.backgroundColor = '#495057';
                        widget_icon.classList.add("night-icon");
                        widget_icon.textContent = "🌙";
                    } else {
                        weather_widget.style.backgroundColor = '#3498db';
                        widget_icon.classList.remove("night-icon");
                        widget_icon.textContent = "☀️";
                    }
            }
        });
    });
});


