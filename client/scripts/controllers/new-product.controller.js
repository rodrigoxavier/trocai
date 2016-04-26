angular
  .module('Trocai')
  .controller('NewProductCtrl', NewProductCtrl);


function NewProductCtrl($scope, $reactive, NewProduct) {
  $reactive(this).attach($scope);

  this.hideNewProductModal = hideNewProductModal;
  this.newProduct = newProduct;
  this.validationPricipal = validationPricipal;
  this.validationPhotos = validationPhotos;
  this.validationWishes = validationWishes;

  ////////////

  function validationPricipal(){
    if(this.name == null || this.description == null)
      return false;
  }

  function validationPhotos(){
    if(this.photos == null)
      return false;
  }

  function validationWishes(){
    if(this.wishname == null || this.wishdescription == null)
      return false;
  }

  function hideNewProductModal() {
    NewProduct.hideModal();
  }

  function newProduct(userId) {
    Meteor.call('newProduct', {
      name: this.name,
      description: this.description,
      photos: this.photos,
      wishname: this.wishname,
      wishdescription: this.wishdescription
    });
    hideNewProductModal();
  }
}
