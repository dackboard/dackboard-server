import mongoose, { Schema } from 'mongoose';

const PlayerSchema: Schema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },

    // The owner's user id
    // @ref: user._id
    owner_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    // the users nickname
    name: {
        type: String,
        required: true
    },
    // the users avatar url/blob
    avatarUrl: {
        type: String,
        default: null
    },
    // the gender of the user
    // 0->female, 1->male, null->smth else or not specified
    gender: {
        type: Number,
        default: null
    },
    // the user's birthdate
    birthDate: {
        type: Number,
        default: null
    },
    // countrycode
    county: {
        type: String,
        default: null
    }

});

export default mongoose.model('Player', PlayerSchema);