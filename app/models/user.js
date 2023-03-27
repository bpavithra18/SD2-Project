// Get the functions in the db.js file to use
const db = require('./../services/db');

class User {
    // user ID
    id;
    // user name
    name;
    // user phone
    phone;
    // user email
    email;
    // user address;
    address;
    // user dob
    dob;
    // user gender
    gender;


    constructor(id) {
        this.id = id;
    }
    
    // Gets the student name from the database
    async getUserDetails() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * from users where id = ?"
            const results = await db.query(sql, [this.id]);
            this.name = results[0].name;
            this.phone = results[0].phone;
            this.email = results[0].email;
            this.address = results[0].address;
            this.dob = results[0].dob;
            this.gender = results[0].gender;
        }

    }

}

module.exports = {
    User
}