const request = require('request');
const lookup = require('country-code-lookup');
const dotenv = require('dotenv');
dotenv.config({path: ".././.env"});

let country_code = undefined;

const api_key = process.env.API_KEY;

const askWeather = (location, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key="+api_key+"&query="+location;
    
    request({ url: url, json: true }, (err, res) => {
        if(res.body.success === false) {
            callback(res.body.error.info, undefined);
            // console.log(res.body.error.info);
        } else {
            // const data = "It is currently " + res.body.current.temperature + " degrees out in " + res.body.location.name + ", " + res.body.location.country + ". There is " + res.body.current.precip + " chance of rain.";
            
            if(res.body.location.country) {
                if(res.body.location.country == "United States of America") {
                    country_code = lookup.byCountry("United States");
                } else {
                    country_code = lookup.byCountry(res.body.location.country);
                }
            }

            res.body.location.country = (res.body.location.country == "United States of America") ? "USA" : res.body.location.country;
            res.body.location.country = (res.body.location.country == "United Arab Emirates") ? "UAE" : res.body.location.country;

            const data = {
                location: res.body.location.name,
                country: res.body.location.country,
                country_iso2: (country_code) ? country_code.iso2 : undefined,
                humidity: res.body.current.humidity,
                temperature: res.body.current.temperature
            }
            
            callback(undefined, data);
            
            // console.log("It is currently " + res.body.current.temperature + " degrees out. There is " + res.body.current.precip + " chance of rain.");
            // console.log("It is currently " + res.body.current.temperature + " degree but it feels like " + res.body.current.feelslike + " degrees.");
        }
    });
};

module.exports = askWeather;
