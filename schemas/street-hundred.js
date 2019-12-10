const mongoose = require('mongoose');

const pointSchema = require(`./point`);
const lineStringSchema = require(`./line-string`);

const addressFeature = {
  type: {
    type: String,
    required: true,
    enum: 'Feature',
  },
  geometry: pointSchema,
  properties: {
    number: {
      type: Number,
      required: true,
    }
  }
};

const addressFeatureCollection = {
  type: {
    type: String,
    enum: 'FeatureCollection',
    required: true,
  },
  features: {
    type: [addressFeature],
    required: true,
  }
};

const blockSchema = {
  path: lineStringSchema,
  addresses: addressFeatureCollection,
};

const streetHundredSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  hundred: {
    type: Number,
    required: true,
  },
  referencePoint: pointSchema,
  odd: blockSchema,
  even: blockSchema,
});

// set index on referencePoint
streetHundredSchema.index({referencePoint: 1});

module.exports = streetHundredSchema;
