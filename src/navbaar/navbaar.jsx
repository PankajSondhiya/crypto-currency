import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbaar.css";
export default function Navbaar({ coins, currency, setCurrency }) {
  const navigate = useNavigate();
  const [coinsList, setCoinList] = useState(null);

  function allCurrency() {
    if (coins && coins.length > 0) {
      const currencyObj = coins[0].market_data.current_price;
      console.log(coins);

      setCoinList(currencyObj);
      console.log(currencyObj);
    }
  }
  useEffect(() => {
    allCurrency();
  }, [coins]);

  return (
    <div className="navbaar d-flex bg-dark ">
      <div onClick={() => navigate("/")} className="Title text-warning">
        Crypto Tracker
      </div>
      <div>
        <select
          onChange={(event) => setCurrency(event.target.value)}
          className="currencySelect  bg-dark text-warning"
          id=""
        >
          {Object.keys(coinsList || {}).map((currencyCode) => (
            <option value={currencyCode}>{currencyCode.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
