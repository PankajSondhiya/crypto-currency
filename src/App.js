import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./homePage/homepage";
import Navbaar from "./navbaar/navbaar";
import CurrencyDetail from "./CurrencyDetail/currencyDetail";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("aed");

  async function FetchCoins() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/"
      );

      console.log(response.data);
      setCoins(response.data);
    } catch (error) {
      console.log(" error while fetching the coins details", error);
    }
  }

  useEffect(() => {
    FetchCoins();
  }, []);

  return (
    <>
      <Navbaar coins={coins} currency={currency} setCurrency={setCurrency} />
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
