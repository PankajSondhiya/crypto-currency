import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./homePage/homepage";
import Navbaar from "./navbaar/navbaar";
import CurrencyDetail from "./CurrencyDetail/currencyDetail";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("aed");
  const [currencyList, setCurrencyList] = useState({});

  useEffect(() => {
    const retrieveCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
        );
        setCoins(response.data);
        console.log("coin data", response.data);
      } catch (ex) {
        console.log("Master data could not be retrieved: ", ex);
      }
    };

    retrieveCoinData();
  }, [currency]);
  const retrieveCurrencyList = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin"
      );
      setCurrencyList(data.market_data.current_price);
      console.log(data.market_data.current_price);
    } catch (ex) {
      console.log("Currency list could not be retrieved: ", ex);
    }
  };

  useEffect(() => {
    retrieveCurrencyList();
  }, []);

  return (
    <>
      <Navbaar
        coins={coins}
        currency={currency}
        setCurrency={setCurrency}
        currencyList={currencyList}
        setCurrencyList={setCurrencyList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              currency={currency}
              setCoins={setCoins}
              setCurrency={setCurrency}
            />
          }
        />
        <Route
          path="/currency/:id"
          element={
            <CurrencyDetail
              coins={coins}
              currency={currency}
              setCurrency={setCurrency}
            />
          }
        />
      </Routes>
    </>
  );
}
