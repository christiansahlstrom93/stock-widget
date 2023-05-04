declare module "react-stocks" {
  interface IReactStockProps {
    tickers: string[];
    doPoll?: boolean;
  }
  const ReactStocks: (props: IReactStockProps) => JSX.Element;
}
