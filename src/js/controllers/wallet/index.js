module.exports = function (mod) {
	angular.module('controllers').controller('WalletCtrl', ['$scope', 'WalletModel', function WalletCtrl($scope, WalletModel) {
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

		WalletModel.getWallet("538b5c4d674efe301fa343f8", function(data, error){
				$scope.wallet = data;
				$scope.nbPages = Math.ceil(data.transactions.length / $scope.bypage);
		});

		$scope.range = function(n){
		     return new Array(n);
		};

		$scope.resetTransaction = function(){
			$scope.transaction = WalletModel.newTransaction();
		}

		// WalletModel.insertWallet(function(data, error){
		// 	console.log(data);
  //     $scope.wallet = data;
		// });
	}]);
};