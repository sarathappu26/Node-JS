const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const dataService = require('./services/dataservice');
const dataservice = new dataService('./data/data.json');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
var methodOverride = require('method-override');

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, './views/pages'));
app.set('trust proxy', 1);
app.use(methodOverride('_method'));

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/static')));
app.use('/', routes({ dataservice }));

const server = app.listen(3000, () => {
  console.log('conneted to port', server.address().port);
});
