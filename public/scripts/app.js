$(document).ready(function() {
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
$(".tweet-form").on('submit', function(event) {
  event.preventDefault();
  let tweetBody = $(this).serialize();
  console.log($(".tweet-area").val());
  if (!$('.tweet-area').val()) {
    $('#error-message').html('&#9888; Empty Tweet! please enter some chars to tweet. &#9888;').css('display', 'block').delay(3000).fadeOut();
  }
  if ($('.tweet-area').val().length > 140) {
    $('#error-message').html('&#9888; Too long! please respect our orbitary limit of 140 chars. &#9888;').css('display', 'block').delay(3000).fadeOut();
  } else {
    $.ajax({
      method: "POST",
      url:"/tweets",
      data: tweetBody
    })
    .then(loadTeewts); 
  }

});

const loadTeewts = () => {
  $.get("/tweets", function(res) {
    renderTweets(res);
  })
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  $(".tweet-container").empty();
  for (const tweet of tweets) {
    let output = createTweetElement(tweet);
    $('.tweet-container').prepend(output);
    }
}

const escape =  function(str) {
  let div = $("<div>").text(str);
  return div[0].innerHTML;
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
  <span class="tweet-body">${escape(tweet.content.text)}</span>
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

$('.nav-button').click( () => {
  $('.new-tweet').slideToggle('slow');
  $('.tweet-area').focus();
});

});