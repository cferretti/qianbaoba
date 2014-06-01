window.$ = window.jQuery = require('jquery');
window._ = require('lodash');
require('angular');
require('angular-sanitize');
require('angular-ui-router');
require('angular-resource');
require('angular-animate');
require('bootstrap-switch');
require('angular-bootstrap-switch');

var modules = [
  require('./controllers'),
  require('./components')
];

var dependencies = _.pluck(modules, 'name');
dependencies.push('ngAnimate', 'ngSanitize', 'ngResource', 'ui.router');
var wallet = module.exports = angular.module('wallet', dependencies);

wallet.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    .state('wallet', {
      url: "/wallet/:id",
      templateUrl: "views/wallet/index.html",
      controller : 'WalletCtrl'
    });

	$urlRouterProvider.otherwise("/wallet/adzd");
});

wallet.filter('startFrom', function() {
    return function(input, start) {
    	if(input === undefined) return null;
        start = +start; //parse to int
        return input.slice(start);
    }
});