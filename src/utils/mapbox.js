const request = require('request');

const mapbox = (location, callback) => {
    const mapboxURL = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1Ijoia2FyaXNoNjYiLCJhIjoiY2x1eHlhcTZpMG81ODJrbWl4NXljeTI1OSJ9.Jz1z8rJk0kzZRuv1qCRb3A&limit=1`;

    request({ url: mapboxURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (!response.body.features.length) {
            callback('Unable to find the location. Try another search.', undefined);
        } else {
            const data = {
                latitude : response.body.features[0].geometry.coordinates[1],
                longitude : response.body.features[0].geometry.coordinates[0],
                address : response.body.features[0].properties.full_address
            }
            console.log(`The latitude is ${data.latitude} and the longitude is ${data.longitude}`);
            console.log(`Address : ${data.address}`);
            callback(undefined, data);           
        }
    });
}

module.exports = mapbox;

/* encodeURIComponent - The ? becomes %3F **/