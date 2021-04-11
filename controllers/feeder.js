const product = require('../models/product');

exports.feed = async(req,res)=>{
    try{

        let products = [
            {
                Name: "Tata Consultancy Services",
                MarketCap: 55291,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            },
            {
                Name: "HDFC Bank",
                MarketCap: 55288,
                CurrentMarketPriceofStock: 18.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 14.1,
                ROE: 13.53,
                Debttoequity: 3370.22,
                EPS: 4.1,
                Reserves: 4.86,
                Debt: 3370.23
            },
            {
                Name: "Hindustan Unilever",
                MarketCap: 54291,
                CurrentMarketPriceofStock: 15.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 12.1,
                ROE: 13.33,
                Debttoequity: 3370,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            },
            {
                Name: "Corporation Limited",
                MarketCap: 44291,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370,
                EPS: 5.1,
                Reserves: 4.66,
                Debt: 3370.23
            },
            {
                Name: "ICICI Bank",
                MarketCap: 55791,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370.48,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            },
            {
                Name: "Kotak Mahindra Bank",
                MarketCap: 53291,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            },
            {
                Name: "State Bank of India",
                MarketCap: 53591,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370.33,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            },
            {
                Name: "Bajaj Finance",
                MarketCap: 54791,
                CurrentMarketPriceofStock: 10.3,
                StockPE: 0,
                Dividendyield: 0,
                ROCE: 15.1,
                ROE: 13.33,
                Debttoequity: 3370.24,
                EPS: 5.1,
                Reserves: 4.56,
                Debt: 3370.23
            }
        ]

        let ifExist = await product.find({}).exec()
        if(ifExist.length){
            res.send("Company details already feeded")
        }else{
            await product.create(products)
            res.redirect('/login')
        }

    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}