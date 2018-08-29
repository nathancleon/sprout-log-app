const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const plantsRoutes = require('./plants/plants.routes');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const {DB_URL, PORT, PASSPORT_SECRET} = require('./config');

let app = express();

//Database config
mongoose.Promise = global.Promise;

//require the passport config file
require('./users/passport')(passport);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/plants', plantsRoutes);
app.use('/', express.static('public'));
app.use(cookieParser());
app.use(bodyParser());


app.set('views', './public/views'); //location of ejs files
app.set('view engine', 'ejs'); //set up ejs for templating

//required for passport ==================================================================
app.use(session({ secret: PASSPORT_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./users/users.routes')(app, passport);

let server;

function runServer(dbString, port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbString, { useNewUrlParser: true }, (error) => {
      if (error) {
        return reject(error);
      }
      server = app.listen(process.env.PORT || port, () => {
        console.log(`app is running on port ${port}`);
        resolve();
      })
      .on('error', (error) => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('closing server');
      server.close((error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  });
}

if(require.main === module) {
  runServer(DB_URL, PORT).catch((error) => {
    console.log(error);
  });
}

module.exports = {app, runServer, closeServer};