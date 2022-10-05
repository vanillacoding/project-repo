/**
 * @function it return date controller which helps previous or next date selection
 * @return {Function} - it change current date
 */

import { useState } from "react";

const useDateController = () => {
  const initDate = new Date();
  const [year, setYear] = useState(initDate.getFullYear());
  const [month, setMonth] = useState(initDate.getMonth() + 1);
  const [date, setDate] = useState(initDate.getDate());
  const [IsoTime, setIsoTime] = useState(initDate.toISOString());

  const changeDate = (option) => {
    const diff = option === "forward" ? 1 : -1;

    const temp = new Date(IsoTime);
    temp.setDate(temp.getDate() + diff);

    setIsoTime(temp.toISOString());
    setYear(new Date(temp).getFullYear());
    setMonth(new Date(temp).getMonth() + 1);
    setDate(new Date(temp).getDate());
  };

  return [year, month, date, changeDate];
};

export default useDateController;
