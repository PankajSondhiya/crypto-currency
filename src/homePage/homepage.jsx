import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Corousel from "../Carousel/corousel";

export default function HomePage({ coins, currency }) {
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("rank");
  const navigate = useNavigate();

  function handleCoinClick(id) {
    navigate(`/currency/${id}`);
  }
  //console.log("coin at homepage", coins);

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
            return a.localeCompare - b.localeCompare;
          case "price":
            return a.current_price - b.current_price;

          case "24hchangmarket_datae":
            return (
              a.price_change_percentage_24h - b.price_change_percentage_24h
            );
          case "marketcap":
            return a.market_cap - b.market_cap;
          default:
            return;
        }
      });

  return (
    <div className="App bg-dark">
      <Corousel />
      <div className="title text-warning ">
        <h3 className="mt-4">{`Crypto Currency Prices by ${sortOption}`}</h3>
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
            filterData.map((coin) => (
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
                    {currency.toUpperCase()} {coin.current_price}
                  </td>

                  <td
                    className={`${
                      coin.price_change_percentage_24h >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="text-white p-3">
                    {" "}
                    {currency.toUpperCase()} {coin.market_cap}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
}
