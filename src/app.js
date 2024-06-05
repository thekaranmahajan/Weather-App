const path = require('path');
const express = require('express');
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const wind_speed = require("./utils/wind-speed");


const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../templates/views');
const partialsDirPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Karan Mahajan"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Karan Mahajan"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        text: "This is help page",
        name: "Karan Mahajan"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide and Address value"
        });
    }

    forecast(req.query.address, (error, { location, country, country_iso2, humidity, temperature } = {}) => {
        if(error) {
            return res.send({error});
        } else {
            wind_speed(req.query.address, (error, { wind_speed, is_day } = {}) => {
                if(error) {
                    return res.send({error});
                } else {
                    return res.send({
                        location,
                        country,
                        country_iso2,
                        humidity,
                        temperature,
                        wind_speed: wind_speed,
                        is_day: is_day
                    });
                }
            });
        }
    });
});

app.get("/products", (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        });
    } else {
        res.send({
            products: []
        });
    }
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Karan Mahajan",
        errorMessage: "Help articles not found"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Karan Mahajan",
        errorMessage: "Page not found"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});