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
        } catch (error) {
            console.error('ERROR: ', error);
        }
    }

    async componentDidMount() {
        this.setState({ tweets: []});
    }

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
         <div className="d-flex flex-row justify-content-around">
            <div className="d-flex flex-column justify-content-center align-items-center twit-form">
                <br></br>
                <div className='card'>
                    <div className='card-body'>
                        <h5> Search recent tweets based on hashtag and location</h5>
                        <br></br>
                        <br></br>
                        <form onSubmit={this.handleSubmit}>
                            <div class="form-group">
                                <label>Hashtag</label>
                                <input type="text" className="form-control" name="hashtag1" value={this.state.hashtag1} onChange={this.handleChange} />
                            </div>
                            <div class="form-group">
                                <label>City:</label>
                                <select name="location" className="form-control" value={this.state.location} onChange={this.handleChange}>
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
                            </div>
                            <div class="form-group">
                                <label>Radius:</label>
                                <input type="text" className="form-control" name="radius" pattern="[0-9]*" onInput={this.handleChange} value={this.state.radius} />
                            </div>
                            <div class="form-group">
                                <label>How many recent tweets?</label>
                                <input type="text" className="form-control" name="count" pattern="[0-9]*" onInput={this.handleChange} value={this.state.count} />
                            </div>
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>

                <div className='card twit-card-list'>
                    <div className='card-body'>
                        <div className='ScrollStyle'>
                        <h1> Recent tweets:</h1>
                        <br></br>

                            {this.state.tweets.length > 0 ? 
                            this.state.tweets.map(tweet =>  
                                <div class="card twit-card">
                                    <div class="card-header">
                                        By {tweet.author}:
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{tweet.text}</h5>
                                        <p class="card-text">{tweet.createdAt}</p>
                                        <a href={tweet.userUrl} target="_blank" className="btn btn-primary">Useful URL</a>
                                    </div>
                                </div>
                                )
                            :
                            <h6>It seems like you haven't searched anything </h6>
                            }
                        </div>
                    </div>
                </div>
            </div>        

            
        )
    }
}