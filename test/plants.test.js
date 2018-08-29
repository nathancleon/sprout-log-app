const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server.js');
const {DB_TEST_URL, TEST_PORT} = require('../config');
const expect = chai.expect;

// TODO: make config file for server and keys
  // deploy to heroku
  // setup Travis CI
  // a new test = a new it
  // set up about 4 more tests

chai.use(chaiHTTP);

let user;

function createTestUser() {
  console.log('test inside createTestUser');
  return new Promise((resolve, reject) => {
    console.log('test inside promise createuser');
    chai.request(app)
    .post('/plants/new')
    .send({
      email: 'test@test.com',
      password: 'password123'
    })
    .then((res) => {
      console.log('user created successfully');
      resolve();
    })
    .catch((err) => {
      console.log(err);
      reject();
    });
  });
}

function loginUser() {
  console.log('login user');
  return new Promise((resolve, reject) => {
    console.log('login user2');
    chai.request(app)
    .post('/login')
    .send({
      email: 'test@test.com',
      password: 'password123'
    })
    .then((res) => {
      console.log(res);
      resolve();
    })
    .catch((err) => {
      console.log(err);
      reject();
    });
  });
}

function cleanDB() {
  return new Promise((resolve, reject) => {
    mongoose.connection.dropDatabase()
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

describe('plants-tests', () => {
  before(() => {
    console.log('this is starting before function');
    runServer(DB_TEST_URL, TEST_PORT)
    .then(() => {
      console.log('server loaded, starting createTestUser');
      createTestUser()
      .then(() => {
        console.log('user created, starting loginUser');
        loginUser()
        .then((res) => {
          console.log(res);
          done();
        })
      })
      .catch((error) => {
        reject(error);
      });
    })
  });
  after(() => {
    cleanDB();
    closeServer();
  });
  it('should create a new plant', () => {
    return chai.request(app)
    .post('/plants/new')
    .send({
      name: 'Test Plant',
      plantType: 'Succulent',
      currentHealth: 'Healthy',
    })
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((error) => {
      reject(error);
    });
  });
  it('should get all the plants for this user', () => {
    return chai.request(app)
    .get('/plants/')
    .send()
  });
});


