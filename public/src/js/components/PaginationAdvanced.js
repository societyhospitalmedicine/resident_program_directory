'use strict';
var React = require('react');
var ReactBoostrap = require('react-bootstrap');
var Pagination = ReactBoostrap.Pagination;
var todoActions = require('../actions/todoActions');
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var PaginationAdvanced = React.createClass({

  handleSelect: function(event, selectedEvent) {
    todoActions.changePagination(selectedEvent.eventKey);
  },


  render: function() {

    return (
      	<Row className="show-grid">
					<Col smOffset={4} sm={5}  >
            <Pagination
              prev
              next
              items={this.props.pagLength}
              activePage={this.props.activePage}
              onSelect={this.handleSelect} />
          	</Col>
				</Row>
    );
  }
});

module.exports = PaginationAdvanced;