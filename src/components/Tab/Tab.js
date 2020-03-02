import React, { Component } from 'react';
// import { Logo } from 'components';
import { Row, Col } from 'react-bootstrap';
import './Tab.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';


class Tab extends Component {
  constructor(props) {
    super(props);
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  
  getTabs() {
    return(
      <Col className="bar-bar-items">
        <Col className="back-icon"><img src='/ic_back.png' alt='menu list' style={{ width: '45px'}} /></Col>
        <Col className="request-tab">
          <div className="request-tab-btn" onClick={() => {this.setActiveTab('request')}} style={{ textDecoration: this.props.currentTab === 'request' ? 'underline' : '' }}>Requests</div>
        </Col>
        <Col className="services-tab">
          <div className="services-tab-btn" onClick={() => {this.setActiveTab('service')}} style={{ textDecoration: this.props.currentTab === 'service' ? 'underline' : '' }}>Services</div>
        </Col>
        <Col className="payment-tab">
          <div className="payment-tab-btn" onClick={() => {this.setActiveTab('payment')}} style={{ textDecoration: this.props.currentTab === 'payment' ? 'underline' : '' }}>Payment</div>
        </Col>
      </Col>
    );
  }
  setActiveTab(tab) {
    this.props.setActiveTab(tab);
  }
  render() {
    return (
      <div>
        <Row className="tab-body">
          {this.getTabs()}
        </Row>
      </div>
    );
  }
}

Tab.propTypes = {
  setActiveTab: PropTypes.func,
  currentTab: PropTypes.string
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ }, dispatch)
);

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Tab);
