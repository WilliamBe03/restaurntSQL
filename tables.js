const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data.db");

class database {
    constructor(db) {
        this.db = db;
    };
    createTables(){
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS Companies(
                    compID INTEGER PRIMARY KEY,
                    name VARCHAR(255),
                    logoURL VARCHAR(255)
            )`);
            
            this.db.run(`CREATE TABLE IF NOT EXISTS Menus(
                menuID INTEGER PRIMARY KEY,
                compID INTEGER,
                title VARCHAR(255)
            )`);
        
            this.db.run(`CREATE TABLE IF NOT EXISTS Locations(
                locID INTEGER PRIMARY KEY,
                compID INTEGER,
                name VARCHAR(255),
                capacity INTEGER,
                manager VARCHAR(255)
            )`);
        
        })
    };
    insertData() {
        this.db.serialize(() => {
            this.db.run(`INSERT INTO Companies(name,logoURL)
            VALUES ('McDonalds','https://1000logos.net/wp-content/uploads/2017/03/McDonalds-logo.png')
            `);
            this.db.run(`INSERT INTO Menus(compID, title)
            VALUES (
                (SELECT compID FROM Companies WHERE name = 'McDonalds'),
                'McFood')
            `);
            this.db.run(`INSERT INTO Locations(compID, name, capacity, manager)
            VALUES (
                (SELECT compID FROM Companies WHERE name = 'McDonalds'),
                'London',
                54,
                'Andrew Robins')
            `);
        });
    };
};

module.exports = database;