import {    checkWeather,
            viewWather,
 } from "./function.js";

checkWeather()

// --- Нажимае на кнопку поиска
let button = document.querySelector('.search__btn')
button.onclick = () => {
    viewWather()
}

// --- Поиск по энтеру
let searchField = document.querySelector('#search__input')
searchField.addEventListener('keypress', function(event){
    if (event.keyCode == 13) {
        event.preventDefault(); // отменяем обновление
        viewWather()
    }
})