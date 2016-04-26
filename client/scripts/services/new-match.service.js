angular
  .module('Trocai')
  .service('NewMatch', NewMatch);

function NewMatch($rootScope, $ionicModal, $reactive) {
  let templateUrl = 'client/templates/match.html';
  this.showModal = showModal;
  this.hideModal = hideModal;

  ////////////

  function showModal (product) {
    this._scope = $rootScope.$new();

    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: this._scope,
    }).then((modal) => {
      this._modal = modal;
      modal.show();
    });
  }

  function hideModal () {
    this._scope.$destroy();
    this._modal.remove();
  }
}
