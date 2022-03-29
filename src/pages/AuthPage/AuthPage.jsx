
  
import React from 'react'
import './AuthPage.css';
import SigninForm from '../../components/forms/SigninForm/SinginForm';
import SignUpForm from '../../components/forms/SignUpForm/SignUpForm';


export default class AuthPage extends React.Component {
  state = {
    showLogin: true,
  }

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        
        {/* Another ternary operator! */}
        {/* If showLogin is true, show the login form. If false, show the signup form */}
        {this.state.showLogin ? 
        <SigninForm setUserInState={this.props.setUserInState}/> : 
        <SignUpForm setUserInState={this.props.setUserInState} />}

        <div className='p-2'>
          <p onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
            {this.state.showLogin ? 'Not a member? Register' : 'Already have an account? Signin'}
          </p>
        </div>
      </div>
    );
  }
}