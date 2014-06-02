var router  = require('express').Router();
var Wallet    = require('./walletModel.js');

function getWallet(req, res, next) {
  if(!req.params.id) {
    return next();
  }

  Wallet.findById(req.params.id, function find(err, wallet) {
    if(err) {
      return res.send(500);
    }

    if(!wallet) {
      return res.send(404);
    }

    req.wallet = wallet;
    next();
  });
}

router.get('/', function(req, res, next) {
  Wallet.find({}, function find(err, wallet) {
    res.send(wallet);
  });
});

router.post('/', function(req, res, next) {
  Wallet.create(req.body, function (err, wallet) {
    if(err) {
      return res.send(500);
    }

    res.send(201, wallet);
  });
});

router.all('/:id', getWallet);
router.get('/:id', function(req, res, next){
    res.send(req.wallet);
});

router.put('/:id', function(req, res, next) {

  req.wallet.set('amount', req.body.amount);
  req.wallet.set('title', req.body.title);
  req.wallet.set('transactions', req.body.transactions);

  req.wallet.save(function (err) {
    if(err) {
      return res.send(500);
    }

    res.send(200, req.wallet);
  });
});
module.exports = router;