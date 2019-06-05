// 
//  Main Configuartion File for the Dackboard-Server
//  All nescessary configurations should be made below
//
const config = {
    server: {
        // The port on which the server will run by default
        port: 3000
    },
    database: {
        // Access for the mongodb database
        host    : 'localhost',
        port    : 27017,
        username: 'test',
        password: 'test',
        database: 'dackboard'
    },
    api: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorisation"
        }
    },
    crypto: {
        saltRounds: 10
    },
    // Authentication secret for JWT
    // CHANGE BEFORE DEPLOYING!
    authSecret: "DEq32QjbbQZPydaPrc9E4ZJtDUuszG8qW3pMwh9WdTUPCeeLUA5PL9Djv2pUJ2Zd",
    // The duration of a session (jwt) in minutes, 
    // currently 1 month
    authExpiresIn: 24 * 60 * 31,
    passwordRequirements: {
        minLength: 6,
        maxLength: 32
    }
};

export default config;