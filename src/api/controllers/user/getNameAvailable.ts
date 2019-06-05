import { Request, Response } from 'express';
import UserSchema from '../../models/UserSchema';
import DataValidator from '../../helpers/DataValidator';

export function getNameAvailable(req: Request, res: Response ) {

    const name: string = req.params.name;

    UserSchema.findOne({
        name
    }).then( doc => {

        let isAvailable: boolean = true;
        let info: string = "NAME_AVAILABLE";

        if( doc !== null ) { isAvailable = false;info = "NAME_IN_USE"; }
        if( !DataValidator.isAlphaNumeric(name)) { isAvailable = false;info="NAME_INVALID"; }
        if( !DataValidator.isLengthBetween(name, 3, 32)) { isAvailable = false;info="NAME_INVALID"; }

        res.status(200).json({
            name,
            isAvailable,
            info
        });
        
    }).catch( err => {

        res.status(500).json({
            error: 'INTERNAL_SERVER_ERROR'
        });
    });

};