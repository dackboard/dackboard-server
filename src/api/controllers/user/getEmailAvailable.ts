import { Request, Response } from 'express';
import UserSchema from '../../models/UserSchema';
import DataValidator from '../../helpers/DataValidator';

export function getEmailAvailable(req: Request, res: Response ) {

    const email: string = req.params.email;
    console.log("params", req.params);

    UserSchema.findOne({
        email
    }).then( doc => {

        let isAvailable: boolean = true;
        let info: string = "EMAIL_AVAILABLE";

        if( doc !== null ) { isAvailable = false;info = "EMAIL_IN_USE"; }
        if( !DataValidator.isValidEmail(email)) { isAvailable = false;info="EMAIL_INVALID"; }

        res.status(200).json({
            email,
            isAvailable,
            info
        });
        
    }).catch( err => {

        console.error(err);
        res.status(500).json({
            error: 'INTERNAL_SERVER_ERROR'
        });
    });

};