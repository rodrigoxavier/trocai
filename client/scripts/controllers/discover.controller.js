angular
  .module('Trocai')
  .controller('DiscoverCtrl', DiscoverCtrl);

  function DiscoverCtrl($scope, $reactive, NewProduct, NewMatch) {
    $reactive(this).attach($scope);

    this.showNewProductModal = showNewProductModal;

    function showNewProductModal() {
      NewProduct.showModal();
    }

    this.subscribe('rates');
    this.subscribe('users');
    this.subscribe('products');

    this.helpers({
      data() {
        let rate = Rates.findOne({'userId' : Meteor.userId()});
        if(rate)
          return Products.find({"_id": {$nin: rate.list_rated}, "creator": {$ne: Meteor.userId()}});
      }
    });

    this.sendFeedback = sendFeedback;

    function sendFeedback(bool, product){
      product.rated = bool;
      product.hide = true;
      setTimeout(function () {
        Meteor.call('ratedProduct', {
            productId: product._id,
            liked: bool,
            creator: product.creator
          }, function(error, result){
          if(error){
              console.log(error);
          } else {
              if(result)
                NewMatch.showModal(product);
          }
        });

      }, 50);
  }
}
