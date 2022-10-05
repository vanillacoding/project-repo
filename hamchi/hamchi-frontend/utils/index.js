export const arrayToObject = function (array) {
  const object = {};

  for (let i = 0; i < array.length; i++) {
    object[array[i]._id] = array[i];
    delete object[array[i]._id]._id;
  }

  return object;
};

export const byIndex = function (array) {
  const indexes = {};

  for (let i = 0; i < array.length; i++) {
    indexes[array[i]._id] = i;
  }

  return indexes;
};

export const formatTime = function (currentDate) {
  const minute = currentDate.getMinutes();
  let hour = currentDate.getHours();
  const term = hour >= 12 ? '오후' : '오전';

  hour = hour > 12 ? hour - 12 : hour;

  return `${term} ${hour}:${('0' + minute).slice(-2)}`;
};

export const formatDate = function (currentDate) {
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  return `${month}월 ${date}일`;
}

export const formatFullDate = function (currentDate) {
  if (!currentDate) {
    return '';
  }
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();

  return `${year}.${month}.${date}`;
}
