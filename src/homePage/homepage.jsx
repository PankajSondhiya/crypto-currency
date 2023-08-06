import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Corousel from "../Carousel/corousel";

export default function HomePage({ coins, currency, setCurrency }) {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("rank");
  const navigate = useNavigate();

  function handleCoinClick(id) {
    navigate(`/currency/${id}`);
  }

  const filterData =
    coins &&
    coins
      .filter(
        (coin) =>
          coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchText.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortOption) {
          case "rank":
            return a.market_cap_rank - b.market_cap_rank;
          case "name":
            return a.localCompare - b.localCompare;
          case "price0":
            return (
              a.market_data.current_price[currency] -
              b.market_data.current_price[currency]
            );

          case "24hchange":
            return (
              a.market_data.price_change_percentage_24h -
              b.market_data.price_change_percentage_24h
            );
          case "marketcap":
            return (
              a.market_data.market_cap[currency] -
              b.market_data.market_cap[currency]
            );
          default:
            return;
        }
      });

  return (
    <div className="App bg-dark">
      <Corousel />
      <div className="title text-warning ">
        <h3 className="mt-4">Crypto Currency Prices by Marketcap</h3>
      </div>
      <div className="search-input">
        <InputGroup className="">
          <input
            className="search"
            aria-label="search"
            aria-describedby="inputGroup-sizing-default"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Type currency name here"
          />
        </InputGroup>
        <select
          className="shortoption bg-dark text-warning mx-3"
          id="sort"
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
        >
          <option value="rank">Rank</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="24hchange">24h Change</option>
          <option value="marketcap">Market Cap</option>
        </select>
      </div>
      <div className="coin-list mt-5">
        <table className="coin-table">
          <thead>
            <tr className="table-header-row">
              <th className="table-header p-3">Coin</th>
              <th className="table-header  p-3">Price</th>
              <th className="table-header  p-3">24 Change</th>
              <th className="table-header  p-3">Market cap</th>
            </tr>
          </thead>
          {filterData &&
            filterData.map((coin, id) => (
              <tbody key={coin.id}>
                <tr
                  onClick={() => handleCoinClick(coin.id)}
                  className=" border-bottom"
                >
                  <td className="p-3">
                    <div className="coinInfo d-flex text-white">
                      <div className="coinImg">
                        <img src={coin.image.small} alt="" />
                      </div>
                      <div className="basicInfo d-flex">
                        <div className="symbol ">
                          {coin.symbol.toUpperCase()}
                        </div>
                        <div className="name">{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-white p-3">
                    {currency.toUpperCase()}{" "}
                    {coin.market_data.current_price[currency]}
                  </td>

                  <td
                    className={`${
                      coin.market_data.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="text-white p-3">
                    {" "}
                    {currency.toUpperCase()}{" "}
                    {coin.market_data.market_cap[currency]}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}
