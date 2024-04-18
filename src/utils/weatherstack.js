const request = require('request');

const weatherstack = (latitude, longitude, callback) => {
    const weatherstackURL = `http://api.weatherstack.com/current?access_key=91e551b1f14f2a170d05b9610701c955&query=${latitude},${longitude}&units=m`;

    request({ url: weatherstackURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            const current = response.body.current;
            const str = `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees. It feels like ${current.feelslike} degrees out.`;
            console.log(str);
            callback(undefined, str);
        }
    });
}

module.exports = weatherstack;
