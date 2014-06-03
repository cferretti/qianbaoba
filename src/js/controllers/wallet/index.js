module.exports = function (mod) {
	angular.module('controllers').controller('WalletCtrl', ['$scope', '$stateParams', '$location', 'WalletModel', function WalletCtrl($scope, $stateParams, $location, WalletModel) {
		$scope.wallet = '';
		$scope.nbPages = 0;
		$scope.offset = 0;
		$scope.bypage = 5;
		$scope.transaction = WalletModel.newTransaction();

		$scope.addTransaction = function(){
			console.log($scope.transaction);
			$scope.wallet.transactions.push($scope.transaction);
			$scope.transaction = WalletModel.newTransaction();

			WalletModel.updateWallet($scope.wallet, function(data, error){
				if(error){
					console.log(error);
				}else{
					$scope.wallet = data;
					$scope.nbPages = Math.ceil(data.transactions.length / $scope.bypage);
				}
			})
		};

		$scope.getCurrentAmount = function(){
			if($scope.wallet == '' || $scope.wallet.transactions === undefined){
				return 0;
			}

			return WalletModel.getWalletAmount($scope.wallet);
		};

		$scope.deleteTransaction = function(transaction){
			var idx = $scope.wallet.transactions.indexOf(transaction);
 		 	$scope.wallet.transactions.splice(idx,1);

 		 	WalletModel.updateWallet($scope.wallet, function(data, error){
				if(error){
					console.log(error);
				}else{
					$scope.wallet = data;
					$scope.nbPages = Math.ceil(data.transactions.length / $scope.bypage);
				}
			}) 
		};

		

		$scope.range = function(n){
		     return new Array(n);
		};

		$scope.resetTransaction = function(){
			$scope.transaction = WalletModel.newTransaction();
		}

		if($stateParams.id !== undefined){
			WalletModel.getWallet($stateParams.id, function(data, error){
				if(error){
					$scope.wallet = '';
					return;
				}
				$scope.wallet = data;
				$scope.nbPages = Math.ceil(data.transactions.length / $scope.bypage);
			});
		}
	}]);
};