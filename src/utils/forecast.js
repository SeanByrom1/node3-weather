const request = require('request')

const forecast = (lat, lng, callback) => {
	const url = 'https://api.darksky.net/forecast/02d7420c4eeaf135d0aa18cb7420e7ca/' + lat + ',' + lng

	request ({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!')
		} else if (body.error) {
			callback('Unable to find location')
		} else {
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + 'The high is ' + body.daily.data[0].temperatureHigh) 
		}
	})
}

module.exports = forecast