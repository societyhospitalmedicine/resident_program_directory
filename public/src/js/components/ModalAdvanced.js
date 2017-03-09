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
    var mailAction = "mailto:"+this.props.speaker.emailAddress+"?subject=SHM%20Chapter%20Speaker%20Request";
    return (
      <div>
       <span > <a
          href="#"
          onClick={ this.open}
        >
          	<strong>{this.props.speaker.lastName} {this.props.speaker.firstName}, {this.props.speaker.credentials}</strong></a> 
          	<br></br>
        </span>

        <Modal  show={this.state.showModal} onHide={this.close} >
          <Modal.Header >
            <Modal.Title>
                <strong className='text-color-green'> {this.props.speaker.lastName} {this.props.speaker.firstName}, {this.props.speaker.credentials}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Row>
              <Col  sm={6}  >
                <p><strong>Company:</strong> {this.props.speaker.company}</p>
                <p><strong>City, State:</strong> {this.props.speaker.cityState}</p>
                <p><strong>Chapter Location:</strong> {this.props.speaker.chapterLocation}</p>
                <p><strong>Specialty:</strong> {this.props.speaker.specialty}</p>
                <p><strong>Email Address:</strong> {this.props.speaker.emailAddress}</p>
                <p><strong>Topic(s):</strong> {this.props.speaker.topics}</p>
                <p><strong>Chapter Location:</strong> {this.props.speaker.chapterLocation}</p>
                <p><strong>Topic Category:</strong> {this.props.speaker.categories}</p>
              </Col>
              <Col  sm={6}  >
                <p><strong>Honorarium:</strong> {this.props.speaker.honorarium}</p>
                <p><strong>Cost:</strong> {this.props.speaker.cost}</p>
                <p><strong>Travel:</strong> {this.props.speaker.willingToTravel}</p>
                <p><strong>Chapters Presented at:</strong> {this.props.speaker.chaptersPresentedAt}</p>
              </Col>
            </Row>
            <Row>
              <Col  sm={12} style={{marginTop:'30px'}}>
                <form method="post" action={mailAction} >
                  <Button type="submit"  className="center-block background-green" bsStyle="success" bsSize="large">Email Speaker</Button>
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