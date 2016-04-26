angular
  .module('Trocai')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, NewChat) {
  $reactive(this).attach($scope);

  this.showNewChatModal = showNewChatModal;
  this.remove = remove;

  this.subscribe('chats');

  this.helpers({
    data() {
      return Chats.find();
    }
  });

  ////////////

  function showNewChatModal() {
    NewChat.showModal();
  }

  function remove (chat) {
    Meteor.call('removeChat', chat._id);
  }
}
