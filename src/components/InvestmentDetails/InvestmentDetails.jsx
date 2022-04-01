import './InvestmentDetails.css';
import React, { Component} from 'react';
export default class InvestmentDetails extends Component {
    state = {
        name:'',
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

    handleChange = (evt) => {this.setState({ [evt.target.name]: evt.target.value  });}


    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const reqBody = {
                name: this.state.name
            }
            let fetchResponse = await fetch("/api/searchInvestment",{
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(reqBody)
            })
            let serverResponse = await fetchResponse.json()
            console.log("search successful", serverResponse); 
            this.setState({
                name: '', 
                investments: serverResponse
            })
        }catch(e){
            console.log("Investment error", e)
            this.setState({ error: 'Submit failed' });
        }
    }

    async componentDidMount() {
        this.fetchInvestments();
    }
    render() {

        return ( 
            <div >
                <br></br>
                <h1 className="list-card-title">List of investments:</h1>
                <br></br>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <label className="form-label" for="form5Example1">Name:</label>
                        <input type="text" className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2">Search</button>
                </form>
                <br/>
            <div className="InvestScrollStyle">
                <div className="container">
                    <div className="row">
                    {this.state.investments.length > 0 ? 
                        this.state.investments.map(inv =>  
                            <div class="col-sm">
                            <div className="card investment-card">
                                <img class="card-img-top" src="/images/placeholder.png" alt="Card image cap"/>
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
                            </div>
                            </div>)
                    :
                    <p>Add some investments!!</p>
                    }
                    </div>
                    </div>
          </div>
          </div>
        );
      }

}

