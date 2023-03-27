// Get the functions in the db.js file to use
const db = require('./../services/db');

class User {
    // Student ID
    id;
    // Student name
    name;


    constructor(id) {
        this.id = id;
    }
    
    // Gets the student name from the database
    async getUserDetails() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * from users where id = ?"
            const results = await db.query(sql, [this.id]);
            this.name = results[0].name;
        }

    }

}

module.exports = {
    User
}