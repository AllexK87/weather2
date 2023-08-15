import {    checkWeather,
            viewWather,
 } from "./function.js";

// checkWeather()

function style () {
    document.querySelector('.header').style.height = '100%'
    document.querySelector('.search').style.flex = '1 1 auto'
    document.querySelector('.main').style.display = 'block'
}

// --- Нажимае на кнопку поиска
let button = document.querySelector('.search__btn')
button.onclick = () => {
    viewWather()
    style()
}

// --- Поиск по энтеру
let searchField = document.querySelector('#search__input')
searchField.addEventListener('keypress', function(event){
    if (event.keyCode == 13) {
        event.preventDefault(); // отменяем обновление
        viewWather()
        style()
    }
})