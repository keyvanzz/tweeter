$(document).ready(function() {
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const loadTeewts = () => {
  $.get("/tweets", function(res) {
    renderTweets(res);
  })
}
  
$(".tweet-form").on('submit', function(event) {
  event.preventDefault();
  let tweetBody = $(this).serialize();
  console.log(tweetBody);
  $.ajax({
    method: "POST",
    url:"/tweets",
    data: tweetBody
  })
  .then(loadTeewts());
});

const updateTweet = (tweets) => {
  // $('.tweet-img').attr('src', tweet.user.avatars);
  // $('.tweet-username').text('src', tweet.user.name);
  // $('.tweet-userhandle').text('src', tweet.user.handle);
  // $('.tweet-body').text('src', tweet.content.text);
  // $('.tweet-timestamp').text('src', tweet.created_at);
}
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $(".tweet-container").empty();
  for (const tweet of tweets) {
    let output = createTweetElement(tweet);
    $('.tweet-container').append(output);
    }
}

const createTweetElement = function(tweet) {
    // let $tweet = $('<article>').addClass('tweet');
    let $tweets = (`
    <article class="tweet">
    <header>
      <img class="tweet-img" src=${tweet.user.avatars}'>
      <h4 class= "tweet-username">${tweet.user.name}</h4>
      <h4 class="tweet-userhandle">${tweet.user.handle}</h4>
    </header>
    <span class="tweet-body">${tweet.content.text}</span>
    <footer class="tweet-footer">
      <h4 class="tweet-timestamp">${tweet.created_at}</h4>
      <div class="tweet-icons">
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-refresh"></i>
      </div>
    </footer>
  </article>
  `);
    return $tweets;
  };

renderTweets(data);
//console.log(renderTweets(data))
});