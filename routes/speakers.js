var express = require('express');
var router = express.Router();
var speakerController = require('../controllers/speakerController.js');
//var loadSpeakersController = require('../controllers/loadSpeakersController.js');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
/*
 * GET
 */
router.get('/speakers', function(req, res) {
    console.log('adf')
    speakerController.list(req, res);
});

/*
 * GET
 */
router.get('/speakers/:id', function(req, res) {
    console.log('dfdf');
    speakerController.show(req, res);
});

/*
 * POST
 */
router.post('/', function(req, res) {
    speakerController.create(req, res);
});

/*
 * PUT
 */
router.put('/speakers/:id', function(req, res) {
    
    speakerController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function(req, res) {
    speakerController.remove(req, res);
});

/** my custom logic**/

/*
 * POST search cscv File
 */
router.get('/searchCSV', function(req, res) {
    speakerController.searchCSV(req, res);
});


/*
 * POST csv File
 */
 
router.post('/loadSpeakers',multipartMiddleware,function(req,res){
    console.log('loadSpeakers');
   speakerController.createCSV(req,res);
})


module.exports = router;

