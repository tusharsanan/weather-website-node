const request = require('request');

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidHVzaGFyc2FuYW4iLCJhIjoiY2s3ampkeXh2MHUzdTNwbnhraWFma2RudSJ9.Ix2H8Q2pnuDfihBOS2jzWw&limit=1';

    request({ url: url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (!body.features.length)  {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0] | null,
                longitude: body.features[0].center[1] || null,
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
