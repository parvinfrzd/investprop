import "./LandInPage.css"
import React from 'react'
import InvestForm from "../../components/forms/InvestForm/InvestForm";
import MarkPlaces from "../../components/MarkPlaces/MarkPlaces";
import InvestmentList from "../../components/InvestmentList/InvestmentList";
class LandInPage extends React.Component {
  
  render() {
    return (
      <main className="d-flex flex-column justify-content-around landin">
        <div className="d-flex flex-row justify-content-around">
          <InvestForm/>
          <MarkPlaces/>
        </div>
        <InvestmentList/>
      </main>
    );
  }
}

export default LandInPage;