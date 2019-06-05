import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    // The username required to login
    name: {
        type: String,
        required: true,
        unique: true
    },
    // The email address for the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Password digest
    passwordDigest: {
        type: String,
        required: true
    },
    // User's Avatar url or blob
    avatarUrl: {
        type: String,
        default: null
    },
    // Amount of times user has signed in
    signInCount: {
        type: Number,
        default: 0
    },
    // Timestamp when the user was created
    createdAt: {
        type: Number,
        default: Date.now()
    },
    // The user's homecountrycode
    country: {
        type: String,
        default: "gb"
    },
    // The user's UI language code
    language :{
        type: String,
        default: "en"
    },
    // List of all logins
    loginHistory: {
        type: Map,
        of: {
            ipAddress: { type: String },
            timestamp: { type: Number, default: Date.now() }
        }
    },
    // if user is banned, he's blocked from logging in
    // and displayed banMessage
    isBanned: {
        type: Boolean,
        default: false
    },
    // message that is displayed when attempting to log in
    // on the banned account
    banMessage: {
        type: String,
        default: null
    },
    // Dynamic list for third-party logins like google, twitter etc.
    thirdPartyLogins: {
        type: [],
        default: []
    },
    // Timestamp of the current/most recent login
    currentSignInAt: {
        type: Number,
        default: null
    },
    // if the user has a confirmed email address
    isConfirmed: {
        type: Boolean,
        default: false
    },
    // timestamp when the email address was confirmed
    confirmedAt: {
        type: Number,
        default: null
    },
    // List of all account changes that were made
    changeHistory: {
        type: [],
        default: []
    },
    // The timestamp when the account was changed the most recent time
    changedAt: {
        type: Number,
        default: null
    },
    // if 2FA is enabled
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    // the 2fa secret
    twoFactorToken: {
        type: String,
        default: null
    }

});

export default mongoose.model('User', UserSchema);