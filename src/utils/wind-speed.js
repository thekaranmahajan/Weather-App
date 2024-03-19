const request = require("request");
const dotenv = require('dotenv');
dotenv.config({path: ".././.env"});
const api_key = process.env.API_KEY;

const askWindSpeed = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key="+api_key+"&query="+location;

    request({url: url, json: true}, (err, res) => {
        if(res.body.success === false) {
            callback(res.body.error.info, undefined);
        } else {
            // const data = "The wind speed is " + res.body.current.wind_speed + ".";

            const data = {
                wind_speed: res.body.current.wind_speed,
                is_day: res.body.current.is_day
            }

            callback(undefined, data);
        }
    });
};

module.exports = askWindSpeed;