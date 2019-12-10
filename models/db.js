const mongoose = require('mongoose');
const appRoot = require('app-root-path');

const streetHundredSchema = require(`${appRoot}/schemas/street-hundred`);

const init = state => new Promise((resolve, reject) => {

  mongoose.Promise = global.Promise;

  mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

  mongoose.connection.on('connected', function(){
      console.log(`Connected to US-PA`);
      // init street hundred model
      resolve(mongoose);
  });

  mongoose.connection.on('error', function(err){
      reject(err);
  });

  mongoose.connection.on('disconnected', function(){
      console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', function(){
      mongoose.connection.close(function(){
          console.log('Mongoose default connection is disconnected due to application termination');
          process.exit(0);
      });
  });

});

module.exports = {mongoose, init};
