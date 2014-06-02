var mod = module.exports = angular.module('controllers', ['frapontillo.bootstrap-switch', 'components.wallet']);
require('./wallet')(mod);
require('./home')(mod);