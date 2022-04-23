import mongoose from 'mongoose';
import autoinc from 'mongoose-plugin-autoinc';
const CitySchema = new mongoose.Schema({
    id: Number,
    name: String,
    ascii: String,
    alt_name: String,
    lat: Number,
    long: Number,
    feat_class: String,
    feat_code: String,
    country: String,
    cc2: String,
    admin1: Number,
    admin2: Number,
    admin3: String,
    admin4: String,
    population: Number,
    elevation: String,
    dem: Number,
    tz: String,
    modified_at: String,
    location: {
        type: Object,
        default: {
            type: String,
            coordinates: [{
                type: Number,
                index: '2dsphere'
            }]
        }
    }
}, {
    usePushEach: true,
    strict: true,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
CitySchema.index({ location: "2dsphere" });
CitySchema.plugin(autoinc.plugin, { model: 'city', field: 'id', startAt: 1, incrementBy: 1 });
export default mongoose.model('city', CitySchema);
