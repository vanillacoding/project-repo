import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import actionCreator from "../actions/actionCreator";
import { TICKERS } from "../constants/constants";

/**
 *
 * @param {object} coinData
 * @param {string} name
 * @param {func} showErrorMessage
 * @returns {array, number, func} selected List, total value of cryptofolio, handler funcs
 */
const useCreateCryptoFolio = (coinData, name, showErrorMessage) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedList, setSelectedList] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleSelect = useCallback(
    (ticker) => {
      const newSet = selectedList.filter((coin) => coin.name !== ticker);

      if (newSet.length === selectedList.length) {
        setSelectedList([...newSet, { name: ticker, amount: 0 }]);
      } else {
        setSelectedList([...newSet]);
      }
    },
    [selectedList]
  );

  const handleAmount = useCallback(
    (amount, ticker) => {
      const newSelectedList = selectedList.map((coin) => {
        if (coin.name === ticker) {
          return { ...coin, amount };
        }
        return coin;
      });

      const newTotal = newSelectedList.reduce((accumulator, coin) => {
        if (!coin.amount) {
          return accumulator;
        }
        return (accumulator +=
          parseFloat(coin.amount) * coinData[coin.name].price.price);
      }, 0);

      setSelectedList(newSelectedList);
      setTotalValue(newTotal);
    },
    [coinData, selectedList]
  );

  const handleReset = useCallback(() => {
    setSelectedList([]);
    setTotalValue(0);
  }, []);

  const handleRandom = useCallback(
    (coinNumber, maxAsset) => {
      const NANRegex = /[^0-9.]/g;
      let asset = parseInt(maxAsset, 0);

      if (NANRegex.test(maxAsset) && maxAsset.length > 0) {
        return showErrorMessage("금액 한도에는 숫자만 입력할 수 있습니다.");
      }

      if (!asset) {
        asset = 100000;
      }

      const eachValue = asset / coinNumber;
      const randomList = [];
      let totalValue = 0;

      for (let i = 0; i < coinNumber; i++) {
        const pickedRandom =
          TICKERS[Math.floor(Math.random() * TICKERS.length)];
        randomList.push(pickedRandom);
      }

      const randomSet = randomList.map((ticker) => {
        const amount = (eachValue / coinData[ticker].price?.price).toFixed(2);
        totalValue += parseFloat(
          (amount * coinData[ticker].price?.price).toFixed(2)
        );

        return { name: ticker, amount };
      });

      setSelectedList(randomSet);
      setTotalValue(totalValue);
    },
    [coinData, showErrorMessage]
  );

  const handleCreate = useCallback(() => {
    if (name.length === 0) {
      return showErrorMessage("크립토폴리오 이름을 입력해주세요.");
    }

    dispatch(
      actionCreator.createCryptofolioAction(
        name,
        selectedList,
        totalValue,
        history
      )
    );
  }, [name, dispatch, selectedList, totalValue, history, showErrorMessage]);

  const createHandler = {
    handleSelect,
    handleAmount,
    handleReset,
    handleRandom,
    handleCreate,
  };

  return {
    selectedList,
    totalValue,
    createHandler,
    handleSelect,
    handleAmount,
    handleReset,
    handleRandom,
    handleCreate,
  };
};

export default useCreateCryptoFolio;
