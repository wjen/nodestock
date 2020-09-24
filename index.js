const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
require('dotenv').config()


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));

function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=' + process.env.API_KEY, {json: true}, (err, res, body) => {
        if (err) { return console.log(err);}
        if (res.statusCode === 200) {
            finishedAPI(body);
        }
    });  
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// pk_41bfeb9afa414009afb3bdcc8f9900ad


// Set handlebar index GET routes
app.get('/', function (req, res) {
    res.render('home')
    // call_api(function (doneAPI) {
    //     res.render('home', {stock: doneAPI});
    // });
});
// Set handlebar index POST routes
app.post('/', function (req, res) {
    ticker = req.body.stock_ticker;
    call_api(function (doneAPI) {
        res.render('home', {stock: doneAPI, ticker: ticker});
    }, ticker);
});
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server is listening on port ' + PORT))