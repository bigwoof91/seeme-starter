
const React = require('react');
import { Link } from 'react-router';

const UserInfo = React.createClass({
  render() {
    return (
      <div className="user-info">
        <div className="edit-container">
          
        </div>
        <div className="user-info-text">
        <label>My name is:</label>
          <h3>{this.props.firstName}</h3>
          <label>I am a:</label>
          <h3>{this.props.is_male}</h3>
          <label>My age:</label>
          <h3>{this.props.age}</h3>
          <label>I am looking to meet a {this.props.seeking_male} between the ages:</label>
          <h3>{this.props.age_pref_min} and {this.props.age_pref_max}</h3>
        </div>
      </div>
    );
  }
})

module.exports = UserInfo;