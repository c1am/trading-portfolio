// Call cryptocurrency API price
export default async function getPrice() {
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
      coinUrl: coinUrl
    }

    // Create new row for every new cryptocurrency on Top 10 list
    // createRow.innerHTML += `
    // <tr>
    //   <td><img src=${imageUrl} width=5%>   <a href=${coinUrl} target=_blank>${coinName} (${coinSymbol})</a></td>
    //   <td align=right><b>$ ${currentPrice.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</b></td>
    //   <td align=right><font color=${priceChangeBGColor}>${priceChange24h.toLocaleString('en-US',{minimumFractionDigits: 3, maximumFractionDigits: 3})} % </td>
    //   <td><a href=${coinUrl} target=_blank><img class="" alt="bitcoin (BTC) 7d chart" data-src="https://www.coingecko.com/coins/${graphNo}/sparkline" data-srcset="https://www.coingecko.com/coins/${graphNo}/sparkline 1x" src="https://www.coingecko.com/coins/${i}/sparkline" srcset="https://www.coingecko.com/coins/${graphNo}/sparkline 1x"></a></td>
    // </tr>`;
  }
  return cryptos;
}

// getPrice();
// document.addEventListener("load", getPrice);