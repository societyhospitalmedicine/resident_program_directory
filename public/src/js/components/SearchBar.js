// import React from 'react';
var React = require('react');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var SearchBar= React.createClass({
  
  render: function(){
  	 
		return (
		    <Row className="show-grid" id= "searchBar" style={{marginLeft:'10px',width:'95%', paddingTop:'20px'}} >
      		          <Input label="" help="" wrapperClassName="wrapper" >
                     
                        <Col xs={3}>
                    			<input type="text" name="main" id="name-input" className="form-control" placeholder="Name" /> 
                    		</Col>
                    		<Col xs={2}>
                    			<input type="text" name="main" id="cityState-input" className="form-control" placeholder="City, State" />
                    		</Col>
                    		<Col xs={3}>
                    			<input type="text" name="main" id="topics-input" className="form-control" placeholder="Topic" />
                    		</Col>
                    		<Col xs={4}>
                    			<select name="category" id="categories-input" style={{width:'70%',float:'left'}} className="form-control">
                    			    <option selected disabled style={{display:"none"}}>Topic Category</option>
                    			    <option value="All Topic Categories">All Topic Categories</option>
                                    <option value="Clinical Best Practices">Clinical Best Practices</option>
                                    <option value="Quality, Safety and Process Improvement">Quality, Safety and Process Improvement</option>
                                    <option value="Practice Management">Practice Management</option>
                                    <option value="Healthcare Policy/Advocacy">Healthcare Policy/Advocacy</option>
                                    <option value="Education, Academics and Research">Education, Academics and Research</option>
                          </select>
                          <div  style={{width:'65px',hieght:'65px', float:'right',position:'relative',bottom:'10px'}}>
                            <div className="round-button" onClick={this.props.search}><div className="round-button-circle background-green"><a href="#" className="round-button">Search</a></div></div>
                          </div>
                        </Col>
                       
                    </Input>
        </Row>
            		);
	}
});

module.exports = SearchBar;