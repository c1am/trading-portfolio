// Call cryptocurrency API price
export async function getPrice() {
  var api_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  const response = await fetch(api_url);
  const apiData = await response.json();
  var baseUrl = "https://www.coingecko.com/en/coins/";
  // console.log(apiData);
  var cryptos = [];

  // Loop for top 10 cryptocurrencies
  for (let i=0;i<10;i++) {
    var coinName = apiData[i].name;
    var coinSymbol = apiData[i].symbol;
    var currentPrice = apiData[i].current_price;
    var priceChange24h = apiData[i].price_change_percentage_24h;
    var priceChangeColor = "";
    // var createRow = document.getElementById("crypto").insertRow();
    var imageUrl = apiData[i].image;
    var graphNo = imageUrl.split('/')[5];
    var coinUrl = baseUrl + coinName.toLowerCase();

    if (priceChange24h < 0) {
      priceChangeColor = "#dc3545";}    
    else if (priceChange24h > 0) 
      {priceChangeColor = "#28a745";}      
    else priceChangeColor = "#000000";

    cryptos[i] = {
      name: coinName,
      symbol: coinSymbol,
      price: currentPrice,
      priceChange24h: priceChange24h,
      imageUrl: imageUrl,
      color: priceChangeColor,
      graphNo: graphNo,
      itemNo: i,
      coinUrl: coinUrl
    }

  }
  return cryptos;
}

export async function getHistory(name){
  var api_url = `https://api.coingecko.com/api/v3/coins/${name}/market_chart?vs_currency=usd&days=14`
  const response = await fetch(api_url);
  const apiData = await response.json();
  return apiData;
}

