const request = require('request');


const geocode = (address, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibWFrc24tdGVjaCIsImEiOiJja284em5jeXYwcGF4MnBtdTExdm82azBlIn0.R-vVJoi_nGHhrbG8gEpCug`;

    request({url:url, json:true}, (error,{body}) => {
            if(error) {
                callback('unable connect', undefined);
            }else if(body.features.length === 0){
                callback('Unable find', undefined);
            }else{
                callback(undefined,{
                    latitude:body.features[3].center[1],
                    longitude:body.features[3].center[0],
                    location:body.features[0].place_name
                })
            }
    })
}



module.exports = geocode;