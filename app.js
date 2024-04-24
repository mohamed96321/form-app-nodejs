const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const sequelize = require('./util/database');

// Config Ejs file
app.set('view engine', 'ejs');
app.set('views', 'views');

const personRoutes = require('./routes/person');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(personRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('PostgreSQL connected');
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch(err => console.log(err));
