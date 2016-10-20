class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.render();
    this.$el.on("click", this.handleClick.bind(this));

  }

  render() {
    this.$el.prop('disabled', false);
    let buttonText = (this.followState === "followed") ?
      "Unfollow" : "Follow";
    this.$el.text(buttonText);
  }

  toggleState() {
    this.followState = (this.followState === "followed") ?
      "unfollowed" : "followed";
  }

  handleClick(event) {
    event.preventDefault();
    this.$el.prop('disabled', true);
    let ts = this;
    let url = `/users/${this.userId}/follow`;
    let action = (this.followState === "followed") ? "delete" : "post";
    $.ajax( {
      url: url,
      method: action,
      dataType: "json",
      data: {followee_id: this.userId},
      success(payload) {
        ts.toggleState();
        ts.render();
      }
    }
  );
  }
}


module.exports = FollowToggle;
