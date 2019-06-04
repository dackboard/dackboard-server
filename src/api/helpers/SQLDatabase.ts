import { Sequelize } from 'sequelize';
import config from '../../../config/config';

/**
 * Simplified SQL-Database connections via Sequelize
 */
export abstract class SQLDatabase {


    /**
     * Returns the Sequelize instance to access the database configured
     * in config.ts
     */
    public static getInstance(): Sequelize {
        return new Sequelize(
            config.database.sql.database,
            config.database.sql.username,
            config.database.sql.password,
            {
                host: config.database.sql.host,
                dialect: 'mysql'
            }
        );
    }

    /**
     * Returns the database success state
     */
    public static async isSuccessful(): Promise<boolean> {

        return new Promise((resolve, reject) => {

            // check if is successfull
            this.getInstance()
                .authenticate()
                .then(()=> {
                    resolve(true);
                })
                .catch((error)=>{
                    resolve(false);
                    console.error(error);
                });

            reject(new Error('Unknown error'));

        });
    }
}