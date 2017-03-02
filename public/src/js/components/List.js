// import React from 'react';
var React = require('react');

var List = React.createClass({
  render: function(){
    	var listItems = this.props.items.map(function(item, index)  {
			return (
				<li key={index} className='list-group-item'>
					<span
						className='glyphicon glyphicon-remove' value={index}
					
						onClick={this.props.remove}>
						X
					</span>
					<span >{item}</span>
				</li>
			);
		}.bind(this));

		return (
			<ul >
				{listItems}
			</ul>
		);
	}
});

module.exports = List