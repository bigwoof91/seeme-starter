import React, { Component } from 'react';
import { Link } from 'react-router';
import MdArrowUpward from 'react-icons/lib/md/arrow-upward';
import SwipeIcon from 'react-icons/lib/md/swipe-icon';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000/')
const ChatWindow = require('../chat/chatWindow');
const axios = require('axios');
const cookie = require('react-cookie');

function containsObject(obj, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].MatchID == obj.MatchID) {
      return true;
    }
  }
  return false;
};

const MatchList = React.createClass({

  getInitialState: function () {
    return ({
      chatWindows: [],
      matches: []
    })
  },

  componentWillMount: function () {
    let user = cookie.load('user');
    if (user !== undefined) {
      let url = 'http://localhost:3000/api/matches';
      let token = cookie.load('token');
      axios.post(url,
        { id: user._id },
        {
          headers: { Authorization: token }
        }).then((res) => {
          console.log(res)
          this.setState({
            matches: res.data
          });
        }).catch((err) => {
          console.log(err)
        });

      socket.on('connect', () => {
        let url = 'http://localhost:3000/api/see/update-socket'
        axios.put(url,
        { emailQuery: user.email, socket_id: socket.id },
        {
          headers: { Authorization: token }
        }).catch((err) => {
          console.log(err)
        });
      });

    } else {
      return false;
    }
  },

  renderList: function () {
    let user = cookie.load('user');
    if (user == undefined) {
      return (<div className="empty" />)
    } else if (user.matches.length === 0 && window.location.href !== 'http://localhost:8080/swatch') {
      return (
        <div className="match-list-container">
          <p>Your matches will display here. No matches yet.</p>
          <span>Click <Link to="/swatch" className="click-to-match"><SwipeIcon /></Link> To Start Making Matches!</span>
        </div>
      )
    } else if (user.matches.length === 0) {
      return (<div className="match-list-container">
        <p>Your matches will display here. No matches yet.</p>
      </div>)
    }

    else {
      return (
        <div className="match-list-container">
          {this.state.matches.map((item) => {
            // console.log(item);
            let urlId = 'http://localhost:8080/see/' + item._id;
            return (
              <div className="match">
                <Link to={urlId}>{item.firstName}</Link> |
              <span id={item._id} onClick={this.openChat.bind(this)}> Chat</span>
                <div className={"image " + (item.logged_in ? " online " : null)} />
              </div>)
          })}
        </div>);
    }
  },

  openChat: function (e) {
    e.preventDefault();
    let user = cookie.load('user');
    let Match = e.target.id

    if (this.state.chatWindows.length < 3 && !containsObject({ UID: user._id, MatchID: Match }, this.state.chatWindows)) {
      this.setState({
        chatWindows: this.state.chatWindows.concat(
          [{
            UID: user._id,
            MatchID: Match
          }]
        )
      });
    } else if (this.state.chatWindows.length >= 3 && !containsObject({ UID: user._id, MatchID: Match }, this.state.chatWindows)) {
      this.state.chatWindows.shift()
      this.setState({
        chatWindows: this.state.chatWindows.concat(
          [{
            UID: user._id,
            MatchID: Match
          }]
        )
      });
    }
  },

  closeChat: function (e) {
    let MatchID = e.target.id
    this.setState(
      {
        chatWindows: this.state.chatWindows.filter(
          (chat, MatchID) => {
            return chat.MatchID == MatchID;
          })
      }
    )
  },

  render: function () {
    return (
      <div>
        {this.renderList()}
        {this.state.chatWindows.map((item) => {
          return (<ChatWindow id={item.MatchID} handleClose={this.closeChat} user1={item.UID} user2={item.MatchID} />)
        })}
      </div>
    );
  }
})

module.exports = MatchList;