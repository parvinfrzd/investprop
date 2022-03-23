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
        }catch(e){
            console.log("Investment error", e)
            this.setState({ error: 'Submit failed - Try Again' });
        }
        console.log('An investment was submitted: ' + this.state.name);
        console.log('An investment was submitted: ' + this.state.description);
        console.log('An investment was submitted: ' + this.state.price);
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