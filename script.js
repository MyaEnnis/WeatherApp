let temperatureCelsius = null;
let isCelsius = true;

async function getWeather()
{
    const city = document.getElementById('city').value.trim();
    console.log("Searching for city:", city);
    if(!city)
    {
        alert('Please enter a city');
        return;
    }

    try
    {
        const response = await fetch('./weather.json');
        if(!response.ok)
        {
            throw new Error(`HTTP Error Status: ${response.status}`);  
        }

        const data = await response.json();
        console.log("Fetched data:",data);

        const cityData = data.find(item => item.cityName.toLowerCase().trim() === city.toLowerCase().trim());
        console.log("Found city data:", cityData);

        if(cityData)
        {
            displayWeather(cityData);
        }
        else
        {
            alert('City not found in weather data.')
        }
    } 
    catch (error)
    {
        console.error('Error fetching weather data:', error); 
    }
}

function displayWeather(data)
{
    if(document.getElementById('temperature-data'))
    {
        temperatureCelsius = data.temperatureCelsius;
        updateTemperature();
    }

    if(document.getElementById('humidity-data'))
    {
        const humidityData = document.getElementById('humidity-data');
        humidityData.textContent = `${(data.humidity*100).toFixed(1)}%`;
    }

    if(document.getElementById('uv-data'))
    {
        const uvData = document.getElementById('uv-data');
        uvData.textContent = data.uvIndex;
    }

    if(document.getElementById('WindSpeed-data'))
    {
        const windSpeedData = document.getElementById('WindSpeed-data');
        windSpeedData.textContent = data.windSpeed;
    }
   
  updateIconColors(data);
}

function updateIconColors(data)
{
    console.log("Updating icon colors with data:", data);

    const thermometerIcon = document.getElementById('thermometer-icon');
    if(thermometerIcon)
    { 
     if (data.temperatureCelsius > 20) 
       {
         thermometerIcon.style.color = '#f54366ff';
       } 
      else
       {
         thermometerIcon.style.color = '#76b4c9';
       }
    }
    const dropIcon = document.getElementById('drop-icon');
    if(dropIcon)
    { // Humidity icon
        if (data.humidity > 0.7) 
        {
            dropIcon.style.color = '#333b67';
        } else 
        {
            dropIcon.style.color = 'rgba(146, 155, 255, 0.88)';
        }
    }
    const sunIcon = document.getElementById('sun-icon');
    if(sunIcon)
    {// UV Index icon
      if (data.uvIndex > 5) 
       {
          sunIcon.style.color = 'orange';
       } 
       else 
       {
         sunIcon.style.color = 'hsla(60, 100%, 76%, 0.88)';
       } 
    }
    const windIcon = document.getElementById('wind-icon');
    if(windIcon)
    {
        console.log("Wind Speed", data.windSpeed);
        const windSpeedValue = parseInt(data.windSpeed);
        console.log("Parsed Wind Speed:",windSpeedValue);
        if (windSpeedValue> 20)
        {
           windIcon.style.color = 'rgba(80, 81, 95, 0.88)';
        } 
        else 
        {
          windIcon.style.color = 'lightgray';
        }
    }
}

if(document.getElementById('temperature-data'))
{
    updateTemperature();
}

function updateTemperature()
{
    const temperatureData = document.getElementById('temperature-data');
    if(temperatureCelsius === null)
    {
       temperatureData.textContent = "--°C";
    }
    else if(isCelsius)
    {
        temperatureData.textContent = `${temperatureCelsius}°C`;
    }
    else
    {
        const temperatureFahrenheit = (temperatureCelsius * 9/5) + 32;
        temperatureData.textContent = `${temperatureFahrenheit.toFixed(1)}°F`;
    }
}

function toggleUnit() {
    
    const toggleLabel = document.getElementById('toggle-label');

    isCelsius = !isCelsius;

    updateTemperature();

    toggleLabel.textContent = isCelsius ? "Switch to Fahrenheit" : "Switch to Celsius";
    
}

