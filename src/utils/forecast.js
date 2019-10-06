const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/265879b4b89c3b537f5a1b4f0d39d9ab/' + longitude + ',' + latitude + '?lang=fr&units=si'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Impossible dee se connecter au service meteo.', undefined)
        } else if (body.error) {
            callback('Impossible de trouver la meteo de cette localisation.', undefined)
        } else {
            callback(undefined, body.daily.summary + ' La température actuelle est de ' + body.currently.temperature + ' degrès. Et il y a ' + body.currently.precipProbability + '% de chance de pluie.')
        }
    })
}

module.exports = forecast