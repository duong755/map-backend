const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    place_name: {
        type: String,
        require: true,
        index: true,
    },
    place_info_url: {
        type: String,
        require: true
    },
    place_address: {
        type: String,
        require: true
    },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    contact: String,
    rate: {
        type: Number,
        default: 3,
    },
    rate_times: {
        type: Number,
        default: 0,
    }
})


module.exports = mongoose.model('places', placeSchema);