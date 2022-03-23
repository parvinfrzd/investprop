import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage'
import LandInPage from './pages/LandInPage/LandInPage';
// import LandinPage from './components/LandinPage/LandinPage';

class App extends Component {
  state = {
    user: null,
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData })
  }
  componentDidMount() {
    let token = localStorage.getItem('token')
    if (token) {
      // YOU DO: check expiry!
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc})      
    }
  }

  render() {
    return (
      this.state.user ?
            <LandInPage />
            :
            <AuthPage setUserInState={this.setUserInState} />
    );
  }
}

export default App;
