const mongoose = require('mongoose');

const rateSchema = mongoose.Schema({
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    device_id: {
        type: String,
        require: true,
    },
    rate: {
        type: Number,
        max: 5
    }
})


module.exports = mongoose.model('rates', rateSchema);