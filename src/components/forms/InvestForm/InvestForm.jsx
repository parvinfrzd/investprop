import React, { Component } from 'react';
import InvestmentList from '../../InvestmentList/InvestmentList';
export default class InvestForm extends Component {
    state = {
        name: '',
        description: '',
        value: '',
        address: '',
        error: '', 
        investment : []
    };
  
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value, 
            error: ''
            });
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
            InvestmentList.fetchInvestments();
        }catch(e){
            console.log("Investment error", e)
            this.setState({ error: 'Submit failed' });
        }
    }

      
  
    render() {
      return (
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



      );
    }
  }