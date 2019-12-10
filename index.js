const appRoot = require('app-root-path');

const database = require(`${appRoot}/models/db`);
const streetHundredSchema = require(`${appRoot}/schemas/street-hundred`);

exports.connect = async () => {
  const db = database.init();
  return db.model('StreetHundred', streetHundredSchema);
};
