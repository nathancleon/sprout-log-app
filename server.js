const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const plantsRoutes = require('./plants/plants.routes');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

let app = express();

//Database config
//connect to the database (in mLab)
// mongoose.connect('mongodb://user:pass123@ds161262.mlab.com:61262/healthy-plantdb', { useNewUrlParser: true });
//Tell mongoose that we will use promises (is to avoid just a warning)
mongoose.Promise = global.Promise;
//Get the connection
// let db = mongoose.connection;
//If there is an error I will console log 'Connection error' if not 'connected to a database'
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', function () { console.log('Connected to a database'); });

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
app.use(session({ secret: 'iloveplantsmorethananythingever' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./users/users.routes')(app, passport);

let server;

function runServer(dbString) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbString, { useNewUrlParser: true }, (error) => {
      if (error) {
        return reject(error);
      }
      server = app.listen(8080, () => {
        console.log('app is running on port 8080');
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

runServer('mongodb://user:pass123@ds161262.mlab.com:61262/healthy-plantdb').catch((error) => {
  console.log(error);
});

module.exports = {app, runServer, closeServer};