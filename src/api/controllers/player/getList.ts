import { Request, Response } from 'express';
import PlayerSchema from '../../models/PlayerSchema';
import PropFilter from '../../helpers/PropFilter';

export function getList(req: Request|any, res: Response) {

    const ownerId: string = req.session._id;

    PlayerSchema.find({
        owner_id: ownerId
    })
    .then( document => {

        // filter out props that the user doesn't need
        let playerList = [];
        for(const player of document) {
            playerList.push(PropFilter.filter(player, [
                "_id", "avatarUrl", "gender", "birthDate", "country", "createdAt", "name"
            ], false));
        }
        
        res.status(200).json({
            players: playerList
        });

    })
    .catch( error => {
        console.error(error);
    });

};