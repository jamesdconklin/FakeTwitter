const FollowToggle = require("./follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);

    this.$users = this.$el.find(" > .users");
    this.$input = this.$el.find(" > input");

    // this.$input.val("Default");
    this.$input.on('input', this.handleInput.bind(this));
  }

  handleInput(event) {
    event.preventDefault();
    let searchObject = this;
    $.ajax( {
      url: this.$input.data("search-url"),
      data: {query: this.$input.val()},
      success(payload){
        console.log(payload);
        searchObject.handlePayload(payload);
      }
    });
  }

  static buildUserEntry(user) {
    let $entry = $("<li>");
    let userId = user.id;
    let userName = user.username;
    let userUrl = `/users/${userId}/`;
    let $link = $("<a>");
    let followed = user.followed ? "followed" : "unfollowed";
    $link.attr("href", userUrl);
    $link.text(userName);
    $entry.append($link);
    $entry.append($('<br/>'));

    let $button = $('<button class="follow-toggle">');
    $button.data("initial-follow-state", followed);
    $button.data("user-id", userId);
    $button.text(user.followed ? "Unfollow" : "Follow");
    new FollowToggle($button);
    $entry.append($button);

    return $entry;

  }

  handlePayload(array) {
    this.$users.empty();
    array.forEach(
      (user) => {
        this.$users.append( UsersSearch.buildUserEntry(user) );
      }
    );
  }
}

module.exports = UsersSearch;
