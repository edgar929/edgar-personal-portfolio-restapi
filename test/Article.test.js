process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Post = require('../models/Article');
const fs=require('fs');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server');
let should = chai.should();
const jwt =  require("jsonwebtoken");
const userId = "5fc756455daac005b8758cfb"

let testId1="5fc693f39dd89f23e037d9fd";
let testErrorID="ad"


chai.use(chaiHttp);
chai.should();
chai.use(chaiHttp);

const testuser= {
    email: "shumbushoedgar@gmail.com",
    password: "test123",
    tokens:[{
        token:jwt.sign({_id:userId}, process.env.JWT_SECRET)
    }]
}
const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM3NTY0NTVkYWFjMDA1Yjg3NThjZmIiLCJpYXQiOjE2MDY4OTk0MzF9.34dsQyRKabrbtgkUHfCUszrROnhGlrc51iKA2ioYthE"

describe('user handling', () => {
//   it('it should create user', () => {
//     chai.request(app)
//     .post("/api/user")
//     .send(testuser)
//     .end((err,res)=>{
//         res.should.have.status(200);
//         res.body.should.have.property('message');
//         res.body.should.have.property('user');
//         res.body.should.have.property('token');
//     })
   
// });
    it('it should signin user', () => {
        chai.request(app)
        .post("/api/user/login")
        .send(testuser)
        .end((err,res)=>{
            res.should.have.status(200);
            res.body.should.have.property('user');
            res.body.should.have.property('token');
        })
       
    });
})



describe('Articles handling', () => {
   
  it('it should GET all the Articles', (done) => {
    chai.request(app)
    .get('/api/articles')
    .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
      done();
    });
  });
  

      it('it should POST an Article with all properties ', (done) => {
        chai.request(app)
        .post('/api/articles')
        .set('Authorization',token)
        .set('content-type','multipart/form-data')
        .field('title','the lord of the Rings')
        .field('summary','this is my first testing sumary')
        .field('content','this is my first testing content')
        .field('owner',userId)
        .attach('picture',fs.readFileSync(`${__dirname}/jeremiah_topic.png1606082328498.png`), 'test/jeremiah_topic.png1606082328498.png')
        .end((err,res)=>{
            res.should.have.status(200)
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('article saved successful');
            done()
        })
      });
      
      it('it should not POST an Article without all properties ', (done) => {
        chai.request(app)
        .post('/api/articles')
        .set('Authorization',token)
        .set('content-type','multipart/form-data')
        .field('summary','this is my first testing sumary')
        .field('content','this is my first testing content')
        .attach('picture',fs.readFileSync(`${__dirname}/jeremiah_topic.png1606082328498.png`), 'test/jeremiah_topic.png1606082328498.png')
        .end((err,res)=>{
            res.should.have.status(500)
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done()
        })
      });

     it('it return 404 when no article found',(done)=>{
      chai.request(app)
      .get('/api/articles/'+testErrorID)
      .set('Authorization',token)
      .end((err,res)=>{
        res.should.have.status(500)
        res.body.should.have.property('message');
        done()
      })
    })

      it('it should UPDATE an article of given id', (done) => {
        chai.request(app)
        .patch('/api/articles/'+testId1)
        .set('Authorization',token)
        .send({title:"kalsdjlasjd",summary:"da", content: "nfkasidfisdfhsil"})
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Article updated successfully');
            done();
        });
    });
    it('no article of given id to update', (done) => {
      chai.request(app)
      .patch('/api/articles/'+testErrorID)
      .set('Authorization',token)
      .send({title:"kalsdjlasjd",summary:"da", content: "nfkasidfisdfhsil"})
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('error')
          done();
      });
  });
    it('it should DELETE an article given the id', (done) => {
            chai.request(app)
            .delete('/api/articles/' + testId1)
            .set('Authorization',token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.message.should.be.eql('deleted successful'); 
                done();
            });
      });

      it('no article found to be deleted', (done) => {
        chai.request(app)
        .delete('/api/articles/' + testErrorID)
        .set('Authorization',token)
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
  });

      it('it should GET an article by the given id', (done) => {
      
        chai.request(app)
        .get('/api/articles/'+testId1)
        .set('Authorization',token)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('operation successful');
            res.body.should.have.property('article');
            done();
        });
    });
})