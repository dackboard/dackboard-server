import * as mongoose from 'mongoose';

const PlayerSchema: mongoose.Schema = new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId
    },

    // The owner's user id
    // @ref: user._id
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
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
    },
    // time of creation
    createdAt: {
        type: Number,
        default: Date.now()
    }

});

export default mongoose.model('Player', PlayerSchema);