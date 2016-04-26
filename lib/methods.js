Meteor.methods({
  newMessage (message) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }

    check(message,
      {
        text: String,
        type: String,
        chatId: String
      }
    );

    message.timestamp = new Date();
    message.userId = this.userId;

    let messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his name.');
    }

    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must proive user name');
    }

    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(otherId, String);

    let otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user not exists');
    }

    let chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    let chatId = Chats.insert(chat);

    return chatId;
  },
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a chat.');
    }

    check(chatId, String);

    let chat = Chats.findOne(chatId);
    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat not exists');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  updatePicture(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update his picture.');
    }

    check(data, String);

    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  },
  newProduct(product) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to create a product.');
    }

    check(product,
      {
        name: String,
        description: String,
        photos: String,
        wishname: String,
        wishdescription: String
      }
    );

    product.creator = this.userId;
    product.timestamp = new Date();

    let productId = Products.insert(product);

    return productId;
  },
  ratedProduct(rated) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to rate a product.');
    }

    check(rated,
      {
        productId: String,
        liked: Boolean,
        creator: String
      }
    );

    rated.timestamp = new Date();
    if(rated.liked){
      Rates.update({'userId' : this.userId},
        {
          $push: {
            'rated': rated,
            'likes': rated.productId,
            'list_rated': rated.productId
          }
        });
    }else{
      Rates.update({'userId' : this.userId},
        {
          $push: {
            'rated': rated,
            'list_rated': rated.productId
          }
        });
    }
    let match = Rates.find({"userId" : rated.creator, "rated" : {$elemMatch: { "creator" : this.userId, "liked" : true}}}).fetch();
    if(match.length>0){
      Match.insert({"userIds": [this.userId, rated.creator], "productId" : rated.productId, "createdAt": rated.timestamp});
      let chat = Chats.findOne({ userIds: { $all: [rated.creator, this.userId] } });
      if (!chat) {
        Meteor.call('newChat', rated.creator);
      }
      return true;
    }else{
      return false;
    }
  },
  removeFavorite(productId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged to rate a product.');
    }

    check(productId, String);

    return Rates.update({'userId' : this.userId},
      {
        $pull: {
          'rated': {"productId": productId},
          'likes': productId
        }
      }
    );

  }
});
