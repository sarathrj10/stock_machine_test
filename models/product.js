const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  Name: { type: String, required: true ,unique:true},
  MarketCap: { type: Number, required: true},
  CurrentMarketPriceofStock: { type: Number, required: true },
  StockPE : { type: Number},
  Dividendyield : { type: Number},
  ROCE : { type: Number},
  ROE : { type: Number},
  Debttoequity : { type: Number},
  EPS : { type: Number},
  Reserves : { type: Number},
  Debt : { type: Number},
}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);