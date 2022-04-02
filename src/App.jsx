import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage'
import LandInPage from './pages/LandInPage/LandInPage';
import UserLogOut from './components/UserLogOut/UserLogOut';

// import LandinPage from './components/LandinPage/LandinPage';
import { Navbar, Nav, Container  } from 'react-bootstrap';
import TwitterSearch from './pages/TwitterSearch/TwitterSearch';
import InvestmentDetails from './components/InvestmentDetails/InvestmentDetails';

class App extends Component {
  state = {
    user: null,
    username: '',
    useremail: '',
  }

  setUserInState = (incomingUserData) => {
    this.setState({ user: incomingUserData,username: incomingUserData.name, useremail: incomingUserData.email })
  }

  componentDidMount = async () => {
    let token = localStorage.getItem('token')
    if (token) {
      let userDoc = await JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      this.setState({user: userDoc, username: userDoc.name, useremail: userDoc.email})    
    }
  }

  userLogOut = () => {
    localStorage.removeItem('token');
    this.setState({user: null})      
  }

  render() {
    return (
      this.state.user ?
            <div>
              <Navbar className='container-fluid' expand="lg" bg="dark" variant="dark">
              {/* <Container> */}
              <Nav className="me-auto">
                <Navbar.Brand href="#home"><h4 className="linkText">Investprop</h4></Navbar.Brand>
                <Nav.Link href="#" ><h5 className="linkText">Hello {this.state.username}</h5></Nav.Link>
                <Nav.Link href="/">My Dashboard</Nav.Link>
                <Nav.Link href="/twits">Search News</Nav.Link>
                <Nav.Link href="/invests">View all investments</Nav.Link>
              </Nav>
              <br></br><br></br>
              <Nav>
                <UserLogOut logoutUser={this.userLogOut}/>
              </Nav>
              {/* </Container> */}

              </Navbar>

              <Routes>
                  <Route path='/' element={<LandInPage />}/>
                  <Route path='/twits'element={<TwitterSearch />}/>
                  <Route path='/invests'element={<InvestmentDetails />}/>

              </Routes>  
            </div>
            :
            <div>
            
            <AuthPage setUserInState={this.setUserInState} />
            </div>
    );
  }
}

export default App;
