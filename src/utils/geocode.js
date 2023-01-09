const request = require('postman-request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibWF5YW5rbWFsaGFuIiwiYSI6ImNsMnZzM2h5ZjBlcWIzZHFwcmtkd3RzbG0ifQ.1PxN3AKD8eZ6K8JhmwCr4Q&limit=1"

    request({ url, json: true}, (error, { body }) => {
        const res = body.features[0]
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: res.center[1],
                longitude: res.center[0],
                location: res.place_name
            })
        }
    })
}

module.exports = geocode