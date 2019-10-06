const request = require('request')

const geocode = (adresse, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + adresse + '.json?access_token=pk.eyJ1IjoiZ3VpbGxhdW1lZTU5IiwiYSI6ImNrMHhxeGwzczA4cnczam83aW9qaXF5ZWsifQ.aVlksp8_6Nl254pIBOWLLQ&limit=1'

    request({ url, json: true }, (error, {body} = {}) => {
        
        if (error) {
            callback('impossible de se connecter au service de localisation.', undefined)
        } else if (body.features.length === 0) {
            callback('Impossible de trouver cette localisation, essayez en une autre.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode