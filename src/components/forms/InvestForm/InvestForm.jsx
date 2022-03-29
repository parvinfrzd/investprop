import React, { Component } from 'react';
export default class InvestForm extends Component {
    state = {
        name: '',
        description: '',
        value: '',
        error: '', 
        investment : []
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
            this.setState({ investment: investmentRes});
        } catch (error) {
            console.error('ERROR: ', error);
        }
    }
  
    handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const reqBody = {
                name: this.state.name, 
                description: this.state.description, 
                value: this.state.value,
            }
            let fetchResponse = await fetch("/api/investments",{
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body : JSON.stringify({name: this.state.name, description: this.state.description, value:this.state.value})
            })
            let serverResponse = await fetchResponse.json()
            console.log("Success submitting investment:", serverResponse); 
            this.setState({
                name: '',
                description: '',
                value: '',
            })
            this.fetchInvestments();
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
        <div className="form-container">
              <form onSubmit={this.handleSubmit}>
                  <label>Name:</label>
                  <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                  <label>Description:</label>
                  <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                  <label>Value:</label>
                  <input type="text" name="value" pattern="[0-9]*" onInput={this.handleChange} value={this.state.value} />

                  <button type="submit">Submit</button>
              </form>
              <div>
                  {this.state.investment.length > 0 ? 
                //   <p>We have investments!!</p>
                    this.state.investment.map(inv =>  <li>{inv.name}-----{inv.description}-----{inv.value}</li>)
                  :
                  <p>Add some investments!!</p>
                  }
              </div>
          </div>



      );
    }
  }