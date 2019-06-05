import { Request, Response } from 'express';
import PlayerSchema from '../../models/PlayerSchema';
import PropFilter from '../../helpers/PropFilter';
import * as mongoose from 'mongoose';

export function postAdd(req: Request|any, res: Response) {

    const name: string = req.body.name;
    const gender: Number = req.body.gender || null;
    const birthDate: Number = req.body.birthDate || null;
    const country: String = req.body.country || null;
    const avatarUrl: String = req.body.avatarUrl || null;

    const ownerId: String = req.session._id;

    // if no name was passed
    if(!name) {
        return res.status(200).json({
            success: false,
            message: 'DATA_INVALID'
        });
    }

    const newPlayer = new PlayerSchema({
        _id:  new mongoose.Types.ObjectId(),
        name,
        gender,
        birthDate,
        country,
        avatarUrl,
        owner_id: ownerId
    });

    //TODO: Check if user has an existing player with same name already

    newPlayer.save()
        .then(result => {

            // success
            res.status(200).json({
                success: true,
                player: PropFilter.filter(result, [
                    "avatarUrl", "gender", "country", "birthDate", "name", "createdAt", "_id"
                ], true)
            });

        })
        .catch( error => {

            console.error(error);
            // failed
            res.status(500).json({
                success: false,
                message: 'INTERNAL_SERVER_ERROR'
            });

        });



};