var speakerModel = require('../models/speakerModel.js');
var async = require('async');
var fs = require('fs');

// speakerModel.collection.createIndex( { residencyProgramName: "text" } )
/**
 * speakerController.js
 *
 * @description :: Server-side logic for managing speakers.
 */
module.exports = {

    /**
     * speakerController.list()
     */
    list: function(req, res) {
        speakerModel.find(function(err, speakers){
            if(err) {
                return res.json(500, {
                    message: 'Error getting speaker.'
                });
            }
            return res.json(speakers);
        });
    },

    /**
     * speakerController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        speakerModel.findOne({_id: id}, function(err, speaker){
            if(err) {
                return res.json(500, {
                    message: 'Error getting speaker.'
                });
            }
            if(!speaker) {
                return res.json(404, {
                    message: 'No such speaker'
                });
            }
            return res.json(speaker);
        });
    },

    /**
     * speakerController.create()
     */
    create: function(req, res) {
        var speaker = new speakerModel({
			lastName : req.body.lastName,
			firstName : req.body.firstName,
			credentials : req.body.credentials,
			company : req.body.company,
			cityState : req.body.cityState,
			chapterLocation : req.body.chapterLocation,
			specialty : req.body.specialty,
			emailAddress : req.body.emailAddress,
			topics : req.body.topics,
			categories : req.body.categories,
			honorarium : req.body.honorarium,
			cost : req.body.cost,
			willingToTravel : req.body.willingToTravel,
			chaptersPresentedAt : req.body.chaptersPresentedAt
        });

        speaker.save(function(err, speaker){
            if(err) {
                return res.json(500, {
                    message: 'Error saving speaker',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: speaker._id
            });
        });
    },

    /**
     * speakerController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        speakerModel.findOne({_id: id}, function(err, speaker){
            if(err) {
                return res.json(500, {
                    message: 'Error saving speaker',
                    error: err
                });
            }
            if(!speaker) {
                return res.json(404, {
                    message: 'No such speaker'
                });
            }

            speaker.lastName =  req.body.lastName ? req.body.lastName : speaker.lastName;
			speaker.firstName =  req.body.firstName ? req.body.firstName : speaker.firstName;
			speaker.credentials =  req.body.credentials ? req.body.credentials : speaker.credentials;
			speaker.company =  req.body.company ? req.body.company : speaker.company;
			speaker.cityState =  req.body.cityState ? req.body.cityState : speaker.cityState;
			speaker.chapterLocation =  req.body.chapterLocation ? req.body.chapterLocation : speaker.chapterLocation;
			speaker.specialty =  req.body.specialty ? req.body.specialty : speaker.specialty;
			speaker.emailAddress =  req.body.emailAddress ? req.body.emailAddress : speaker.emailAddress;
			speaker.topics =  req.body.topics ? req.body.topics : speaker.topics;
			speaker.categories =  req.body.categories ? req.body.categories : speaker.categories;
			speaker.honorarium =  req.body.honorarium ? req.body.honorarium : speaker.honorarium;
			speaker.cost =  req.body.cost ? req.body.cost : speaker.cost;
			speaker.willingToTravel =  req.body.willingToTravel ? req.body.willingToTravel : speaker.willingToTravel;
			speaker.chaptersPresentedAt =  req.body.chaptersPresentedAt ? req.body.chaptersPresentedAt : speaker.chaptersPresentedAt;
			
            speaker.save(function(err, speaker){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting speaker.'
                    });
                }
                if(!speaker) {
                    return res.json(404, {
                        message: 'No such speaker'
                    });
                }
                return res.json(speaker);
            });
        });
    },

    /**
     * speakerController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        speakerModel.findByIdAndRemove(id, function(err, speaker){
            if(err) {
                return res.json(500, {
                    message: 'Error getting speaker.'
                });
            }
            return res.json(speaker);
        });
    },
    
    /**
     * speakerController.createCSV()
     */
    createCSV: function(req,res){ 
                fs.readFile(req.files.displayCSV.path, function (err, data) {
                    speakerModel.removeAll();
                    var newPath =  "./csv/speakers.csv";
                    fs.writeFile(newPath, data, function (err) {
                        //Converter Class 
                        var Converter = require("csvtojson").Converter;
                        var converter = new Converter({});
                    
                        // end_parsed will be emitted once parsing finished 
                        converter.on("end_parsed", function (jsonArray) {
                            var csvArray = speakerModel.csvToJSon(jsonArray);
                            speakerModel.saveCSV(csvArray)
                         });
                        
                        //read from file 
                        require("fs").createReadStream("./csv/speakers.csv").pipe(converter);
                        
                        // redirect back
                        res.redirect("back");
                  });
                }); 
                
                
         },
         
    /**
    * speakerController.searchCSV()
    */
    searchCSV: function(req, res) {
        
        // initializing variables to allow them to go into callbacks
        // where callback functions are stored in models
        var search_category;  
        var search_main; 
        this.search_main = search_main;
        this.search_category = search_category;
        this.res = res;
        
        // CONDITIONAL FOR MAIN SEARCH
         if(!req.query.search_main || req.query.search_main===""){
            this.search_main="";
        }else{
          this.search_main  = req.query.search_main.replace(/[^A-Za-z,]/g, ' ').trim();
        }
        // CONDITIONAL FOR CATEGORY SEARCH
        
        if(!req.query.search_category || req.query.search_category ==="" ){
            this.search_category="";
        }else{
            //search_category = '\"'+req.query.search_category.replace(/\s+/g,' ').trim()+'\"' ;
            this.search_category=req.query.search_category.replace(/\s+/g,' ').trim();
        }
        
        
        
        //CONDITIONAL FOR IF THERE IS A SEARCH_CATEGORY IN SEARCH OR NOT
        if(this.search_main ==="" && this.search_category!==""){
            var speakers = speakerModel.find( {hmTrack:this.search_category}, 
                                            speakerModel.filterByTopicCategory.bind(this) )
                                            
        }
        else if(this.search_main !=="" && this.search_category!==""){ 
             var speakers = speakerModel.find( { $text: { $search: this.search_main} },{hmTrack:this.search_category},
                                            {'score': {'$meta': 'textScore'}}, 
                                            speakerModel.filterByTopicCategory.bind(this) )
                                            .sort( { score: { $meta: "textScore" } } )
        }else{
             var speakers = speakerModel.find( { $text: { $search: this.search_main} },
                                            {'score': {'$meta': 'textScore'}}, 
                                            speakerModel.unfilteredSearchResults.bind(this) )
                                            .sort( { score: { $meta: "textScore" } } )
        }
        
        
        
            
           
    }
};
