const React = require('react');

const Profile = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function(event) {
    event.preventDefault();
    this.context.router.replace("/");
  },

  render: function() {
    return (
      <div>
        <h1>Profile</h1>
      </div>
    );
  }
});

module.exports = Profile;
