var React = require('react');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
// var AddItem = require('./AddItem');
var SearchResults = require('./SearchResults');
var SearchBar = require('./SearchBar');
// var todoStore = require('../stores/todoStore');
var speakerStore = require('../stores/speakerStore');
var todoActions = require('../actions/todoActions');
var apiSpeakers = require('../api/apiSpeakers');
// var speakerActions = require('../actions/speakerActions');
var SpeakerContainer = React.createClass({
  getInitialState: function(){
 
    return {
      list: speakerStore.getList()
    }
  },

  componentDidMount: function(){
    
    speakerStore.addChangeListener(this._onChange);
    apiSpeakers.loadSpeakers();
    
  },
  componentWillUnmount: function(){
    speakerStore.removeChangeListener(this._onChange);
  },
  handleAddItem: function(newItem){
    newItem = newItem.target.parentNode.getElementsByTagName('input')[0].value;
    todoActions.addItem(newItem);
  },
  handlePagination: function(e){

  },
  handleSearchSpeakers: function(e){

    e.preventDefault();
    var name = document.getElementById('name-input').value;
    var cityState = document.getElementById('cityState-input').value;
    var topic = document.getElementById('topics-input').value;
    var search_category = document.getElementById('categories-input').value; 
    console.log(name, cityState, topic, search_category);
    ( search_category === "Hospital Medicine Track") ? search_category="" : search_category;
    var search_main = (name+ " "+cityState+" "+topic).trim();
    
    if((search_category ==="" ||search_category ===null) && (search_main ===""|| search_main===null)){
      apiSpeakers.loadSpeakers();
    }else{
      apiSpeakers.searchSpeakers(search_category, search_main);
    }
  },
  handleRemoveItem: function(index){
    todoActions.removeItem(index);
  },
  _onChange: function(){
    this.setState({
      list: speakerStore.getList()
    })
  },
  render: function(){
    var activePage = this.state.list.activePage;
    //get the length of pagination
    var  length = 0
    var spkObj = this.state.list;
    for (var key in spkObj) {
        if (spkObj.hasOwnProperty(key)) length++;
    }
    // subtract one to account for the activePage attribute
    length = length-1;
    return (
      <div className="">
        
        <Row className="show-grid">
					<Col  sm={12}  >
              <h3 className="" style={{color:'#8BC216'}}>Chapter Speaker Directory</h3>
          </Col>
        </Row>
          <SearchBar search={this.handleSearchSpeakers}/>
          <SearchResults speakers={this.state.list[activePage]} activePage={activePage} pagLength={length} remove={this.handleRemoveItem} />
      
      </div>
    )
  }
});

module.exports = SpeakerContainer;