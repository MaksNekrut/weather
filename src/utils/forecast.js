const request = require('request');


const forecast = (latitude,longitude, callback) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=3f3548c5971b43f18f3183713210305&q=${latitude},${longitude}`;

    request({url, json:true}, (error,{body}) => {
        if(error) {
            callback('unable to connect', undefined);
        }else if(body.error) {
            callback('unable to find', undefined);
        }else {
            const responded = `It is currently ${body.current.temp_c}C, and wind ${body.current.wind_kph}kph`
            callback(undefined, responded);
        }
    })
}


// const forecast = (latitude,longitude, callback) => {
//     const url = `http://api.weatherapi.com/v1/current.json?key=3f3548c5971b43f18f3183713210305&q=${latitude},${longitude}`;

//     request({url:url, json:true}, (error,response) => {
//         if(error) {
//             callback('unable to connect', undefined);
//         }else if(response.body.error) {
//             callback('unable to find', undefined);
//         }else {
//             const responded = `It is currently ${response.body.current.temp_c}C, and wind ${response.body.current.wind_kph}kph`
//             callback(undefined, responded);
//         }
//     })
// }


module.exports = forecast;