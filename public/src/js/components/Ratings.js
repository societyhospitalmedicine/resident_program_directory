// import React from 'react';
var React = require('react');
var _ = require('lodash');
var Ratings= React.createClass({
  
  render: function(){
  	var ratings = function(numberOfStars){
		  	var stars =	_.range(5).map(
								  		function(index){
								  			if(index-1<numberOfStars){
								  					return <span key={index} className="glyphicon glyphicon-star" style={{color:'#f7c105'}} aria-hidden="true"></span>;
								  			}else{
								  				return <span key={index} className="glyphicon glyphicon-star" style={{color:'#ebebeb'}} aria-hidden="true"></span>;
								  			}
								  	}.bind(this));
				return stars;
  	}
		return (
		            <div >
            				<span>
            					<strong>Chapter Leader Rating:</strong> {ratings(this.props.chapterLeaderRating)} ({this.props.chapterLeaderSubmissionCount} ratings)<br></br>
            					<strong>Attendee Rating:</strong> {ratings(this.props.attendeeRating)} ({this.props.attendeeSubmissionCount} ratings)<br></br>
            				</span><br></br>
                    </div>
            	);
	}
});

module.exports = Ratings;