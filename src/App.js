import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Header, Panel } from './components';
import { Row } from 'react-bootstrap';
import './App.css';

class App extends Component {
  getChildren() {
    return (
      <Router>
        <Switch>
          <Route path="/error" component={Error} />
        </Switch>
      </Router>
    );
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Trova - Booking Management</title>
        </Helmet>
        <Header />
        <Row>
          <Panel />
        </Row>
      </div>
    );
  }
}

export default App;
