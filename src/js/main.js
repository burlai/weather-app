import $ from 'jquery';
import getData from './scripts/get-data';

getData('https://query.yahooapis.com/v1/public/yql?q=select%20wind%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27chicago,%20il%27)&format=json', (data) => {
    console.log(data.query.results.channel.wind);
}, () => {
    console.log('errorCallback');
});
