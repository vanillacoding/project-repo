export default function dateFormatter(dbDate) {
  const date = new Date(dbDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${year}-${month}-${day} ${addzero(hour)}:${addzero(minute)}`;

  function addzero(num) {
    if (num > 9) return num;

    return `0${num.toString()}`;
  }
}
