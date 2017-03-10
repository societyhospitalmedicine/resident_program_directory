var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tooltip;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var todoActions = require('../actions/todoActions');

var ModalAdvanced = React.createClass({

  getInitialState: function() {
    return { showModal: false };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  },

  render: function(){
    var popover = <Popover id="myPopover" title="popover">very popover. such engagement</Popover>;
    var tooltip = <Tooltip id='myTooltip'>wow.</Tooltip>;
    var mailAction = "mailto:"+this.props.speaker.programDirectorEmail+"?subject=SHM%20Chapter%20Speaker%20Request";
    return (
      <div>
       <span > <a
          href="#"
          onClick={ this.open}
        >
          	<strong>{this.props.speaker.residencyProgramName}</strong></a> 
          	<br></br>
        </span>

        <Modal  show={this.state.showModal} onHide={this.close} >
          <Modal.Header >
            <Modal.Title>
                <strong className='text-color-green'> {this.props.speaker.residencyProgramName}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Row>
              <Col  sm={6}  >
                <p><strong>Address:</strong> {this.props.speaker.address}</p>
                <p><strong>City, State:</strong> {this.props.speaker.city}, {this.props.speaker.state}</p>
                <p><strong>Director name:</strong> {this.props.speaker.programDirectorName}</p>
                <p><strong>Phone #</strong> {this.props.speaker.phone}</p>
              </Col>
              <Col  sm={6}  >
                <p><strong>Contact Name:</strong> {this.props.speaker.contactFirstName} {this.props.speaker.contactLastName}</p>
                <p><strong>Contact Email:</strong> {this.props.speaker.email}</p>
                <p><strong>Hospital Medicine Track:</strong> {this.props.speaker.hmTrack}</p>
                <p><strong>Url:</strong> <a href={this.props.speaker.website} target='blank'>{this.props.speaker.residencyProgramName}</a></p>
              </Col>
            </Row>
            <Row>
              <Col  sm={12} style={{marginTop:'30px'}}>
                <form method="post" action={mailAction} >
                  <Button type="submit"  className="center-block background-green" bsStyle="success" bsSize="large">Email Director</Button>
                </form>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = ModalAdvanced;