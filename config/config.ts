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
    crypto: {
        saltRounds: 10
    },
    authSecret: "DEq32QjbbQZPydaPrc9E4ZJtDUuszG8qW3pMwh9WdTUPCeeLUA5PL9Djv2pUJ2Zd",
    passwordRequirements: {
        minLength: 6,
        maxLength: 32
    }
};

export default config;