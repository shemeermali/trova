import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'react-bootstrap';
import './Panel.scss';
import { load as loadDataList } from '../../redux/actions/booking';
import PropTypes from 'prop-types';
import Tab from './../Tab/Tab';


class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingList: this.props.bookingReducer.dataList,
      request: [],
      service: [],
      payment: [],
      currentTab: 'request', 
      currentIndex: 0
    };
  }
  componentDidMount() {
    this.props.loadDataList().then((res) => {
      const tempRequestArray = [];
      const tempServiceArray = [];
      const tempPaymentArray = [];
      if (this.props.bookingReducer.dataList) {
        this.props.bookingReducer.dataList.bookings.map((item) => {
          if (item && !item.isRequestCompleted) {
            tempRequestArray.push(item)
          }
          if (item && (!item.isServiceCompleted && !item.isPayamentCompleted && item.isRequestCompleted)) {
            tempServiceArray.push(item)
          }
          if (item && (!item.isPayamentCompleted && item.isRequestCompleted && item.isServiceCompleted)) {
            tempPaymentArray.push(item)
          }
          return true;
        });
      }
      this.setState({
        bookingList: this.props.bookingReducer.dataList,
        request: tempRequestArray,
        service: tempServiceArray,
        payment: tempPaymentArray
      })
    });
  }

  getGrapgh(request, service, payment) {
    return (
      <div>
        <ul>
          <li style={{ backgroundColor: request ? '#9DCBDA' : '#DDDDDD' }}>1</li>
          <li style={{ backgroundColor: service ? '#9DCBDA' : '#DDDDDD' }}>2</li>
          <li style={{ backgroundColor: payment ? '#9DCBDA' : '#DDDDDD' }}>3</li>
        </ul>
      </div>
    );
  }

  getAvailabliltyTimes(availableTimes, activeStatus, sessionPrice) {
    const timeSlotArray = [];
    if (availableTimes && availableTimes.length > 0 && activeStatus !== 'payment') {
        for (let i = 0; i < availableTimes.length; i++) {
          timeSlotArray.push(
            <Col style={{ display: 'flex' }} key={availableTimes[i].date + i}>
              <Col style={{width: "5%"}}>
                {i === 0 && <img src="/ic_time.png" style={{ width: '34px' }} alt=""/>}
              </Col>
              <Col style={{ width: '50%', textAlign: 'left', paddingTop: '9px'}}>{availableTimes[i].date}</Col>
              <Col style={{ width: '45%', textAlign: 'left', paddingTop: '9px'}}>{availableTimes[i].time}</Col>
            </Col>
          );
        }
    } else {
      timeSlotArray.push(
        <Col style={{ display: '' }} key={Math.random()}>
          <Col style={{width: "100%", textAlign: 'left', fontSize: '18px', fontWeight: '500'}}>
            <span><img src="/ic_time.png" style={{ width: '34px' }} alt=""/>Invoice Item:</span>
          </Col>
          <Col style={{ display: 'flex', padding: '20px' }} key={Math.random()}>
            <Col style={{ width: '50%', textAlign: 'left', paddingTop: '9px', fontSize: '20px', fontWeight: '500'}}>Session Price</Col>
            <Col style={{ width: '45%', textAlign: 'right', paddingTop: '9px', fontSize: '22px', fontWeight: '500', color: 'rgb(241, 94, 57)'}}>${sessionPrice.toFixed(2)}</Col>
          </Col>

        </Col>
      );
    }
    return timeSlotArray;
  }

  getServiceInfo() {
    const currentTab = this.state.currentTab;
    const currentIndex = this.state.currentIndex;
    const booking = this.state[currentTab][currentIndex];
    const paginationArray = [];
    console.log('here current tab ===', currentTab);
    console.log('ccc index', currentIndex);
    console.log('curent state', this.state[currentTab]);
    if (this.state[currentTab] && this.state[currentTab].length > 0) {
        for (let i = 0; i < this.state[currentTab].length; i++) {
          paginationArray.push(
            <div className="dot" onClick={() => {this.setActiveTab(currentTab, i)}} key={this.state.currentTab + i} style={{background: currentIndex === i ? 'green' : ''}} />
          );
        }
    }
    const dataDiv = [];
    if (booking) {
      let activeStatus = 'request';
      let sessionPrice = booking.rate;
      if (!booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) {
        activeStatus = 'request';
        sessionPrice = booking.rate;
      } else if (booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) {
        activeStatus = 'service';
        sessionPrice = booking.rate;
      } else{
        activeStatus = 'payment';
        sessionPrice = booking.rate;
      }
      dataDiv.push(
        <div key={booking.id}>
          <Row className="bookingServicePanel">
            <Col xs={6} md={6} className="serviceImageUrl"><img style={{width: '100%' }} src={booking.serviceImageUrl} alt=""/></Col>
            <Col xs={6} md={6} className="serviceDescripion">
              <Col className="title">{booking.title}</Col>
              <Col className="service-type">{booking.type}</Col>
              <Col className="service-description">{booking.description}</Col>
              <Row className="session_rate">
                <Col className="service-session">{booking.period}</Col>
                <Col className="service-rate">$ {booking.rate.toFixed(2)}</Col>
              </Row>
            </Col>
          </Row>
          <Row className="pagination-dots">
            {paginationArray}
          </Row>
          <Row className="bookingServicePanelMoreInfo">
            <Col className="request-status-info">
              <Col className="request-status">
              {(!booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) && 'Pending Request'}
              {(booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) && 'Upcoming Service'}
              {(booking.isRequestCompleted && booking.isServiceCompleted && !booking.isPayamentCompleted) && 'Pending Payment'}
                <p>{booking.upcomingServiceDate}</p>
              </Col>
              <Col className="request-status-graph">{this.getGrapgh(booking.isRequestCompleted, booking.isServiceCompleted, booking.isPayamentCompleted)}</Col>
            </Col>
            <Col className="requestByInfo">
              <Col className="requestByPicName">
                <Col className="image"><img style={{width: '75px' }} src={booking.requestByImage} alt=""/></Col>
                <Col className="name_location">
                  <Col className="name">{booking.requestBy}</Col>
                  <Col className="location">{booking.requestFrom}</Col>
                </Col>
              </Col>
              <Col className="deals">
                <Col className="dealsIcon"><img src="/ic_hand.png" alt=""/></Col>
                <Col className="dealsMesssage">{booking.dealMessage}</Col>
              </Col>
            </Col>
            <Col className="custText">
              {(!booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) && 'This Customer is available at:'}
              {(booking.isRequestCompleted && !booking.isServiceCompleted && !booking.isPayamentCompleted) && 'Please check in here or scan customer\'s QR code to check in when the service is about to start'}
              {(booking.isRequestCompleted && booking.isServiceCompleted && !booking.isPayamentCompleted) && 'Service is complete, please confirm payment amount:'}
            </Col>
            <Col className="availablity-times" key={booking.id} style={{ marginTop: '15px'}}>
              {this.getAvailabliltyTimes(booking.serviceRequestTime, activeStatus, sessionPrice)}
            </Col>
            {activeStatus !== 'payment' && <Col style={{ display: 'flex' }}>
              <Col style={{width: "5%"}}>
                <img src="/loc.png" style={{ width: '34px' }} alt=""/>
              </Col>
              <Col style={{ width: '50%', textAlign: 'left', paddingTop: '9px'}}>{booking.serviceRequestPlace}</Col>
            </Col>}
            {currentTab === 'request' && this.getActionRequestTabBtns(booking.id)}
            {currentTab === 'service' && this.getActionServiceTabBtns(booking.id)}
            {currentTab === 'payment' && this.getActionPaymentTabBtns(booking.id)}
          </Row>
        </div>
      );
    } else {
      dataDiv.push(
        <div key={Math.random()}>
          <Row className="bookingServicePanel">
          No more booking!
          </Row>
        </div>);
    }
    return (<div>{dataDiv}</div>);
  }

  getActionRequestTabBtns(bookingId) {
    return (
      <Col className="actionBtn">
        <button style={{ color: '#008AB8'}}>Reschedule</button> <button style={{ backgroundColor: '#008AB8', color: 'white'}} onClick={() => {this.setAcceptRequest(bookingId, 'request')}}>Accept Request</button> <button>More...</button>
      </Col>
    );
  }

  getActionServiceTabBtns(bookingId) {
    return (
      <Col className="actionBtn">
        <button style={{ color: '#008AB8'}}>Checkin</button> <button style={{ backgroundColor: '#008AB8', color: 'white'}} onClick={() => {this.setAcceptRequest(bookingId, 'service')}}>Generate Invoice</button> <button>More...</button>
      </Col>
    );
  }
  getActionPaymentTabBtns(bookingId) {
    return (
      <Col className="actionBtn">
        <button style={{ color: '#008AB8'}}>Start a Chat</button> <button style={{ backgroundColor: '#008AB8', color: 'white'}} >Resend Invoice</button> <button>More...</button>
      </Col>
    );
  }

  getTabData() {
    return (
      <Row>
        {this.getServiceInfo()}
      </Row>
    )
  }

  setActiveTab(selectedTab, index) {
    let addingIndex = 0;
    if (index > 0) {
      addingIndex = index;
    }
    if (selectedTab) {
      this.setState({
        currentTab: selectedTab,
        currentIndex: addingIndex
      });
    }
  }

  setAcceptRequest(bookingId, processType)  {
    let checkingIndex = 0;
    const tempRequestArray = [];
    const tempServiceArray = [];
    const tempPaymentArray = [];
    let nextTab = 'request';
    if (bookingId  && bookingId > 0) {
      if (this.state.bookingList.bookings) {
        this.state.bookingList.bookings.map((item, key) => {
          if (bookingId === item.id) {
            if (processType === 'request') {
              this.state.bookingList.bookings[key].isRequestCompleted = true;
              nextTab = 'service';
              checkingIndex = key;
            }
            if (processType === 'service') {
              this.state.bookingList.bookings[key].isServiceCompleted = true;
              nextTab = 'payment';
              checkingIndex = key;
            }
            if (processType === 'payment') {
              this.state.bookingList.bookings[key].isPayamentCompleted = true;
              nextTab = 'request';
            }
            
          }
          return true;
        });
      }
      if (this.state.bookingList.bookings) {
        this.state.bookingList.bookings.map((item) => {
          if (item && !item.isRequestCompleted) {
            tempRequestArray.push(item)
          }
          if (item && (!item.isServiceCompleted && !item.isPayamentCompleted && item.isRequestCompleted)) {
            tempServiceArray.push(item)
          }
          if (item && (!item.isPayamentCompleted && item.isRequestCompleted && item.isServiceCompleted)) {
            tempPaymentArray.push(item)
          }
          return true;
        });
      }
      if (tempRequestArray.length < checkingIndex) {
        checkingIndex = checkingIndex - 1;
      }
      if (tempServiceArray.length < checkingIndex) {
        checkingIndex = checkingIndex - 1;
      }
      if (tempPaymentArray.length < checkingIndex) {
        checkingIndex = checkingIndex - 1;
      }
    }
    console.log('makesure index', checkingIndex);
    this.setState(previousState => ({
      bookingList: previousState.bookingList,
      request: tempRequestArray,
      service: tempServiceArray,
      payment: tempPaymentArray,
      currentTab: nextTab,
      currentIndex: checkingIndex
    }));
  }

  render() {
    return (
      <Col key="test">
        <Tab setActiveTab={this.setActiveTab.bind(this)} key={this.state.currentTab} currentTab={this.state.currentTab} />
        {this.state.bookingList && this.getTabData()}
      </Col>
    );
  }
}

Panel.propTypes = {
  bookingReducer: PropTypes.object,
  loadDataList: PropTypes.func
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ loadDataList }, dispatch)
);

const mapStateToProps = state => ({
  bookingReducer: state.bookingReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Panel);