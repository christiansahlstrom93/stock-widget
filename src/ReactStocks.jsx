import { useEffect, useState } from "react";
import "./styles.css";
import service from "./service";

const POLL_INTERVAL = 120 * 1000;

const ReactStocks = (props) => {
  const [stocks, setStocks] = useState(null);
  let interval;
  useEffect(() => {
    async function fetchStocks() {
      const stocks = await service.getStocks(props.tickers);
      setStocks(stocks);
    }
    fetchStocks();

    if (props.doPoll) {
      if (interval) {
        clearInterval(interval);
      }
      setInterval(fetchStocks, POLL_INTERVAL);
    }
  }, [props, interval]);

  useEffect(
    () => () => {
      if (interval) {
        clearInterval(interval);
      }
    },
    []
  );

  if (!stocks) {
    return null;
  }

  const renderStocks = () => {
    return (
      <div className="stocks">
        {stocks.map((stock) => (
          <div className="row" key={stock.ticker}>
            <div className="tickerInfo">
              <span className="ticker">{stock.ticker}</span>
              <span className="currency">{`${
                stock.companyName ? stock.companyName : stock.currency
              }`}</span>
            </div>

            <div className="prices">
              <span className="openClose">{`${stock.lastPrice.toFixed(
                2
              )}`}</span>
              <div className="diffValues">
                <span
                  className={`${
                    stock.lastClose > stock.lastPrice ? "priceDown" : "priceUp"
                  }`}
                >
                  {`${stock.percentage}% (${(
                    stock.lastPrice - stock.lastClose
                  ).toFixed(2)})`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <div className="stockWidget">{renderStocks()}</div>;
};

export default ReactStocks;
