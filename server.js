const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const plantsRoutes = require('./plants/plants.routes');
const mongoose = require('mongoose');

let app = express();

app.use(bodyParser.json());
app.use(morgan('common'));
app.use('/plants', plantsRoutes);
app.use('/', express.static('public'))
//Database config
//connect to the database (in mLab)
mongoose.connect('mongodb://user:pass123@ds161262.mlab.com:61262/healthy-plantdb', { useNewUrlParser: true });
//Tell mongoose that we will use promises (is to avoid just a warning)
mongoose.Promise = global.Promise;
//Get the connection
let db = mongoose.connection;
//If it's an error I will console log 'Connection error' if not 'connected to a database'
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () { console.log('Connected to a database') });

app.listen(8080, () => {
  console.log('app running on port 8080');
});
