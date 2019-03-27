// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

const User = require('../models/users');
const Todo = require('../models/todo');

describe('Users model', () => {
    // happy path 👍🏼
    it('should be able to retreive by id', async () => {
        const theUser = await User.getById(3);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    // sad path 👎🏼
    it('should error if no user by id', async () => {
        const theUser = await User.getById(324);
        expect(theUser).to.be.null;
        // theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    it('should update the user', async () => {
        // grab a user with id 2
        const theUser = await User.getById(2);
        // update the email
        theUser.email = 'tomorrowneverdies@netscape.net';
        // save the user
        await theUser.save();
        const alsoTheUser = await User.getById(2);
        expect(alsoTheUser.email).to.equal('tomorrowneverdies@netscape.net');
    });
    it('should encrypt the password', async () => {
        const password = "bacon"
        // get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon"
        theUser.setPassword(password);
        // compare their password to "bacon"
        expect(theUser.password).not.to.equal("bacon");
        // it should be false
    });
    it('should be able to check for correct passwords', async () => {
        // get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon"
        theUser.setPassword("bacon");
        // same them to the database
        await theUser.save();
        // get them back out of the database
        const sameUser = await User.getById(1);
        // ask them if their password is bacon
        const isCorrectPassword = sameUser.checkPassword("bacon");
        expect(isCorrectPassword).to.be.true;
        const isNotCorrectPassword = sameUser.checkPassword("tofu");
        expect(isNotCorrectPassword).to.be.false;
    });
});

describe('ToDo model', () => {
    it('should be able to grab an array of todos', async () => {
        const arrayOfTodo = await Todo.getAll();
        expect(arrayOfTodo).to.be.instanceOf(Array);
        for (let i = 0; i < arrayOfTodo.length; i++){
            expect(arrayOfTodo[i]).to.be.an.instanceOf(Todo);
        }
    });
    it('should be able to retreive by id', async () => {
        const theTodo = await Todo.getByID(3);
        expect(theTodo).to.be.instanceOf(Todo);
    });
    it('should change the "complete" status to "true"', async () => {
        const theTodo = await Todo.getByID(3);
        await theTodo.markAsDone();
        expect(theTodo.complete).to.be.true;
    });
});









describe('Users and Todo', () => {
    it('a user instance should be able to retrieve all their ToDos', async () => {
        // grab a user by id
        const theUser = await User.getById(3);
        // then get all their todos
        const theTodos = await theUser.todo;
        // confirm that their todos are in an array
        expect(theTodos).to.be.an.instanceOf(Array);
        // and that the array is the correct length
        expect(theTodos).to.be.lengthOf(1);
        // and that each one is an instance of a Todo

        // console.log(' ');
        // console.log('     THIS SHOULD BE THE FIRST REVIEW INSTANCE, NOT ARRAY:');
        // console.log(theTodos[0]);

        expect(theTodos[0]).to.be.an.instanceOf(Todo);

        for (let i=0; i < theTodos.length; i++){
            // console.log(' ');
            // console.log(typeof theTodos[i]);
            expect(theTodos[i]).to.be.an.instanceOf(Todo);
        }
    });
});
