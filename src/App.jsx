import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage'
import LandInPage from './pages/LandInPage/LandInPage';
import UserLogOut from './components/UserLogOut/UserLogOut';

// import LandinPage from './components/LandinPage/LandinPage';
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

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
      console.log(this.user)  
   
    }
  }

  logoutUser = () => {
    this.setState({ user : null});
  }

  render() {
    return (
      this.state.user ?
            <div>
              <Navbar bg="primary" variant="dark">
                <UserLogOut logoutUser={this.logoutUser}/>
              </Navbar>
              <br />
              <LandInPage />
            </div>
            :
            <AuthPage setUserInState={this.setUserInState} />
    );
  }
}

export default App;
