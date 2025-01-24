
const cityInput = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');

const apiKey= "af87bf691e334c7706427d6ab2ed8552";

const countryTxt = document.querySelector('.card-title');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.image-item-weather');
const descreptionTxt = document.querySelector('.description-txt');
const humidityValueTxt = document.querySelector('.humidity-value');
const dewValu = document.querySelector('.dew-value');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDate = document.querySelector('.card-date');
const feelsLike = document.querySelector('.feels-value');
// const pressureValue = document.querySelector('.pressur-value');
// const sealevelValue = document.querySelector('.sea-value');


searchBtn.addEventListener('click',()=>{
    if(cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value) 
        cityInput.value=''
        cityInput.blur()
     
    }  
})
cityInput.addEventListener('keydown',(event)=>{
    if(event.key =='Enter'&&
        cityInput.value.trim() != '')
        {
        updateWeatherInfo(cityInput.value) 
        cityInput.value=''
        cityInput.blur()  
    }
    
})
async function getFetchData(endPoint,city){
    const apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl)
    return response.json()
}
function getweatherIcon(){
    if(id<=232) return 'thunderstorm.svg'
    if(id<=321) return 'drizzle.svg'
    if(id<=531) return 'rain.svg'
    if(id<=622) return 'snow.svg'
    if(id<=781) return 'atmosphere.svg'
    if(id<=800) return 'clear .svg'   
    else return 'clouds.svg'
}
async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather',city);
    console.log(weatherData)
//les valeurs importantes on les stocker dans des variables
    const {
        name : country,
        main: {temp,humidity,feels_like},
        weather:[{ id,main,description}],

    }=weatherData
    const now = new Date();
    currentDate.textContent = now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '°C';
    humidityValueTxt.textContent= humidity + '%';
    feelsLike.textContent=Math.round(feels_like)+'°C'
    descreptionTxt.textContent=description

    weatherSummaryImg.src = `img/img/weather${getweatherIcon(id)}`
}

// body.append(cityInput);
