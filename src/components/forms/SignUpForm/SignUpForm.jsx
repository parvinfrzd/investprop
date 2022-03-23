import { Component } from 'react';

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
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }
}