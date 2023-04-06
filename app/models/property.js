// Get the functions in the db.js file to use
const db = require('./../services/db');

class Property {
    // property ID
    id;
    // property location
    location;


    constructor(id) {
        this.id = id;
    }
    
    // Gets the student name from the database
    async getPropertyDetails() {
        if (typeof this.location !== 'string') {
            var sql = "SELECT * from property where id = ?"
            const results = await db.query(sql, [this.id]);
            this.location = results[0].location;
        }

    }

}

module.exports = {
    Property
}