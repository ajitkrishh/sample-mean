const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const locationSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
      // required:true,
    },
    address:{
      type:String,
      required:true,
      trim :true
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
      type: String,/*not required by default**/
      // validate: {
      //   validator: function (v) {
      //     var re = /^\d{6}$/;
      //     return (!v || !v.trim().length) || re.test(v)
      //   },
      // }
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
locationSchema.plugin(toJSON);
locationSchema.plugin(paginate);

locationSchema.statics.isPincodeTaken = async function (pincode, excludeLocationId) {
  const location = await this.findOne({ pincode, _id: { $ne: excludeLocationId } });
  // convert location into boolean value. 
  return !!location;
};


locationSchema.pre('save', async function (next) {
  const location = this;
  if(this.isNew){
    let results = await Location.find().sort({_id:-1}).limit(1);
    let latestRecord = results[0];
    if(!latestRecord){
      location._id  = 1;
    }else{
      location._id = latestRecord._id + 1;
    }
    // console.log(location);
    next();
  }
  
});
/**
 * @typedef Location
 */
const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
