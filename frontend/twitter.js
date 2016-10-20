const FollowToggle = require("./follow_toggle.js");
const UsersSearch = require("./users_search.js");
const TweetCompose = require("./tweet_compose.js");
const InfiniteTweets = require("./infinite_tweets.js");

$( () => {
  $('.follow-toggle').each(
    (idx, el) => {
      let ft = new FollowToggle(el);
      console.log(`FollowToggle created for ${el}`);
    }
  );
  $(".users-search").each(
    (idx, el) => {
      new UsersSearch(el);
    }
  );
  $(".tweet-compose").each(
    (idx, el) => {
      new TweetCompose(el);
    }
  );
  $(".infinite-tweets").each(
    (idx, el) => {
      new InfiniteTweets(el);
    }
  );



});
