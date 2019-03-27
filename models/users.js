// bring in the database connection
const db = require('./conn');
const Todo = require('./todo');
const bcrypt = require('bcryptjs');

// need a user object?
// classes should start with an uppercase letter
class User {
    constructor(id, first_name, last_name, email, password){
        // In python it was "self," here it's "this"
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }
    // static means that the function is something the class can do but an instance cannot
    static getById(id){
        // db.any returns an array of results
        // db.one will give us just the object
        return db.one(`select * from users usr where usr.id=${id}`)
            .then( (userData) => {
                const userInstance = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                return userInstance;
            })
            .catch(() => {
                return null; // signal an invalid value
            });
    }
    // no static below since this is an "instance method" and therefore should belong to the individual instances
    save(){
        // db.result returns a report about how many rows got affected
        return db.result(`update users set 
                            first_name='${this.firstName}',
                            last_name='${this.lastName}',
                            email='${this.email}',
                            password='${this.password}'
                        where id=${this.id}
                            `);
    }
    setPassword(newPassword){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }
    checkPassword(aPassword){
        return bcrypt.compareSync(aPassword, this.password);
    }
    get todo() {
        return db.any(`select * from todo where user_id = ${this.id};`)
            .then((arrayOfTodoData) => {
                const arrayOfTodoInstances = [];
                arrayOfTodoData.forEach((data) => {

                    // console.log('     vvvv this is "DATA" vvvv');
                    // console.log(data);
                    // console.log(' ');

                    const newInstance = new Todo(
                                                    data.id, 
                                                    data.task, 
                                                    data.complete, 
                                                    data.user_id
                    );
                    arrayOfTodoInstances.push(newInstance);
                    
                    // console.log('     vv vv vv new instance vv vv vv');
                    // console.log(newInstance);
                    // console.log(' ');
                });

                // console.log('     vvvv that is the array of todo instances vvvv');
                // console.log(arrayOfTodoInstances);
                // console.log(' ');

                return arrayOfTodoInstances;
            });
    }
}

// exploratory code
// User.getById(3)
//     .then((user) => {
//         console.log(user);
//     });

// export user model
module.exports = User;
