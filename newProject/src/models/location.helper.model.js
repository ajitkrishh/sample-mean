const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const citySchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      // required:true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    stateId: {
      type: Number,
      required: true,
      ref: 'State'
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
citySchema.plugin(toJSON);
citySchema.plugin(paginate);



citySchema.pre('save', async function (next) {
  const city = this;
  if (this.isNew) {
    let results = await City.find().sort({ _id: -1 }).limit(1);
    let latestRecord = results[0];
    if (!latestRecord) {
      city._id = 1;
    } else {
      city._id = latestRecord._id + 1;
    }
    // console.log(location);
    next();
  }

});

const stateSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      // required:true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    countryId: {
      type: Number,
      required: true,
      ref: 'Country'
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
stateSchema.plugin(toJSON);
stateSchema.plugin(paginate);



stateSchema.pre('save', async function (next) {
  const state = this;
  if (this.isNew) {
    let results = await State.find().sort({ _id: -1 }).limit(1);
    let latestRecord = results[0];
    if (!latestRecord) {
      state._id = 1;
    } else {
      state._id = latestRecord._id + 1;
    }
    // console.log(location);
    next();
  }

});
// -----------------------------------------------------------------
const countrySchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      // required:true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
countrySchema.plugin(toJSON);
countrySchema.plugin(paginate);



countrySchema.pre('save', async function (next) {
  const country = this;
  if (this.isNew) {
    let results = await Country.find().sort({ _id: -1 }).limit(1);
    let latestRecord = results[0];
    if (!latestRecord) {
      country._id = 1;
    } else {
      country._id = latestRecord._id + 1;
    }
    // console.log(location);
    next();
  }

});

const City = mongoose.model('City', citySchema);

const State = mongoose.model('State', stateSchema);

const Country = mongoose.model('Country', countrySchema);


const detailedLocationSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      // required:true,
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    cityId: {
      type: Number,
      required: true,
      trim: true,
    },
    pincode: {
      required: true,
      unique: true,
      trim: true,
      type: String,
    },
    city : citySchema,
    state : stateSchema,
    country:countrySchema
  }
)
detailedLocationSchema.plugin(toJSON);
detailedLocationSchema.plugin(paginate);


const detailedLocation = mongoose.model('detailedlocations', detailedLocationSchema);



module.exports = {
  City,
  State,
  Country,detailedLocation

};
