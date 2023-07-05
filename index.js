const ccxt = require ('ccxt');
const moment = require('moment');
const delay = require ('delay');

// Account 

const binance = new ccxt.binance({
  apiKey: "FdwhiKEk5aj1HPqixpGxkAkzQ1ggJhOiZNGr2B39uZgNjs3zXVGlGz6WrZHALXWI",
  secret: "HjtDjTo6YVTlKklAZBJXWf3Kwrmjs1W348sOgNZLRPomvwxS2OVRQIAnWva2uuB4"
});
binance.setSandboxMode(true);

const kucoin = new ccxt.kucoin({
  apiKey: "FdwhiKEk5aj1HPqixpGxkAkzQ1ggJhOiZNGr2B39uZgNjs3zXVGlGz6WrZHALXWI",
  secret: "HjtDjTo6YVTlKklAZBJXWf3Kwrmjs1W348sOgNZLRPomvwxS2OVRQIAnWva2uuB4",
});
kucoin.setSandboxMode(true);

// const kucoin = new ccxt.kucoin({
  // apiKey: "62cae76db6f6aa0001e484ed",
  // secret: "fdb1fd1d-535a-46c0-941d-9689602f93fc",
  // password: "kioumaru1"
// });


async function printAccount(name){
  const account = await name.fetchBalance();
  console.log(account.free);
}

// Algorithms

async function setup(){
  const Bprices = await binance.fetchOrderBook("BTC/USDT");

const K = await kucoin.fetchTickers();
const B = await binance.fetchTickers();

// console.log(K);
// console.log(B);

const BKeys = Object.keys(B);
const KKeys = Object.keys(K);
const USDT = false;
console.log(BKeys);
console.log(KKeys);

// const KList = {

// }
  
  const BBestBuy = Bprices.bids[0];
  const BBestSell = Bprices.asks[0];

  const BOrderBook = {
    ["Gia Mua Binance Thap Nhat"] : Bprices.bids[0][0],
    ["Khoi Luong Mua Binance"] : Bprices.bids[0][1],
    ["Gia Ban Binance Cao Nhat"] : Bprices.asks[0][0],
    ["Khoi Luong Ban Binance"] : Bprices.asks[0][1],
  }

  // console.log(BOrderBook);

  const Kprices = await kucoin.fetchOrderBook("BTC/USDT");

  const KBestBuy = Kprices.bids[0];
  const KBestSell = Kprices.asks[0];

  const KOrderBook = {
    ["Gia Mua Kucoin Thap Nhat"] : Kprices.bids[0][0],
    ["Khoi Luong Mua Kucoin"] : Kprices.bids[0][1],
    ["Gia Ban Kucoin Cao Nhat"] : Kprices.asks[0][0],
    ["Khoi Luong Ban Kucoin"] : Kprices.asks[0][1],
  }

  // console.log(KOrderBook);

  var checkBuyB = false;
  var checkBuyK = false;

  if(BBestBuy[0] < KBestSell[0]) checkBuyB = true;
  if(BBestSell[0] > KBestBuy[0]) checkBuyK = true;

  const priceDiff = {
    ["Gia Lai Neu Mua Binance Ban Kucoin"] : KBestSell[0] - BBestBuy[0],
    ["Gia Lai Neu Mua Kucoin Ban Binance"] : BBestSell[0] - KBestBuy[0],
  }

  const percentProfit = {
    ["% lãi Mua Binance Ban Kucoin"] : ( KBestSell[0] - BBestBuy[0] ) * 100 / BBestBuy[0],
    ["% lãi Mua Kucoin Ban Binance"] : ( BBestSell[0] - KBestBuy[0] ) * 100 / KBestBuy[0],
  }

  const totalMoney = {
    ["Tong tien lai mua Binance Ban Kucoin"] : ( KBestSell[0] - BBestBuy[0] ) * ( KBestSell[1] > BBestBuy[1] ? BBestBuy[1] : KBestSell[1]),
    ["Tong tien lai mua Kucoin Ban Binance"] : ( BBestSell[0] - KBestBuy[0] ) * ( BBestSell[1] > KBestBuy[1] ? KBestBuy[1] : BBestSell[1]),
  }

  // console.log(priceDiff);
  // console.log(percentProfit);
  // console.log(totalMoney);


  // if(checkBuyB) console.log(1);
  // if(checkBuyK) console.log(2);

}

// Main Function

async function main(){
  // while(true){
    await setup();
    // await delay(10*1000);
  // }
}



main();

// printAccount(binance);
// printAccount(kucoin);


