const config = require('./config');
const Twit = require('twit');
const T = new Twit(config);

console.log('Im alive!');

try {
    var stream = T.stream('statuses/filter', { track: ['<What to listen to>'] });
    stream.on('tweet', tweetEvent);
} catch (error) {
    console.log(error);
}

function tweetEvent(tweet) {
    try {
        // Who sent the tweet?
        var name = tweet.user.screen_name;

        // the status update or tweet ID in which we will reply
        var nameID = tweet.id_str;

        // What is the text?
        var txt = tweet.text;

        // Start a reply back to the sender
        var reply = 'Thanks for calling!';
        var params = {
            status: reply,
            in_reply_to_status_id: nameID
        };

        T.post('statuses/update', params, function (err, data, response) {
            if (err !== undefined) {
                console.log(err);
            } else {
                console.log('Tweeted: ' + params.status);
            }
        })
    } catch (error) {
        console.log(error);
    }
};