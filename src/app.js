const path = require('path');
const express = require('express');
const app = express();
const forecast = require('./utlis/forecast');
const geocode = require('./utlis/geocode');
const port = 3000;
const hbs = require('hbs');

//Define Paths for Express Config
const publicpath = path.join(__dirname,'../public'); //==> For Using CSS and JS Files
const viewspath = path.join(__dirname,'../templates/views');
const partialspath = path.join(__dirname,'../templates/partials');

// Setup Handlebars engien and views location
app.set('view engine', 'hbs'); //==> For Using HANDLEBARS template
app.set('views', viewspath);
hbs.registerPartials(partialspath);

//Setup static directory to serve
app.use(express.static(publicpath));  //==> For Using CSS and JS Files

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        'title': 'Weather App',
        'name': 'By Saurabh Kothe'
    });

});
app.get('/about', (req, res) =>{
    // res.send('<h1>This is abouts page..</h1>');
    res.render('about',{
        'location': 'Perth',
        'forecast': 'Cloudy',
        'name': 'Saurabh'
    });
    
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Saurabh'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide a location!"
        });

    }
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'India',
    //     address: req.query.address
    // })
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                'forecast': forecastdata,
                location,
                'address': req.query.address
            });

        })
    });
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
           error: 'No search provided'
       });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saurabh',
        errorMessage: 'Help article not found.'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saurabh',
        errorMessage: 'Page not found.'
    })
})




app.listen(port, ()=>{
    console.log("Server is up on 3000!");
});