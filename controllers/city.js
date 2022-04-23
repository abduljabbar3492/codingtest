import CityModel from '../models/city.js';
const cityController = {
    getSuggestions: async (req, res) => {
        // res.send(req.query);
        let a = {
            q: 'london',
            latitude: '43.70011',
            longitude: '-79.4163',
            radius: '5',
            sort: 'distance'
        }
        let searchTerm = req.query.q ? req.query.q : '';
        let latitude = req.query.latitude ? req.query.latitude : 0;
        let longitude = req.query.longitude ? req.query.longitude : 0;
        let radius = req.query.radius ? parseInt(req.query.radius) : 5;
        let sort = req.query.sort ? req.query.sort : 'name';
        let coordinates = [parseFloat(longitude), parseFloat(latitude)]
        console.log(coordinates)
        let cities = await CityModel.find({
            // name: new RegExp(searchTerm, 'i')
            location: {
                $geoWithin: {
                    $centerSphere: [coordinates, radius]
                }
            }
        });

        res.send(cities);
    }
};

export default cityController;