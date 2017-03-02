// import React from 'react';
var React = require('react');
var _ = require('lodash');
var ReactBootstrap = require('react-bootstrap');
var PaginationAdvanced = require('./PaginationAdvanced');
var ModalAdvanced  = require('./ModalAdvanced');
var Col = ReactBootstrap.Col;
var Row = ReactBootstrap.Row;

var SearchResults = React.createClass({
  
  render: function(){
    	
        var results = function(){
        		if(!this.props.speakers || this.props.speakers.length===0){
				  return(
				  		<Row className="show-grid" style={{height:"630px"}}>
								<Col smOffset={1} sm={5}  >
				  					<p>NO RESULTS: Try another search!</p>
				  				</Col>
				  		</Row>
				  	)
				}else{     
					var listSpeakers = this.props.speakers.map(function(speaker, index)  {
						return (
							<li key={index} className='list-group-item' style={{border:0}}>
								<ModalAdvanced speaker={speaker}/>
								<p style={{marginBottom:"5px"}}><strong>Location:</strong> {speaker.cityState}</p>
								<span><strong>Topic(s):</strong> {_.sortedUniq(speaker.topics).join(', ')}</span><br></br>
								<span><strong>Topic Category:</strong> {_.sortedUniq(speaker.categories).join(', ')}</span><br></br>
							</li>
						);
					}.bind(this));
					// Divide the list array in half to display a split column view of results
					var half_length = Math.ceil(listSpeakers.length / 2); 
					var leftSide = listSpeakers;
					var rightSide = listSpeakers;
					rightSide= rightSide.splice(half_length,listSpeakers.length-1);
					leftSide = leftSide.splice(0,half_length);
					
					return(	
					
						<div>
							
							<Row className="show-grid" style={{height:"630px"}}>
								<Col smOffset={1} sm={5}  >
									<ul>
										{leftSide}
									</ul>
								</Col>
								<Col  sm={5}  >
									<ul>
										{rightSide}
									</ul>
								</Col >
							</Row>
							<PaginationAdvanced speakers={this.props.speakers} activePage={this.props.activePage} pagLength={this.props.pagLength}/>
						</div>
						)
				}
        }.bind(this)
		return (
			<div>
				<Row className="show-grid">
					<Col sm={12}  >
						<h3 >Results:</h3>
					</Col>
				</Row>
				{results()}
			</div>
		);
	}
});

module.exports = SearchResults