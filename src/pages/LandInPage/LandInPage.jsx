import "./LandInPage.css"
import React from 'react'
import { Link } from 'react-router-dom';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import InvestForm from "../../components/forms/InvestForm/InvestForm";

class LandInPage extends React.Component {

  // initial state of the app when it first loads
  state = {
    menuCategories: [],
    activeCategory: "",
    lineItems: [],
    menuItems: [],
  }
  
  render() {
    return (
      <main className="LandInPage">
        <nav className="nav">
          <UserLogOut />
        </nav>
        <InvestForm/>
      </main>
    );
  }
}

export default LandInPage;