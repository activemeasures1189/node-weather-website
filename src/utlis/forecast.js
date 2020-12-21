 const request = require('request');

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=200c0476817f9c67d6dee13052a93ced&query=' + latitude + ',' + longitude
    request({'url': url, 'json': true},(error, response) => {
        if(error){
            callback('Unable to connect', undefined);

        } else if(response.body.error){
            callback('Location not found', undefined);

        } else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out.")
        }
    });

}





module.exports = forecast;