import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./currencyDetail.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function CoinDetail({ currency }) {
  const [coinDetail, setCoinDetail] = useState({});
  const [activeTimeRange, setActiveTimeRange] = useState("1d");
  const [chartData, setChartData] = useState(null);
  const { id } = useParams();

  async function fetchChartDetail(id, timeRange, currency) {
    try {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${timeRange}`
      );

      const pricesData = data.prices;
      const labels = pricesData.map((priceData) =>
        new Date(priceData[0]).toLocaleDateString()
      );
      const prices = pricesData.map((priceData) => priceData[1]);
      console.log(prices);

      setChartData({ labels, prices });
    } catch (error) {
      console.log("Error fetching chart data:", error);
    }
  }

  async function fetchCoinDetail(id) {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      setCoinDetail(response.data);
    } catch (error) {
      console.log("Error fetching currency detail:", error);
    }
  }

  useEffect(() => {
    fetchCoinDetail(id);
  }, [id]);

  useEffect(() => {
    fetchChartDetail(id, activeTimeRange, currency);
  }, [id, activeTimeRange, currency]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Coin price history",
      },
    },
  };

  return (
    <div className="currenncy_detail bg-dark vh-100">
      <div className="currency_detail d-flex">
        <div className="box">
          <div className="logo mt-3">
            {coinDetail.image && <img src={coinDetail.image.large} alt="" />}
          </div>
          <h3 className="text-warning mt-5"> {coinDetail.name}</h3>
          <div className=" mt-2 text-white">{coinDetail.genesis_date}</div>
          <h5 className="text-white">
            Market Cap Rank
            <div className="rank text-warning">
              {" "}
              {coinDetail.market_cap_rank}
            </div>
          </h5>
          <div className="description text-white p-3">
            {"Description: "}
            {coinDetail.description &&
              coinDetail.description.en.split(".")[0] + "."}
          </div>
        </div>
        <div className="chart_display vh-100 vw-100">
          {chartData ? (
            <>
              <Line
                options={options}
                data={{
                  labels: chartData.labels,
                  datasets: [
                    {
                      label: "Price",
                      data: chartData.prices,
                      borderColor: "orange",
                      backgroundColor: "rgba(255, 99, 132, 0.5)",
                    },
                  ],
                }}
              />
              <div className="button-chart d-flex justify-content-around mt-5 vw-50">
                <button
                  className={`24_hr-time time_button bg-dark text-warning ${
                    activeTimeRange === "1d" ? "active_time_button" : ""
                  }`}
                  onClick={() => setActiveTimeRange("1d")}
                >
                  24 Hours
                </button>
                <button
                  className={`30_Days-time time_button bg-dark text-warning  ${
                    activeTimeRange === "30" ? "active_time_button" : ""
                  }`}
                  onClick={() => setActiveTimeRange("30")}
                >
                  30 Days
                </button>
                <button
                  className={`90_days time_button bg-dark text-warning ${
                    activeTimeRange === "90" ? "active_time_button" : ""
                  }`}
                  onClick={() => setActiveTimeRange("90")}
                >
                  90 Days
                </button>
                <button
                  className={`1_year-time time_button bg-dark text-warning ${
                    activeTimeRange === "365" ? "active_time_button" : ""
                  }`}
                  onClick={() => setActiveTimeRange("365")}
                >
                  1 year
                </button>
              </div>
            </>
          ) : (
            <div className="loading">Loading chart data...</div>
          )}
        </div>
      </div>
    </div>
  );
}
