module.exports = function (mod) {
	angular.module('controllers').controller('HomeCtrl', ['$scope', 'WalletModel', function HomeCtrl($scope, WalletModel) {

		$scope.wallet = {
			title : null,
			amount : 0,
			transactions : [
				{
					title : 'Base',
					amount : 0,
					debit : false,
					currency : null
				}
			]
		};

		$scope.createWallet = function(){
			if($scope.wallet.title != null && $scope.wallet.title != ''){
				WalletModel.insertWallet($scope.wallet, function(data, error){
					if(error){
						alert('Error while trying to insert something !');
						return;
					}
    			$scope.wallet = data;
				});
			}
		};
		
	}]);
};