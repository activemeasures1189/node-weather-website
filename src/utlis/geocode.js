const request = require('request');

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FiYnkxOTg5IiwiYSI6ImNraWtlZzU5dzA4eTQydG84N2V4MXNudHcifQ.O-0iFgxN1mgn65YKWgZU4w&limit=1'
    request({'url': url, 'json': true}, (error, response) => {
        if (error){
            callback('Unable to connect!', undefined)
 }else if(response.body.features.length === 0){
     callback('Try again', undefined);

 } else{
     callback(undefined, {
         latitude: response.body.features[0].center[1],
         longitude: response.body.features[0].center[0],
         location: response.body.features[0].place_name
     });
 }
        
    });
}


module.exports = geocode;