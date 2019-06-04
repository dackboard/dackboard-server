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
        // Access for the SQL database
        sql: {
            host    : 'localhost',
            username: 'test',
            password: 'test',
            database: 'dackboard'
        }
    }
};

export default config;