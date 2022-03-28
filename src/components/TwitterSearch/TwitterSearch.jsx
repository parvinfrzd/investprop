import React, { Component } from 'react';
import './TwitterSearch.css'

export default class TwitterSearch extends Component {
    state = {
        hashtag1:'', 
        location:'toronto', 
        radius:'',
        count:'',
        error:'', 
        tweets:[]
    }; 

    fetchTweets = async () => {
        try {
            const jsonTwitter = await fetch('/api/twitter')
            let twitRes = await jsonTwitter.json()
            if (!jsonTwitter.ok) throw new Error("Couldn't fetch Tweets")
            this.setState({ tweets: twitRes});
            console.log(this.tweets)
        } catch (error) {
            console.error('ERROR: ', error);
        }
    }

    // async componentDidMount() {
    //     this.fetchTweets();
    // }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value, 
            error:''
        });
    }

    handleSubmit = async (evt) => {
        evt.preventDefault(); 
        try {
            const reqBody = {
                hashtag1: this.state.hashtag1, 
                location: this.state.location, 
                radius: this.state.radius, 
                count: this.state.count, 
            };

            const url = '/api/twitter';

            const options = {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(reqBody)
            };

            const fetchResponse = await fetch(url,options)

            console.log(fetchResponse);

            if(!fetchResponse.ok) throw new Error('Fetch Failed - Bad Request')

            let serverResponse = await fetchResponse.json()

            console.log("Success Search", serverResponse); 

            this.setState({
                hashtag1:'', 
                location:'toronto', 
                count:'',
                radius:'',
            })
            this.fetchTweets();
        }catch(e) {
            console.log("Tweet search error", e)
            this.setState({ error: 'Search failed' });
        }
    }

   

    render() {
        return(
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <label>Hashtag</label>
                    <input type="text" name="hashtag1" value={this.state.hashtag1} onChange={this.handleChange} />
                    <label>City:</label>
                    <select name="location" value={this.state.location} onChange={this.handleChange}>
                        <option value="toronto">Toronto</option>
                        <option value="losangeles">Los Angeles</option>
                        <option value="sydney">Sydney</option>
                        <option value="london">London</option>
                        <option value="newdelhi">New Delhi</option>
                        <option value="berlin">Berlin</option>
                        <option value="madrid">Madrid</option>
                        <option value="rome">Rome</option>
                        <option value="paris">Paris</option>
                    </select>
                    <label>Radius:</label>
                    <input type="text" name="radius" pattern="[0-9]*" onInput={this.handleChange} value={this.state.radius} />
                    <label>How many recent tweets?</label>
                    <input type="text" name="count" pattern="[0-9]*" onInput={this.handleChange} value={this.state.count} />
                    <button type="submit">Search</button>
                </form>
                <div>
                    {this.state.tweets.length > 0 ? 
                    this.state.tweets.map(tweet =>  <li>-----{tweet.text}-----{tweet.author}</li>)
                    :
                    <p>Add some Twitter!!</p>
                    }
                </div>
            </div>
        )
    }
}