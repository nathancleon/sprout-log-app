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

<<<<<<< HEAD
=======
app.use(bodyParser.json());
app.use(morgan('common'));
app.use('/plants', plantsRoutes);
app.use('/auth', userRoutes);
app.use('/', express.static('public'));
>>>>>>> authentication
//Database config
//connect to the database (in mLab)
mongoose.connect('mongodb://user:pass123@ds161262.mlab.com:61262/healthy-plantdb', { useNewUrlParser: true });
//Tell mongoose that we will use promises (is to avoid just a warning)
mongoose.Promise = global.Promise;
//Get the connection
let db = mongoose.connection;
//If it's an error I will console log 'Connection error' if not 'connected to a database'
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () { console.log('Connected to a database'); });
<<<<<<< HEAD

require('./users/passport')(passport);

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/plants', plantsRoutes);
// app.use('/auth', userRoutes);
app.use('/', express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());


app.set('views', './public/views');
app.set('view engine', 'ejs'); //set up ejs for templating

//required for passport ==================================================================
app.use(session({ secret: 'iloveplantsmorethananythingever' }));
app.use(passport.initialize());
app.use(passport.session());

require('./users/users.routes')(app, passport);
=======
>>>>>>> authentication

app.listen(8080, () => {
  console.log('app running on port 8080');
});
