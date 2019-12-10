const {expect} = require('chai');
const appRoot = require('app-root-path');

require('dotenv').config({path: `${appRoot}/.env.test`});

const database = require(`${appRoot}/models/db`);
const streetHundreds = require(`${appRoot}/tests/fixtures/street-hundreds`);
const streetHundredSchema = require(`${appRoot}/schemas/street-hundred`);

describe('DB', () => {

  it('should connect to database and insert street hundred', done => {

    database.init()
      .then(db => {
        expect(db).to.exist;
        const StreetHundred = db.model('StreetHundred', streetHundredSchema);
        const hundred = new StreetHundred(streetHundreds[0]);
        hundred.save()
          .then(doc => {
            expect(doc).to.exist.and.to.have.property('_id');
            done();
          })
          .catch(e => done(e));
      })
      .catch(e => done(e));

  });

  it('should connect to database and read 1 street hundred', done => {

    database.init()
      .then(db => {
        expect(db).to.exist;
        const StreetHundred = db.model('StreetHundred', streetHundredSchema);
        StreetHundred.find({})
          .then(docs => {
            expect(docs).to.have.lengthOf(8);
          }).catch(e => done(e));
      })
      .catch(e => done(e));

  });

});
