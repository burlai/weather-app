import $ from 'jquery';
import getData from './scripts/get-data';
import buildNewArray from './scripts/array-operations';

const citiesArray = [523920, 505120, 638242, 2459115, 44418]; // Array of 5 cities id's
let newCitiesArray = [];
const apiUrlFirstPart = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D';
const apiUrlLastPart = '%20and%20u%3D%27c%27&format=json';
const $cityLinkSelector = $('.js-city-link');
const $weatherInfoSelector = $('.js-weather-info');
const $temperatureSelector = $('.js-temperature');
const $descriptionSelector = $('.js-description');
const $iconSelector = $('.js-weather-icon');
const $citiesUpdatedMessage = $('.js-cities-updated');

function updateWeatherData() {
    $cityLinkSelector.each(function (i) {
        $(this).attr('href', `https://www.yahoo.com/news/weather/country/state/city-${newCitiesArray[i]}`); // Set links for cities buttons
        getData(`${apiUrlFirstPart} ${newCitiesArray[i]} ${apiUrlLastPart}`, (data) => { // Set text for cities buttons
            $(this).html(data.query.results.channel.location.city);
        });
    });

    $weatherInfoSelector.each(function (i) {
        getData(`${apiUrlFirstPart} ${newCitiesArray[i]} ${apiUrlLastPart}`, (data) => {
            $(this).find($temperatureSelector) // Filling temperature values
                .html(data.query.results.channel.item.condition.temp)
                .append('<span class="content_celcius">&deg</span>');
            $(this).find($descriptionSelector) // Filling description values
                .html(data.query.results.channel.item.condition.text);
            $(this).find($iconSelector) // Add weather icons
                .attr('src', `http://l.yimg.com/a/i/us/we/52/${data.query.results.channel.item.condition.code}.gif`);
        });
    });
}

buildNewArray(newCitiesArray, citiesArray);
updateWeatherData();

setInterval(() => {
    updateWeatherData();
}, 10000);

setInterval(() => {
    newCitiesArray = [];
    buildNewArray(newCitiesArray, citiesArray);
    updateWeatherData();
    $citiesUpdatedMessage.fadeIn(500).fadeOut(3000);
}, 60000);

