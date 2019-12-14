const database = require(`./models/db`);
const streetHundredSchema = require(`./schemas/street-hundred`);

exports.connect = async () => {
  const db = await database.init();
  streetHundredSchema.set('collection', 'philadelphia');
  return db.model('PhillyStreetHundreds', streetHundredSchema);
};
