import $ from 'jquery';
import _ from 'lodash';
import getData from './scripts/get-data';

const citiesArray = [523920, 505120, 638242, 2459115, 44418];
const newCitiesArray = [];

function addUniqueItem(item) {
    if (newCitiesArray.indexOf(item) === -1) {
        console.log(item);
        newCitiesArray.push(item);
    }
}

while (newCitiesArray.length < 3) {
    addUniqueItem(_.sample(citiesArray));
}

console.log('newCitiesArray: ');
console.log(newCitiesArray);

getData('https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27chicago,%20il%27)&format=json', (data) => {
    console.log(data.query.results.channel.wind);
}, () => {
    console.log('errorCallback');
});

console.log(_.sample(citiesArray));

