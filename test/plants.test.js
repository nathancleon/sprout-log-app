const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server.js');
const expect = chai.expect;

// TODO: make config file for server and keys
  // deploy to heroku
  // setup Travis CI
  // a new test = a new it
  // set up about 4 more tests

chai.use(chaiHTTP);

function createTestUser() {
  return chai.request(app)
  .post('/signup')
  .send({
    email: 'test@test.com',
    password: 'password123'
  })
  .then((res) => {
    console.log(res);
  });
}

function loginUser() {
  return chai.request(app)
  .post('/login')
  .send({
    email: 'test@test.com',
    password: 'password123'
  })
  .then((res) => {
    console.log(res);
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
    runServer('mongodb://user:pass123@ds163680.mlab.com:63680/healthy-plant-testdb');
    createTestUser()
    .then(() => {
      loginUser();
    })
    .catch((error) => {
      reject(error);
    });
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
});


