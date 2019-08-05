const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Defines paths for Express config 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Sean Byrom'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Sean Byrom'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		helpText: 'help information',
		name: 'Sean Byrom'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Must provide an address'
		})
	}

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({ error })
		}

		forecast(latitude, longitude, (error, forecastData) => {
		  if (error) {
		  	return res.send({ error })
		  }

		  res.send({
		  	forecast: forecastData,
		  	location,
		  	address: req.query.address
		  })
		})
	})
})

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide search term'
		})
	}


	console.log(req.query.search)

	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Sean Byrom',
		errorMessage: 'Help page not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		name: 'Sean Byrom',
		errorMessage: 'Page not found'
	})
})

app.listen(port, () => {
	console.log('Server is up on port ' + port)
})