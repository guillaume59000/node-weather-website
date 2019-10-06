const path = require('path')
const express = require('express')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup favicon
app.use(favicon(path.join(publicDirectoryPath,'/img','weather.png')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Guillaume EL HADI'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Guillaume EL HADI'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help page',
        name: 'Guillaume EL HADI'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Guillaume EL HADI'
    })
})

app.get('/weather', (req, res) => {
    
    if(!req.query.adress) {
        return res.send({
            error: 'Veuillez saisir une adresse valide.'
        })
    }
    
    geocode(req.query.adress,(error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error: error })
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({ error: error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        res.send({
            products :[
               
            ]
        })
    } else {
        res.send(req.query.search)
    }
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Guillaume EL HADI'
    })
})

app.listen(port, () => {
    console.log('Server is up on the port ' + port);
})