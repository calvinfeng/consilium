const React = require('react');
const DateTimeField = require('react-bootstrap-datetimepicker');
const FormGroup = require('react-bootstrap').FormGroup;
const FormControl = require('react-bootstrap').FormControl;
const ControlLabel = require('react-bootstrap').ControlLabel;
const HelpBlock = require('react-bootstrap').HelpBlock;

const About = React.createClass({

  // contextTypes: {
  //   router: React.PropTypes.object.isRequired
  // },
  //
  // handleClick: function(event) {
  //   event.preventDefault();
  //   this.context.router.replace("/");
  // },
  
  getInitialState() {
    return {
      value: ''
    };
  },
  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render: function() {
    return (
      <div>
        <h1>About</h1>
        <p>This is a project built by three awesome App Academy graduate</p>
        <p>Hold on, I have more to add</p>
        <DateTimeField/>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
            >
            <ControlLabel>Name</ControlLabel>
            <FormControl type="text" value={this.state.value} placeholder="Enter text"
              onChange={this.handleChange}/>
            <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock>
          </FormGroup>
        </form>
      </div>
    );
  }
});

module.exports = About;
