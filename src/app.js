const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

// setup static directory to serve
app.get('', (req,res) => {
    res.render('index', {
         title: 'Weather App',
         name: 'myName'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
         title: 'About page new',
         name: 'myName'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
         title: 'Help page',
         name: 'myName'
    })
}) 

app.get('/weather',  (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must porvide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',  (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must porvide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[],
    }); 
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'myName',
        errorMessage: "article not found"
   })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'myName',
        errorMessage: "page not found"
   })
})


app.listen(port, () => {
    console.log('Server is up on port 3000!');
})