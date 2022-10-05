export const formatDate = (date) => {
  let localDate = new Date(date);
  let nowMonth = (localDate.getMonth() + 1).toString();

  if ((nowMonth).length === 1) {
    nowMonth = "0" + nowMonth;
  }

  let nowDate = (localDate.getDate()).toString();

  if ((nowDate).length === 1) {
    nowDate = "0" + nowDate;
  }

  let nowHours = (localDate.getHours()).toString();

  if ((nowHours).length === 1) {
    nowHours = "0" + nowHours;
  }

  let nowMinutes = localDate.getMinutes().toString();

  if ((nowMinutes).length === 1) {
    nowMinutes = "0" + nowMinutes;
  }

  const formattedDate = localDate.getFullYear() + "-" + nowMonth + "-" + nowDate + " " + nowHours + ":" + nowMinutes;

  return formattedDate.slice(0, 10);
};

export const formatEvents = (events) => {
  const eventList = [];

  for (const key in events) {
    if (events[key].length) {
      events[key].forEach((item) => {
        eventList.push({
          title: key,
          start: formatDate(item.startDate),
          end: formatDate(new Date(item.endDate).setDate(new Date(item.endDate).getDate() + 1)),
        });
      });
    }
  }

  return eventList;
};
