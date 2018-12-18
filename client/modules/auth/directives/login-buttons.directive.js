angular.module('auth').directive('loginButtons', function() {
  return {
    restrict: 'EA',
    scope: true,
    template: '<div></div>',
    link: function(scope, element) {
      Blaze.renderWithData(Template.loginButtons, {align: (attrs.align || '')}, element[0]);
    }
  }
});