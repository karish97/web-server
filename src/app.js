const express = require('express');
const path = require('path');
const hbs = require('hbs');
const mapbox = require('./utils/mapbox');
const weatherstack = require('./utils/weatherstack');

const app = express();

//define paths
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//serve dynamic file
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.get('/', (req, res) => {
  res.render('index.hbs', {
    logo: 'Weather',
    name: 'Karishma Kesari'
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    logo: 'Weather',
    name: 'Karishma Kesari'
  });
});
app.get('/help', (req, res) => {
  res.render('help.hbs', {
    logo: 'Weather',
    contact: '9891041852',
    email: 'karishma.developer97@gmail.com',
    name: 'Karishma Kesari'
  });
});
app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'Please enter a location.'
    });
  }
  const location = req.query.location;
  mapbox(location, (error, data) => {
    if (error) {
      return res.send({error});
    }
    if (data) {
      weatherstack(data.latitude, data.longitude, (error, result) => {
        if (error) {
          return res.send({error});
        }
        if (result) {
          res.send({
            forecast: result,
            address: data.address
          });
        }
      });
    }
  });
});

//serve static file
// app.use(express.static(publicPath));

//serve inline content
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});
app.get('/weather', (req, res) => {
  res.send({
    temperature: 32,
    location: 'Mirzapur, Uttar Pradesh'
  });
});

//page not found
app.get('/*', (req, res) => {
  res.render('404.hbs', {
    logo: 'Weather',
    name: 'Karishma Kesari'
  });
});

app.listen(3000, () => {
  console.log(`running on http://localhost:3000`);
});
