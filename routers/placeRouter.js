const route = require('express').Router();
const placeModel = require('../models/places');

route.get('/', async (req, res, next) => {
    try {
        const {q, latitude, longitude, maxDistance} = req.query;

        let query = {};

        const distanceFromTarge = maxDistance ? parseFloat(maxDistance) : 1;

        const distanceByRadius = distanceFromTarge / (8015 / 72);

        if (q) {
            query = {
                $text: {
                    $search: `\"${q}\"`
                },
            }
        }

        if (latitude && longitude) {
            query = {
                ...query,
                longitude: {
                    $lt: parseFloat(longitude) + distanceByRadius,
                    $gt: parseFloat(longitude) - distanceByRadius
                },
                latitude: {
                    $lt: parseFloat(latitude) + distanceByRadius,
                    $gt: parseFloat(latitude) - distanceByRadius
                },
            }
        }

        const places = await placeModel.find(query).limit(10).sort({rate: -1});
        res.status(200).json({success: true, count: places.length, docs: places})
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, error: error, msg: 'fail to get'})
    }
})

module.exports = route;
