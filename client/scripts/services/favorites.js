angular
  .module('Trocai')

.factory('User', function(){
    var o = {
      favorites: []
    }

    o.addProductToFavorites = function(product){
      //make sure there's a product to add
      if(!product) return false;
      //add to favorite array
      o.favorites.unshift(product);
    }

    o.removeProductFromFavorites = function(product, index){
      //make sure there's a product to add
      if(!product) return false;
      //remove from  favorite array
      o.favorites.splice(index, 1);
    }

    return o;
  });
