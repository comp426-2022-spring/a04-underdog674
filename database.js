//strict prevents silent errors
"use strict";

const Database = require('better-sqlite3');
//connect to a data base or create a bew one
const db = new Database('user.db');

//is db initialized or should we do it
const stmt = db.prepare(`
SELECT name FROM sqlite_master WHERE type='table' and name='userinfo';`);

let row = stmt.get();

if(row === undefined){
    console.log('your databse is empty, I will initialize one');



const sqlInit = `
CREATE TABLE userinfo ( id INTEGER PRIMARY KEY, username TEXT, password TEXT);
INSERT INTO userinfo (username, paswword) VALUES
('user1','supersecurepassword'),('test','anotherpassword');
`;

db.exec(sqlInit);

console.log('Your database has been initialized with a new table and two entries containing a username and password.');
}
else{
    console.log('Database exists')
}



module.exports = db