const sqlite3 = require("sqlite3").verbose();
const database = require('./tables');

const db = new sqlite3.Database("data.db");
const data = new database(db);

data.createTables();
//data.insertData();

db.all(`SELECT * FROM Companies`, [], (err, rows) => {
    if (err) {
        throw err;
    };
    console.log(rows);
});

db.close();