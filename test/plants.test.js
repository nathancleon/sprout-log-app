const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server.js');
const {DB_TEST_URL, TEST_PORT} = require('../config');
const expect = chai.expect;

chai.use(chaiHTTP);

let plant;

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
    runServer(DB_TEST_URL, TEST_PORT);
  });

  after(() => {
    cleanDB();
    closeServer();
  });

  it('should create a user', () => {
    return chai.request(app)
      .post('/signup')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then((res) => {
        console.log("user successfully registered");
        expect(res).to.have.status(200);
      });
  });

  it('should log in the user', () => {
    return chai.request(app)
      .post('/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then((res) => {
        expect(res).to.have.status(200);
      });
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
        plant = res.body.data._id;
        expect(res).to.have.status(200);
      });
  });

  it('should update a plant', () => {
    return chai.request(app)
      .put(`/plants/one/${plant}`)
      .send({
        name: 'Test Planty',
        plantType: 'Cactus',
        currentHealth: 'Dying'
      })
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });

  it('should delete a plant', () => {
    return chai.request(app)
      .delete(`/plants/one/${plant}`)
      .send({
        name: 'Test Plant',
        plantType: 'Succulent',
        currentHealth: 'Healthy',
      })
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});