import CityModel from '../models/city.js';
const cityController = {
    getSuggestions: async (req, res) => {
        try {
            let searchTerm = req.query.q ? req.query.q : '';
            let latitude = req.query.latitude ? req.query.latitude : 0;
            let longitude = req.query.longitude ? req.query.longitude : 0;
            let radius = req.query.radius ? parseInt(req.query.radius) : 5;
            let sortKey = req.query.sort ? req.query.sort.toString() : 'name';
            let coordinates = [parseFloat(longitude), parseFloat(latitude)]

            let aggregate = [{
                $geoNear:
                {
                    near:
                    {
                        type: "Point",
                        coordinates: coordinates
                    },
                    "maxDistance": radius * 1000, // convert km to meters
                    "spherical": true,
                    "distanceField": "distance",
                    "distanceMultiplier": 0.001 // convert distance to km
                }
            },
            {
                $match: { name: new RegExp(searchTerm, 'i') }
            },
            {
                $project: {
                    _id: 0,
                    name: 1.0,
                    latitude: "$lat",
                    longitude: "$long",
                    distance: 1.0
                }
            }
            ];
            if (sortKey === 'name')
                aggregate.push({ $sort: { 'name': 1 } });
            if (sortKey === 'distance')
                aggregate.push({ $sort: { 'distance': 1 } });
            
            let cities = await CityModel.aggregate(aggregate);
            res.status(200).send({
                status: true,
                message: 'success',
                count: cities.length,
                data: cities
            });
        } catch (error) {
            res.status(500).send({
                status: false,
                message: error,
                count: 0,
                data: []
            });
        }
    }
};

export default cityController;