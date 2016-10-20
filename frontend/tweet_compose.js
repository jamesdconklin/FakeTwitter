class TweetCompose {
  constructor(el) {
    this.$el = $(el);
    this.$el.on("submit", this.submit.bind(this));
    this.$content = this.$el.find("textarea");
    this.$charsLeft = $(".chars-left");
    this.$charsLeft.text(`${140-this.$content.val().length} characters left`);
    this.$content.on("input", this.refreshCount.bind(this));
    this.$el.find(".add-mentioned-user").on(
      "click",
      this.addMentionedUser.bind(this)
    );
  }

  addMentionedUser() {
    let $mention = $($('#mention-template').html());
    $mention.find(".remove-mentioned-user").on(
      "click",
      this.removeMentionedUser.bind(this)
    );
    this.$el.find(".mentioned-user").append($mention);
  }

  submit(event){
    event.preventDefault();
    let formData = $(event.currentTarget).serializeJSON();
    console.log(formData);
    this.$el.find(":input").prop("disabled", true);
    let form = this;
    $.ajax( {
      url: form.$el.attr("action"),
      type: "POST",
      data: formData,
      success(payload){
        console.log(payload);
        form.handleSuccess(payload);
      }

    } );
  }

  handleSuccess(payload) {
    this.clearInput();
    this.$el.find(":input").prop("disabled", false);
    let $tweets = $(this.$el.data("tweets-ul"));
    let $tweet = $("<li>");
    $tweet.text(JSON.stringify(payload));
    $tweets.prepend($tweet);

  }

  refreshCount(event) {
    let content = this.$content.val();
    let rem = 140-content.length;
    let remString;
    if (rem < 0) {
      remString = `${Math.abs(rem)} characters over`;
    } else {
      remString = `${rem} characters left`;
    }
    this.$charsLeft.text(remString);
  }

  clearInput(){
    this.$el.find("textarea").val("");
    this.$el.find("select").val("");
    this.$el.find(".mentioned-user").empty();

  }

  removeMentionedUser(event) {
    let $deletedElement = $(event.currentTarget).parent();
    $deletedElement.remove();
  }


}

module.exports = TweetCompose;
