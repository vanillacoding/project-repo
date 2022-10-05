/**
 * @function it handles state and handler relevant with match
 * @return {Array} - match state and match state handler
 */

import { useState } from "react";
import produce from "immer";

const useMatchState = () => {
  const [match, setMatch] = useState({
    month: (new Date().getMonth() + 1).toString(),
    date: new Date().getDate().toString(),
    start: "8",
    end: "10",
    meridiem: "AM",
    playground: null,
    type: null,
  });

  const handleSelectType = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.type = value;
    }));
  };

  const handleSelectMonth = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.month = value;
    }));
  };

  const handleSelectDate = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.date = value;
    }));
  };

  const handleSelectMeridiem = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.meridiem = value;
    }));
  };

  const handleSelectStart = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.start = value.replace(":00", "");
    }));
  };

  const handleSelectEnd = (index, value) => {
    setMatch(produce(match, (draft) => {
      draft.end = value.replace(":00", "");
    }));
  };

  const handlePressPlayground = (value) => {
    setMatch(produce(match, (draft) => {
      draft.playground = value;
    }));
  };

  return [
    match,
    handleSelectType,
    handleSelectMonth,
    handleSelectDate,
    handleSelectMeridiem,
    handleSelectStart,
    handleSelectEnd,
    handlePressPlayground,
  ];
};

export default useMatchState;
