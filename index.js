const database = require(`./models/db`);
const streetHundredSchema = require(`./schemas/street-hundred`);

exports.connect = async () => {
  const db = database.init();
  return db.model('StreetHundred', streetHundredSchema);
};
