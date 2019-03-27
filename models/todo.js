const db = require('./conn');
const Users = require('./users');

class Todo {
    constructor(id, task, complete, user_id){
        this.id = id;
        this.task = task;
        this.complete = complete;
        this.userId = user_id;
    }
    // static means that the function is something the class can do but an instance cannot
    static getAll(){
        // db.any returns an array of results
        // db.one will give us just the object
        return db.any(`select * from todo tod`)
            .then( (arrayOfTodo) => {
                return arrayOfTodo.map((todData) => {
                    return new Todo(
                        todData.id, todData.task, todData.complete, todData.user_id);
                    });
            })
            .catch(() => {
                return null; // signal an invalid value
            });
    }
    static getByID(id){
        return db.one(`select * from todo tod where id=${id}`)
            .then( (todData) => {
                const todInstance = new Todo(todData.id, todData.task, todData.complete, todData.user_id);
                return todInstance;
                // or
                // return new Todo(todData.id, todData.task, todData.complete, todData.user_id);
            })
            .catch(() => {
                return null; // signal an invalid value
            });
    }
    // no static below since this is an "instance method" and therefore should belong to the individual instances
    // save(){
    //     // db.result returns a report about how many rows got affected
    //     return db.result(`update todo set 
    //                         task=${this.task},
    //                         complete='${this.complete}',
    //                         user_id=${this.userId}
    //                     where id=${this.id}
    //                         `);
    // }
    markAsDone(){
        return db.result(`update todo set 
                    complete=true
                    where id=${this.id}
                    `);
    }
}

module.exports = Todo;
