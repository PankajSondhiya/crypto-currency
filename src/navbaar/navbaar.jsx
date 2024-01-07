import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbaar.css";
export default function Navbaar({
  coins,
  currency,
  setCurrency,
  setCurrencyList,
  currencyList,
}) {
  const navigate = useNavigate();

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
          {Object.keys(currencyList || {}).map((currencyCode) => (
            <option value={currencyCode}>{currencyCode.toUpperCase()}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
