$(document).ready(function() {
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
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

const renderTweets = (tweets) => {
  $(".tweet-container").empty();
  for (const tweet of tweets) {
    let output = createTweetElement(tweet);
    $('.tweet-container').prepend(output);
    }
}

const createTweetElement = function(tweet) {
  let data = new Date(tweet.created_at).toDateString();
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
    <h4 class="tweet-timestamp">${data}</h4>
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
