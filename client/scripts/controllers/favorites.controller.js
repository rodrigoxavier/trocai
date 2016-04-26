angular
  .module('Trocai')
  .controller('FavoritesCtrl', FavoritesCtrl);

  function FavoritesCtrl($scope, $reactive, User) {
  $reactive(this).attach($scope);

  this.removeFavorite = removeFavorite;

  this.subscribe('rates');
  this.subscribe('products');

  this.helpers({
    data() {
      let rate = Rates.findOne({'userId' : Meteor.userId()});
      if(rate)
        return Products.find({"_id": {$in: rate.likes}});
    }
  });

  function removeFavorite(productId) {
    Meteor.call('removeFavorite', productId);
  }
}
