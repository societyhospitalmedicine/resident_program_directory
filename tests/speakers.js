var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;
var speakerModel = require('../models/speakerModel.js');

chai.use(chaiHttp);
/*
    FOR RUNNING TEST
    PLEASE USE COMMAND:
    NODE_ENV=test mocha speakers
*/
describe('Speakers', function() {

    before(function() {
        // runs before tests are executed
        // saves a test csv file into mongodb database
        //Converter Class 
        speakerModel.removeAll();
        var Converter = require("csvtojson").Converter;
        var converter = new Converter({});
        
        
         // end_parsed will be emitted once parsing finished 
                        converter.on("end_parsed", function (jsonArray) {
                            var csvArray = speakerModel.csvToJSon(jsonArray);
                            speakerModel.saveCSV(csvArray)
                         });
        // start read stream
        require("fs").createReadStream("./test.csv").pipe(converter);
    });

    it('should list speakers on get', function(done) {
        chai.request(app)
            .get('/speakers')
            .end(function(err, res) {
                res.should.have.status(200);
                (res.body.length).should.be.above(0);
                done();
            });
    });
    
    it('should search speakers on keyword health', function(done) {
        chai.request(app)
            .get('/searchCSV?search_category='+'Clinical Best Practices'+'&search_main='+'health')
            .end(function(err, res) {
                res.should.have.status(200);
                (res.body.results.length).should.be.above(0);
                done();
            });
    });
    
    it('should return no speakers on keyword asdksldl when no search category is entered', function(done) {
        chai.request(app)
            .get('/searchCSV?search_category='+''+'&search_main='+'asdksldl')
            .end(function(err, res) {
                res.should.have.status(200);
                (res.body.results.length).should.be.equal(0);
                done();
            });
    });
});

