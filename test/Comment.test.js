let mongoose = require("mongoose");
let Comment = require('../models/Comments');
let mocha = require('mocha');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
chai.should();
chai.use(chaiHttp);
let should = chai.should();

let testId1="5fc693f39dd89f23e037d9fd";
describe('COMMENT API TEST', () => {
    // afterEach(async () => {
    //     await Comment.deleteMany({});
    //   });
    describe('CRD Comment', () => {
            it('it should CREATE a comment', (done) => {
                const res = chai.request(app)
                .post('/api/comments/'+testId1)
                .send({fullName:"edgar", comment:"testing comments",testId1})
                .end((err,res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    done()
                })
                
            });
            it('it should not send a comment without comment message', (done) => {
                const res = chai.request(app)
                .post('/api/comments/'+testId1)
                .send({fullName:"edgar"})
                .end((err,res)=>{
                    res.should.have.status(400)
                    done()
                })
                
            });
         
            // Get all comments
            it('it should GET all the comments', (done) => {
                const res = chai.request(app)
                .get('/api/comments/'+testId1)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
              });
            })

    });
});