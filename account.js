const ccxt = require ('ccxt');

// Binance Account

const binance = new ccxt.binance({
  apiKey: "FdwhiKEk5aj1HPqixpGxkAkzQ1ggJhOiZNGr2B39uZgNjs3zXVGlGz6WrZHALXWI",
  secret: "HjtDjTo6YVTlKklAZBJXWf3Kwrmjs1W348sOgNZLRPomvwxS2OVRQIAnWva2uuB4"
});

binance.setSandboxMode(true);

// Kucoin Account

const kucoin = new ccxt.kucoin({
  apiKey: "62cae76db6f6aa0001e484ed",
  secret: "fdb1fd1d-535a-46c0-941d-9689602f93fc",
  password: "kioumaru1"
});

async function printAccount(name){
  const account = await name.fetchBalance();
  console.log(account);
}

export { printAccount };