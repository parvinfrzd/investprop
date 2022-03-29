import "./LandInPage.css"
import React from 'react'
import { Link } from 'react-router-dom';
import InvestForm from "../../components/forms/InvestForm/InvestForm";
import TwitterSearch from "../../components/TwitterSearch/TwitterSearch";
import MarkPlaces from "../../components/MarkPlaces/MarkPlaces";
import InvestmentList from "../../components/InvestmentList/InvestmentList";
class LandInPage extends React.Component {
  
  render() {
    return (
      <main className="d-flex flex-column justify-content-around">
        <div className="d-flex flex-row justify-content-around">
          <InvestForm/>
          <MarkPlaces/>
        </div>
        <InvestmentList/>
        {/* <TwitterSearch/> */}
      </main>
    );
  }
}

export default LandInPage;