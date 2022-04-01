
  
import React from 'react'
import './AuthPage.css';
import SigninForm from '../../components/forms/SigninForm/SinginForm';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm';

import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class AuthPage extends React.Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <div>
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">InvestProp</Navbar.Brand>
          </Navbar>
          <br/>

      <h5 className='text-center'>Start using this app by loging in</h5>
      <br/>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className='card'>
        <div class="card-body">
          {this.state.showLogin ? 
          <SigninForm setUserInState={this.props.setUserInState}/> : 
          <SignUpForm setUserInState={this.props.setUserInState} />}

          <div className='p-2'>
            <p onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
              {this.state.showLogin ? 'Not a member? Register' : 'Already have an account? Signin'}
            </p>
          </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}