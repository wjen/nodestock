const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const app = express();

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {});
});
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log('Server is listening on port ' + PORT))