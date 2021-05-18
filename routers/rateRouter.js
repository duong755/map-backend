const route = require('express').Router()
const mongoose = require('mongoose')

const rateModel = require('../models/rate');
const placeModel = require('../models/places');

route.post('/', async (req, res, next) => {
    const {placeId, deviceId, rate} = req.body;
    const isExisted = await rateModel.findOne({
        place_id: placeId,
        device_id: deviceId,
    })
    let saved;
    if (isExisted) {
        isExisted.rate = rate;
        saved = await isExisted.save();
    } else {
        const rated = new rateModel({
            place_id: placeId,
            device_id: deviceId,
            rate: rate
        })
        saved = await rated.save();
    }
    const averagePerPlace = await rateModel.aggregate([
        {
            $match: {
                place_id: mongoose.Types.ObjectId(placeId)
            }
        },
        {
            $group: {
                _id: placeId,
                average: {
                    $avg: '$rate'
                },
                count: {
                    "$sum": 1
                }
            },
        }
    ]).exec();

    console.log(averagePerPlace);

    const place = await placeModel.findById(placeId);

    place.rate = averagePerPlace[0].average;
    place.rate_times = averagePerPlace[0].count;

    const updated = await place.save();

    return res.status(200).json({
        success: true,
        doc: updated,
    });

});

module.exports = route;
