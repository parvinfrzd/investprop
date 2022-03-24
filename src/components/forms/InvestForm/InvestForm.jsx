import { Component } from 'react';
export default class InvestForm extends Component {
    state = {
        name: '',
        description: '',
        value: '',
        error: ''
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
        }catch(e){
            console.log("Investment error", e)
            this.setState({ error: 'Submit failed' });
        }
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
          </div>

      );
    }
  }