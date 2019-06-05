import { Request, Response } from 'express';
import UserSchema from '../../models/UserSchema';
import DataValidator from '../../helpers/DataValidator';

export function getEmailAvailable(req: Request, res: Response ) {

    const email: string = req.params.email;

    UserSchema.findOne({
        email
    }).then( doc => {

        let isAvailable: boolean = true;
        let info: string = "EMAIL_AVAILABLE";

        if( doc !== null ) { isAvailable = false;info = "EMAIL_IN_USE"; }
        if( !DataValidator.isValidEmail(email)) { isAvailable = false;info="EMAIL_INVALID"; }

        res.status(200).json({
            success: true,
            email,
            isAvailable,
            info
        });
        
    }).catch( err => {

        console.error(err);
        res.status(500).json({
            success: false,
            message: 'INTERNAL_SERVER_ERROR'
        });
    });

};