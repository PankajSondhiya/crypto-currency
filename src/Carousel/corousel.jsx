import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import corouselImage1 from "../images/image.png.jpg";

import "./corousel.css";

function Corousel() {
  const [trendingCoins, setTrendingCoins] = useState([]);

  async function fetchTrendingCoins() {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      );

      setTrendingCoins(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error while fetching the coins details", error);
    }
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, []);

  function setCorosuleItem(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }
  const chunked = setCorosuleItem(trendingCoins, 3);
  console.log(chunked);

  return (
    <Carousel interval={3000}>
      {chunked.map((coinsChunk, index) => (
        <Carousel.Item key={index}>
          <div className="carousel-item-content">
            <img
              src={corouselImage1}
              alt="carousel"
              className="carousel-image"
            />

            <Carousel.Caption>
              <h2 className="header mb-5 text-warning ">Trending Coins </h2>
              <div className="coin-caption">
                <div className="coin-names display-flex">
                  {coinsChunk.map((coin) => (
                    <div className="logo display-flex col ">
                      <img src={coin.image} height="50px" width="50px" alt="" />
                      <p className="text-warning" key={coin.id}>
                        {coin.name}
                      </p>
                      <div
                        key={coin.id}
                        className={`${
                          coin.price_change_percentage_24h >= 0
                            ? "positive"
                            : "negative"
                        }`}
                      >
                        <span className="text-white">24h Change : </span>{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Corousel;
