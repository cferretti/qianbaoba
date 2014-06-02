 module.exports = function (mod) {
  angular.module('components.wallet', [])
    // Resource
    .factory('WalletModel', ['$http', function WalletModel($http) {
        return {
          getWallet : function(id, callback){
             $http({
                method: 'GET',
                url: '/api/wallet/'+id
              }).
              success(function(data, status, headers, config) {
                callback(data, null);
              }).
              error(function(data, status, headers, config) {
                callback(null, status);
              });
          },
          updateWallet : function(data, callback){
             $http({
                method: 'PUT',
                url: '/api/wallet/'+data._id,
                data : data
              }).
              success(function(data, status, headers, config) {
                callback(data, null);
              }).
              error(function(data, status, headers, config) {
                callback(null, status);
              });
          },
          newTransaction : function(){
            return {
              title : null,
              date :  null,
              amount : null,
              currency : 'EUR',
              debit : false
            }
          },
          getWalletAmount : function(wallet){
            var current = 0;
            for(i in wallet.transactions){
              var transaction = wallet.transactions[i];
              var rate= 1;
              switch(transaction.currency){
                case 'EUR' : 
                  rate = 1;
                break;
                case 'USD' :
                  rate = 0.733514267;
                break;
                case 'CNY' : 
                  rate = 0.117401892;
                break;
              }

              if(transaction.debit == true){
                current -= transaction.amount * rate;
              }else{
                current += transaction.amount * rate;
              }
            }

            return current;
          },
          insertWallet : function(wallet, callback){
             $http({
                method: 'POST',
                url: '/api/wallet/',
                data : wallet
              }).
              success(function(data, status, headers, config) {
                callback(data, null);
              }).
              error(function(data, status, headers, config) {
                callback(null, status);
              });
          }
        }
    }]);
}