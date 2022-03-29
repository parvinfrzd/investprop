import React, { Component } from 'react';

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // 1 - grab the form info
      const reqBody = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirm: this.state.confirm,
      }

      const url = '/api/users/signup'
      const options = {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody)
      }


      //2 - pass it to the backend & wait for the response check it
      const signupRes = await fetch(url, options)

      console.log(signupRes)

      // A -- Error --> throw error --> enter the catch block
      if (!signupRes.ok) throw new Error('Fetch Failed - Bad Request')

      // B --> OK -> convert response (token)
      const token = await signupRes.json()

      console.log(token)
      // 3 -> save the token in localStorage
      window.localStorage.setItem('token', token)

      // 4 --> decode the token to get access to the USER RECORD!!!!!!
      const userDoc = await JSON.parse(window.atob(token.split('.')[1])).user

      // 5 --> update the user state with the decoded user record
      this.props.setUserInState(userDoc)
    } catch (err) {
      console.log("SignupForm error", err)
      this.setState({ error: 'Sign Up Failed - Try Again' });
    }
  }

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="exampleInputName1">Name</label>
              <input type="text" class="form-control" id="exampleInputName1" name="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={this.state.password} onChange={this.handleChange} required />
            </div>
            <div class="form-group">
              <label for="exampleInputPasswor2">Confirm</label>
              <input type="password" className="form-control" id="exampleInputPassword2" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={disable}>SIGN UP</button>
          </form>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}