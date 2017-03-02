// import React from 'react';
var React = require('react');

var AddItem = React.createClass({
  render: function(){

		return (
			<div>
					Add User: <input type="text"   />
					<button  onClick={this.props.add}>submit</button>
			</div>
		);
	}
});

module.exports = AddItem;