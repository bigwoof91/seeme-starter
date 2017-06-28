import React, { Component } from 'react';
import { Link } from 'react-router';
import mui from 'material-ui';
import MdIconPack from 'react-icons/lib/md';
import MdPeople from 'react-icons/lib/md/people';
import MdTouchApp from 'react-icons/lib/md/touch-app';
import MdExitApp from 'react-icons/lib/md/exit-to-app';
const HeaderLogin = require('../auth/header-login')
const cookie = require('react-cookie');

const Header = React.createClass({
  renderLinks() {
    const user = cookie.load('user')
    console.log(user);
    if (user !== undefined) {
      return [
        <li key={`${1}header`}>
          <Link to="my-profile"><MdPeople className="nav-size" /></Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="sas"><MdTouchApp className="nav-size" /></Link>
        </li>,
        <li key={`${3}header`}>
          <Link to="logout"><MdExitApp className="nav-size" /></Link>
        </li>
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li>
          <HeaderLogin />
        </li>
      ];
    }
  },

  render: function () {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="nav-container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <span className="navbar-brand">{this.props.logo}</span>
            </div>

            <div className="collapse navbar-collapse" id="nav-collapse">
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
})

module.exports = Header;