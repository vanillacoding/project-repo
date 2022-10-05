import moment from "moment";

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s 전",
    s: "방금",
    ss: "%d초",
    m: "1분",
    mm: "%d분",
    h: "1시간",
    hh: "%d시간",
    d: "하루",
    dd: "%d일",
    M: "한 달",
    MM: "%d달",
    y: "1년",
    yy: "%d년",
  },
});
