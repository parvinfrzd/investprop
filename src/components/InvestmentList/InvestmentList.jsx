import './InvestmentList.css';
import React, { Component } from 'react';


export default class InvestmentList extends Component {
    state = {
       investments: []
    }

    fetchInvestments = async () => {
        try {
            const jsonInvestments = await fetch('/api/investments')
            let investmentRes = await jsonInvestments.json()
            if (!jsonInvestments.ok) throw new Error("Couldn't fetch investments")
            this.setState({ investments: investmentRes});
        } catch (error) {
            console.error('ERROR: ', error);
        }
    }

    async componentDidMount() {
        this.fetchInvestments();
    }
    render() {
        return (
            <div className="card list-card">
                <br/>
                <h1 class="list-card-title">List of investments:</h1>
            <div class="scrolling-wrapper">
                    {this.state.investments.length > 0 ? 
                        this.state.investments.map(inv =>  
                            <div className="card">
                                <div class="card-body">
                                    <h3 class="card-title">{inv.name}</h3>
                                    <br/>
                                    <h6 class="card-subtitle mb-2 text-muted">Info:</h6>
                                    <p class="card-text">{inv.description}</p>
                                    <h6 class="card-subtitle mb-2 text-muted">Address:</h6>
                                    <p class="card-text">{inv.address}</p>
                                    <h4 class="card-title">Price:</h4>
                                    <h5 class="card-title">$${inv.value}</h5>

                                </div>
                            </div>)
                    :
                    <p>Add some investments!!</p>
                    }
          </div>
          </div>
        );
      }

}

