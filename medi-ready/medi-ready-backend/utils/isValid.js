exports.input = (...args) => {
  return args.every((item) => {
    return item && item.trim();
  });
};

exports.duration = (duration) => {
  return Number(duration) > 0 && Number.isInteger(Number(duration));
};

exports.medicines = (medicines) => {
  return medicines.every((medicine) => {
    return medicine.hasOwnProperty("id") && medicine.hasOwnProperty("name");
  });
};

exports.doseTimes = (times) => {
  const timeList = ["morning", "lunch", "dinner", "before_bed"];

  return Object.keys(times).every((time) => {
    return timeList.includes(time);
  });
};

exports.alarmTime = (times) => {
  return (
    times.hasOwnProperty("morning") &&
    times.hasOwnProperty("lunch") &&
    times.hasOwnProperty("dinner") &&
    times.hasOwnProperty("beforeBed")
  );
};
