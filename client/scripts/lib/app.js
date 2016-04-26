angular
  .module('Trocai', [
    'angular-meteor',
    'ionic',
    'angularMoment',
    'mgo-angular-wizard'
  ]);

if (Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
}
else {
  angular.element(document).ready(onReady);
}

function onReady() {
  angular.bootstrap(document, ['Trocai']);
}
