var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var Schema   = mongoose.Schema;

var speakerSchema = new Schema({
	"residencyProgramName" : String,
	"programType" : String,
	"programDirectorName" : String,
	"programDirectorEmail" : String,
	"programDirectorNumber" : String,
	"contactFirstName" : String,
	"contactLastName" : String,
	"contactTitle" : String,
	"cityState" : String,
	"city": String,
	"state": String,
	"zip": String,
	"phone": String,
	"email": String,
	"hmTrack": String,
	"website": String,
	"address" : String,
});

// give our schema text search capabilities 
speakerSchema.plugin(textSearch);
// add a text index to the tags array 
speakerSchema.index({ residencyProgramName: "text",
					  programType: "text",
					  hmTrack:"text",
					  city:"text",
					  state:'text',
					  programType:'text'
					},
					{
					  weights: {
    			 	  	residencyProgramName: 10,
       				  	city: 8,
       				  	state:8,
       				  	hmTrack: 5,
       				  	programType: 4
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
	                                // if(obj['Last Name'] !== ""){
	    								Object.keys(obj).forEach((key)=>{
	    									console.log('here! ',obj[key])
	    									if(typeof obj[key] === "string" ){
	    										obj[key].replace('�','') ;
	    									}
	    								})
	                                    csvArray.push({
	                                        residencyProgramName:obj['Residency Program Name'],
	                                        programType:obj['Program Type'],
	                                        programDirectorName:obj['Program Director Name'],
	                                        programDirectorEmail:obj['Program Director Email'],
	                                        programDirectorNumber:obj['Residency Program Number'],
	                                        contactFirstName:obj['Contact First Name'],
	                                        contactLastName:obj['Contact Last Name'],
	                                        contactTitle:obj['Contact Title'],
	                                        address:obj['Address 1'],
	                                        city:obj['City'],
	                                        state:obj['State'],
	                                        zip: obj['Zip'],
	                                        phone: obj['Phone'],
	                                        email: obj['Email'],
	                                        hmTrack: obj['HM Track'],
	                                        website: obj['Website']
	                                    });
	                                // }
	                                // else{
	                                //     csvArray[csvArray.length-1]['categories'].push(obj['Category']);
	                                //     csvArray[csvArray.length-1]['topics'].push(obj['Topic(s)']);
	                                // }
	                                // // conditional for Chapter Leader rating
	                                // ratingSorter.call(obj,'chapterLeaderRating','chapterLeaderSubmissionCount','Chapter Leader Rating','Chapter Leader Submission Count');
	                                // // conditional for Attendee
	                                // ratingSorter.call(obj,'attendeeRating','attendeeSubmissionCount','Attendee Rating','Attendee Submission Count');
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
              
                return this.res.json({results:speakers});
                    // return this.res.json({results:
                    //     //FILTER RESULTS
                    //     speakers.filter(
                    //         function(spk,ind,spkArr){
                    //           var filteredSpeakerCategories = spk.categories.map(function(category){return category.replace(/[^A-Za-z,]/g, ' ').trim()});
                    //           var found = filteredSpeakerCategories.indexOf(this.search_category.replace(/[^A-Za-z,]/g, ' ').trim());
                    //             if(found >-1){
                                    
                    //                 return spk;
                    //             }
                    //         }.bind(this))
                    //      }
                    // );
               
                    
               
            }
    module.exports.unfilteredSearchResults = function unfilteredSearchResults(err, speakers){
    	return this.res.json({results:speakers});
    }