var router  = require('express').Router();
var walletApi = require('./wallet');

router.use('/wallet', walletApi);

module.exports = router;