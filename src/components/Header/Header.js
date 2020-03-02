import React, { Component } from 'react';
// import { Logo } from 'components';
// import {Image } from  '../Image';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Header.scss';


class Header extends Component {
  getIconImages() {
    return(
      <Col className="menu-bar-icon">
        <Col className="menu-list-icon"><img src='/ic_menu.png' alt='menu list' style={{ width: '45px'}} /></Col>
        <Col className="search-icon"><img src='/ic_search.png' alt='menu list' style={{ width: '45px'}} /></Col>
        <Col className="logo-icon"><img src='/ic_logo.png' alt='menu list' style={{ width: '70px'}} /></Col>
        <Col className="chat-icon"><img src='/ic_comment.png' alt='menu list' style={{ width: '45px'}}/></Col>
        <Col className="notification-icon"><img src='/ic_notification.png' alt='menu list' style={{ width: '45px'}}/></Col>
      </Col>
    );
  }
  render() {
    return (
      <div>
        <Row className="header-body">
          {this.getIconImages()}
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
