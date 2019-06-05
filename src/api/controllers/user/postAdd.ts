import { Request, Response } from 'express';
import User from '../../models/UserSchema';
import * as bcrypt from 'bcrypt';
import config from '../../../../config/config';
import DataValidator from '../../helpers/DataValidator';
import * as mongoose from 'mongoose';

// POST /user/add
export function postAdd(req: Request, res: Response) {

    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    // validates inputs
    // if true, data will be created, if false its an error bad request.
    let dataIsValid = {
        email: true,
        name: true,
        password: true
    };

    // Validate data
    if( !DataValidator.isValidEmail(email) ) { dataIsValid.email = false; }
    if( !DataValidator.isAlphaNumeric(name) ) { dataIsValid.name = false; }
    if( !DataValidator.isLengthBetween(name, 3, 32) ) { dataIsValid.name = false; }
    if( !DataValidator.isSecurePassword(password)) { dataIsValid.password = false; }

    // data is invalid
    if( !dataIsValid.email || !dataIsValid.name || !dataIsValid.password ) {
        res.status(200).json({
            success: false,
            message: 'DATA_INVALID',
            dataIsValid
        })

    // data is valid
    } else {

        // Hash the password
        bcrypt.hash(password, config.crypto.saltRounds, (err, hash: string) => {

            // hashing failed
            if(err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: "INTERNAL_SERVER_ERROR"
                });

            // hashing successful
            } else {

                // create the new user
                const newUser = new User({
                    _id:  new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    passwordHash: hash,
                    registrationIpAddress: req.ip
                });

                newUser.save()
                    .then( result => {

                        // Successful
                        res.status(200).json({
                            success: true
                        });

                    })
                    .catch( err => {
                        // Username or email already in use
                        if( err.code === 11000) {
                            res.status(200).json({
                                success: false,
                                message: 'CREDENTIALS_IN_USE'
                            })
                        // Internal server error
                        } else {
                            console.error('Error creating User', err);
                            res.status(500).json({
                                success: false,
                                message: 'INTERNAL_SERVER_ERROR'
                            })
                        }
                    });
            }
        });

    }

};