import React, { Component, createContext } from 'react';
import { InvestmentProvider } from '../../../InvestmentContext'

export default class InvestForm extends Component {
    state = {
        name: '',
        description: '',
        value: '',
        address: '',
        error: '', 
        investments : []
    };
  
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value, 
            error: ''
            });
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

    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const reqBody = {
                name: this.state.name, 
                description: this.state.description, 
                address: this.state.address,
                value: this.state.value,
            }
            let fetchResponse = await fetch("/api/investments",{
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify(reqBody)
            })
            let serverResponse = await fetchResponse.json()
            console.log("Success submitting investment:", serverResponse); 
            this.setState({
                name: '',
                description: '',
                address: '',
                value: '',
            })
            this.fetchInvestments();
        }catch(e){
            console.log("Investment error", e)
            this.setState({ error: 'Submit failed' });
        }
    }

      
  
    render() {
        const { investments } = this.state.investments
        const { setInvestments } = this.fetchInvestments
      return (
        <InvestmentProvider value={{investments, setInvestments}}>
            <div className="card">
                <div class="card-body">
                    <h5 class="card-title">Add to your investment wishlist</h5>
                    <form className="form-outline mb-4" onSubmit={this.handleSubmit}>
                        <div class="form-group">
                            <label className="form-label" for="form5Example1">Name:</label>
                            <input type="text" id="form5Example1" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div class="form-group">
                            <label className="form-label" for="form5Example1">Description:</label>
                            <input type="text" id="form5Example1" className="form-control" name="description" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <div class="form-group">
                            <label className="form-label" for="form5Example1">Address:</label>
                            <input type="text" id="form5Example1" className="form-control" name="address" value={this.state.address} onChange={this.handleChange} />
                        </div>
                        <div class="form-group">
                        <label className="form-label" for="form5Example1">Price:</label>
                        <input type="text" id="form5Example1" className="form-control" name="value" pattern="[0-9]*" onInput={this.handleChange} value={this.state.value} />
                        </div>
                        <button className="btn btn-primary" type="submit">Add investment</button>
                    </form>
                </div>
            </div>
          </InvestmentProvider>



      );
    }
}