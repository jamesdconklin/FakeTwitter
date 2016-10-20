class InfiniteTweets {
  constructor (el) {
    this.maxCreatedAt = null;
    this.$el = $(el);
    this.$feed = this.$el.find("#feed");
    this.$fetchButton = this.$el.find(".fetch-more");
    this.$fetchButton.on(
      "click",
      this.fetchTweets.bind(this)
    );
  }

  insertTweets(tweets) {
    console.log("insertTweets")
    this.$feed.empty();
    tweets.forEach(
      (tweet) => {
        let $tweetLI = $("<li>");
        $tweetLI.text(JSON.stringify(tweet));
        this.$feed.append($tweetLI);
      }
    );
  }

  fetchTweets() {
    let it = this;
    $.ajax({
      url: "/feed",
      success(payload) {
        console.log(payload);
        it.insertTweets(payload);
      }
    });
  }
}

module.exports = InfiniteTweets;
