angular
  .module('Trocai')
  .controller('NewMatchCtrl', NewMatchCtrl);


function NewMatchCtrl($scope, $reactive, NewMatch) {
  $reactive(this).attach($scope);

}
