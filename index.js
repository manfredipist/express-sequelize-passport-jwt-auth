const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const errorhandler = require('errorhandler');

const config = require("./config")
const dbConnection = require("./models").dbConnection;

var isProduction = config.stage;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'))


dbConnection.sequelize.authenticate()
.then(() => {
  console.log("Connection has been established successfully.")
  dbConnection.sequelize.sync({ force: true }).then(() => {
    console.log("Synced db with drop.");
  });
})
.catch(err => {
  console.error("Unable to connect to the database:", err)
});


app.use('/api', require('./routes'));
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use(errorhandler())
}

/// error handlers
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(
    {
      "error":{
        message: err.message
      }
    });
});

app.listen(config.port, () => {
  console.log('ExpressSequelizePassport started on port: ' + config.port)
});
