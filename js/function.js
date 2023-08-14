let citi = 'смоленск'
let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'

// --- напишет город
const writeCiti = () => {
    document.querySelector(".citi").innerHTML = citi
}

async function checkWeather() {
    // --- section weather
    const response = await fetch(url)
    let data = await response.json()
     
    console.log(data)

    // --- напишет город
    writeCiti()

    // --- День недели
    function getWeekDay (date) {
        let days = ['Воскресенье', 
                    'Понедельник', 
                    'Вторник', 
                    'Среда', 
                    'Четверг', 
                    'Пятница', 
                    'Суббота'];
        return days[date.getDay()]
    }

    // --- Укажет температуру
    let temperature = Math.round(data.main.temp)
    if (temperature > 0) {
        temperature = `+${temperature}`
    }
    document.querySelector('.weather__center__temperature').innerHTML = `${temperature} °C`

    // --- Покажет картинку
    let iconDescription = data.weather[0].main
    document.querySelector(".weather__center__figure__img").src = `img/${iconDescription}.png`

    // --- Описание погоды
    let description = data.weather[0].description
    document.querySelector('.weather__center__description').innerHTML = description

    // --- Ощущается как
    let feels = Math.round(data.main.feels_like)
    if (feels > 0) {
        feels = `+${feels}`
    }
    document.querySelector('.weather__details__feels__value').innerHTML = `${feels} °C`

    // ---Скорость ветра
    let wind = data.wind.speed
    document.querySelector('.weather__details__wind__value').innerHTML = `${wind} м/с`
    
    // --- Влажность
    let humidity = data.main.humidity
    document.querySelector('.weather__details__humidity__value').innerHTML = `${humidity} %`

    // --- Атмосферное давление
    let pressure = data.main.pressure
    pressure = Math.round(pressure * 0.75)
    document.querySelector('.weather__details__airPressure__value').innerHTML = `${pressure} мм рт. ст.`

    // --- Видимость
    let visibility = Math.round(data.visibility / 1000)
    document.querySelector('.weather__details__visibility__value').innerHTML = `${visibility} км.`

    // --- СЕКЦИЯ ПРОГНОЗА

    //  --- Получение координат города
    let lat = data.coord.lat
    let lon = data.coord.lon

    // -- Запрос на сервер
    let urlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad`
    
    const responseForecast = await fetch(urlForecast)
    let dataForecast = await responseForecast.json()

    console.log(dataForecast)

    // -- Удаляем секцию прогноза
    document.querySelector('.forecast').remove()

    // Добавляем секцию прогноза
    let forecastSection = document.createElement('section')
    forecastSection.classList = 'forecast'
    document.querySelector('.main').append(forecastSection)

    // -- Количествозначений в массиве
    let lengthDataForecast = dataForecast.list.length
    
    // --- Для цикла
    function start () {
        return 7
    }

    function step (i) {
        return i + 7
    }
    
    // Добавляем карточки прогноза
    for (let index = start(); index <= lengthDataForecast; index = step(index)) {
        let cardForecast = document.createElement('div')
        cardForecast.classList = 'forecast__card'
        cardForecast.dataset.id = index
        
        document.querySelector('.forecast').append(cardForecast)
    }

    // --- Добавляем день недели
    for (let index = start(); index <= lengthDataForecast; index = step(index)) {
        let dtTxt = dataForecast.list[index].dt_txt
        let Year = dtTxt.substring(0, 4)
        let Month = dtTxt.substring(5, 7) - 1
        let Day = dtTxt.substring(8, 10)
        let date = new Date(Year, Month, Day)
        let dayWeek = getWeekDay(date)

        let dayWeekCardForecast = document.createElement('p')
        dayWeekCardForecast.classList = 'forecast__card__day'
        dayWeekCardForecast.innerHTML = dayWeek

        document.querySelector(`[data-id = "${index}"]`).append(dayWeekCardForecast)
    }

        // --- Добавляем время
        for (let index = start(); index <= lengthDataForecast; index = step(index)) {
            let dtTxt = dataForecast.list[index].dt_txt
            
            let time = dtTxt.substring(11, 16)
    
            let timeCardForecast = document.createElement('p')
            timeCardForecast.classList = 'forecast__card__time'
            timeCardForecast.innerHTML = time
    
            document.querySelector(`[data-id = "${index}"]`).append(timeCardForecast)
        }

        // --- Добавляем картинку
        for (let index = start(); index <= lengthDataForecast; index = step(index)) {
            let imgCardForecast = document.createElement('img')
            imgCardForecast.src = `img/${dataForecast.list[index].weather[0].main}.png`
            imgCardForecast.classList = 'forecast__card__img'

            document.querySelector(`[data-id = "${index}"]`).append(imgCardForecast)
        }   
        
        // --- Добавляем температуру
        for (let index = start(); index <= lengthDataForecast; index = step(index)) {
            let tempCardForecast = document.createElement('p')
            tempCardForecast.classList = 'forecast__card__temp'
            let tempCard = Math.round(dataForecast.list[index].main.temp)
            if (tempCard > 0) {
                tempCard = `+${tempCard}`
            }
            tempCardForecast.innerHTML = `${tempCard} °`

            document.querySelector(`[data-id = "${index}"]`).append(tempCardForecast)
        }
}

// --- Посмотреть погоду
function viewWather () {
    citi = document.querySelector('#search__input').value

    url = 'https://api.openweathermap.org/data/2.5/weather?q=' + citi +'&units=metric&lang=ru&appid=2e86a32f9d29e13d3916a7ca8be036ad'

    checkWeather()

    document.querySelector('#search__input').value = ''
}


// --- Export
export {
    checkWeather,
    viewWather,
}