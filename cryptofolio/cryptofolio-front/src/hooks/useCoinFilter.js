import { useEffect, useCallback } from "react";

/**
 *
 * @param {object} coinData
 * @param {func} setSearchTerm
 * @returns {arrary, func} filtered List, search/filter function
 */
const useCoinFilter = (coinData, setSearchTerm, setCoinList) => {
  const handleSearch = useCallback(
    (input) => {
      setSearchTerm(input);

      const filtered = Object.values(coinData).filter(
        (coin) =>
          coin.name.toLowerCase().includes(input.toLowerCase()) ||
          coin.ticker.toLowerCase().includes(input.toLowerCase())
      );

      setCoinList(filtered);
    },
    [coinData, setCoinList, setSearchTerm]
  );

  const handleFilter = useCallback(
    (value, type) => {
      let filtered = [];

      switch ((value, type)) {
        case "all":
          filtered = Object.values(coinData);
          break;

        case "exchange":
          filtered = Object.values(coinData).filter((v) =>
            v.exchanges.includes(value)
          );
          break;

        case "category":
          filtered = Object.values(coinData).filter((v) => {
            return v.categories.includes(value);
          });
          break;

        case "portfolio":
          filtered = Object.values(coinData).filter((v) => {
            return v.portfolios.includes(value);
          });
          break;

        default:
          filtered = Object.values(coinData);
          break;
      }

      setCoinList(filtered);
    },
    [coinData, setCoinList]
  );

  useEffect(() => {
    if (coinData) {
      const coins = Object.values(coinData);
      setCoinList(coins);
    }
  }, [coinData, setCoinList]);

  return {
    handleSearch,
    handleFilter,
  };
};

export default useCoinFilter;
