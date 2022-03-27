const Twit = require('twit');


var client = new Twit({
    consumer_key: process.env.TWIT_API_KEY,
    consumer_secret: process.env.TWIT_API_SECRET_KEY,
    access_token: process.env.TWIT_ACCESS_TOKEN,
    access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET,
});

let tweet = {
    text:'',
    createdAt:'',
    author:'',
    hashtags: ''
};

function getLocation (input) {
    let location; 
    switch(input) {
        case 'toronto': 
            location = {lat: 43.6534817, lon:-79.3839347}
        case 'losangeles':
            location = {lat: 34.0536909, lon:-118.242766}
        case 'sydney':
            location = {lat: 34.0536909, lon:-118.242766}
        case 'london':
            location = {lat: 51.5073219, lon:-0.1276474}
        case 'newdelhi':
            location = {lat: 28.6138954, lon:77.2090057}
        case 'berlin':
            location = {lat: 52.5186925, lon:13.3996024}
        case 'madrid':
            location = {lat: 40.4167047, lon:-3.7035825}
        case 'rome':
            location = {lat: 41.8933203, lon:12.4829321}
        case 'paris':
            location = {lat: 48.8588897, lon:2.320041}
        //default is toronto
        default: 
            location = {lat: 43.6534817, lon:-79.3839347}
    }
    return location;
}

let tweetArrays = []
async function searchTweets(req, res) {
    try {
        const location = getLocation(req.body.location)
        await client.get('search/tweets', { q: `#${req.body.hashtag1} since:2020-04-15`,geocode: `${location.lat},${location.lon},${parseInt(req.body.radius)}mi`, count: req.body.count }, function (err, data, response) {
            const results = data.statuses
            results.forEach(result => {
                const tweet = {
                    text: result.text,
                    createdAt: result.created_at,
                    author: result.user.screen_name,
                    hashtags: `#${req.body.hashtag1}`
                }
                tweetArrays.push(tweet);
            });
            console.log(tweetArrays);
            res.status(200).json('ok');
        });
        res.status(200).json('ok');
    } catch(err) {
        res.status(400).json(err);
    }
}


// async function indexTweets(req, res) {
//     try{
//         let tweets = await tweetArrays;
//         res.status(200).json(tweets);
//     }catch(err){
//         res.status(400).json(err);
//     }
// }

// module.exports = {
//     searchTweets, 
//     indexTweets,
// }
