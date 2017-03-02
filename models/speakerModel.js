var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var Schema   = mongoose.Schema;

var speakerSchema = new Schema({
	"lastName" : String,
	"firstName" : String,
	"credentials" : String,
	"company" : String,
	"cityState" : String,
	"chapterLocation" : String,
	"specialty" : String,
	"emailAddress" : String,
	"topics" : [String], // use to be Array
	"categories" : [String], // use to be Array
	"honorarium" : String,
	"cost" : String,
	"willingToTravel" : String,
	"chaptersPresentedAt" : String,
	"chapterLeaderRating": String,
	"chapterLeaderSubmissionCount":String,
	"attendeeRating":String,
	"attendeeSubmissionCount":String
});

// give our schema text search capabilities 
speakerSchema.plugin(textSearch);
// add a text index to the tags array 
speakerSchema.index({ lastName: "text",
					  firstName: "text",
					  topics: "text",
					  categories:"text",
					  cityState:"text"
					},
					{
					  weights: {
    			 	  	lastName: 10,
       				  	firstName: 10,
       				  	cityState: 8,
       				  	topics: 5,
       				  	categories: 1
					  }
					  // name: "TextIndex"
					  });

module.exports = mongoose.model('speaker', speakerSchema);

module.exports.removeAll = function(){ 
						   		this.remove( { }, function(err,res){
	                        		if(err){
	                        			console.log(err);
	                        			return;
	                        		}
	                    		} );
							}
							

module.exports.csvToJSon = function(jsonArray){
								// function with conditional for chapter leader ratings
								function ratingSorter(ratingAttr,numberAttr,csvRating,csvNumber){
									if(this['Last Name'] !== ""){
										
										// conditional for chapter leader ratings
		                                if(isNaN(this[csvNumber]) || this[csvNumber]==='0' || this[csvNumber] ===''){
		                                	csvArray[csvArray.length-1][ratingAttr]='N/A',
		                                	csvArray[csvArray.length-1][numberAttr]='N/A'
		                                }else{
		                                	csvArray[csvArray.length-1][ratingAttr]=this[csvRating],
		                                	csvArray[csvArray.length-1][numberAttr]=this[csvNumber]
		                                }
									}
								}
						   		var csvArray = [];
	                            jsonArray.forEach(function(obj){
	                                if(obj['Last Name'] !== ""){
	      
	                                    csvArray.push({
	                                        lastName:obj['Last Name'],
	                                        firstName:obj['First Name'],
	                                        credentials: obj['Credentials'],
	                                        company: obj['Company'],
	                                        cityState: obj['City, State'],
	                                        chapterLocation: obj['Chapter Location'],
	                                        specialty: obj['Specialty'],
	                                        emailAddress: obj['Email Address'],
	                                        categories:[obj['Category']], 
	                                        topics:[obj['Topic(s)']],
	                                        honorarium: obj['Honorarium'],
	                                        cost:obj['Cost'],
	                                        willingToTravel:obj['Willing to Travel'],
	                                        chaptersPresentedAt:obj['Chapters Presented at']
	                                    });
	                                }
	                                else{
	                                    csvArray[csvArray.length-1]['categories'].push(obj['Category']);
	                                    csvArray[csvArray.length-1]['topics'].push(obj['Topic(s)']);
	                                }
	                                // conditional for Chapter Leader rating
	                                ratingSorter.call(obj,'chapterLeaderRating','chapterLeaderSubmissionCount','Chapter Leader Rating','Chapter Leader Submission Count');
	                                // conditional for Attendee
	                                ratingSorter.call(obj,'attendeeRating','attendeeSubmissionCount','Attendee Rating','Attendee Submission Count');
	                            });
	                            return csvArray;
							}
							

module.exports.saveCSV = function(jsonArray){ 
						 	jsonArray.forEach(function(obj){
	                        	this.create(obj, function(err, speaker) {
	                            	if (err) {
	                                    return err;
	                                }
	                                return speaker;
	                                        //callback(item);
	                                        //console.log(speaker)
	                                    });
	                                }.bind(this));
	                                return;
							}

 
 module.exports.filterByTopicCategory = function filterByTopicCategory(err,speakers){
                // to include \"Quality Improvement\"
                if(err) {
                    console.log(err);
                    return this.res.json(500, {
                        message: 'Error getting speaker.',
                        error: err
                    });
                }
              
                
                    return this.res.json({results:
                        //FILTER RESULTS
                        speakers.filter(
                            function(spk,ind,spkArr){
                               var filteredSpeakerCategories = spk.categories.map(function(category){return category.replace(/[^A-Za-z,]/g, ' ').trim()});
                               var found = filteredSpeakerCategories.indexOf(this.search_category.replace(/[^A-Za-z,]/g, ' ').trim());
                                if(found >-1){
                                    
                                    return spk;
                                }
                            }.bind(this))
                         }
                    );
               
                    
               
            }
    module.exports.unfilteredSearchResults = function unfilteredSearchResults(err, speakers){
    	return this.res.json({results:speakers});
    }