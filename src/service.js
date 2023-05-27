class Service {
  getStocks = async (tickers) => {
    const response = await fetch(
      `https://api.algobook.info/api/v1/stocks?tickers=${tickers.join(
        ","
      )}`
    );
    const data = await response.json();
    return data.filter(d => !d.error);
  };
}

export default new Service();
