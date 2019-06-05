import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import UserSchema from '../../models/UserSchema';
import * as jwt from 'jsonwebtoken';
import config from '../../../../config/config';
import PropFilter from '../../helpers/PropFilter';

export function post(req: Request, res: Response) {

    const name: string = req.body.name;
    const password: string = req.body.password;

    // If data was not passed
    if (!name || !password) {
        res.status(400).json({
            error: 'BAD_REQUEST'
        });

    // Data was passed
    } else {

        // find user
        UserSchema.findOne(
            { name }
        , (err, user) => {

            // user didn't exist in db
            if(!user) {

                res.status(200).json({
                    success: false,
                    message: 'AUTH_FAILED_UNKNOWN_USER'
                });

            // user did exist in the bd
            } else {

                // check if password matches the hashed of the db
                bcrypt.compare(password, user.passwordHash, (err, isCorrect) => {
                    // Error
                    if(err) {
                        res.status(500).json({
                            success: false,
                            message: 'INTERNAL_SERVER_ERROR'
                        });
                        console.error(err);
                    // Success
                    } else {

                        // password is valid
                        if(isCorrect) {

                            // if user is banned
                            if(user.isBanned) {
                                res.status(200).json({
                                    success: false,
                                    message: 'AUTH_FAILED_USER_BANNED',
                                    banMessage: user.banMessage
                                });
                                return;
                            }

                            // create payload for jwt
                            const payload = PropFilter.filter(user, [
                                "_id",
                                "avatarUrl",
                                "country",
                                "language",
                                "isConfirmed",
                                "name",
                                "email"
                            ]);

                            // create token
                            const token: string = jwt.sign(payload, config.authSecret, {
                                expiresIn: 60 * config.authExpiresIn
                            });

                            //TODO: add entries to db

                            res.status(200).json({
                                success: true,
                                token: token
                            });
                        // password is invalid
                        } else {
                            res.status(200).json({
                                success: false,
                                message: 'AUTH_FAILED_INVALID_PASSWORD'
                            });
                        }

                    }
                });

            }

        });

    }

};