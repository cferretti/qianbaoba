var mongoose = require('mongoose');

var WalletSchema = new mongoose.Schema({
  amount : {
    type : Number,
    default : 0,
  },
  title : {
    type : String,
    default : 'A wallet'
  },
  transactions : [
      {
        title: 
        {
          type: String,
          required: true
        },
        amount : {
          type: Number,
          default: 0
        },
        currency : {
          type: String,
          default: 'EUR'
        },
        date: {
           type: Date,
           default: Date.now
        },
        debit : {
          type : Boolean,
          default : false
        }
      }
    ],
}, {strict: true});

module.exports = mongoose.model('Wallet', WalletSchema);