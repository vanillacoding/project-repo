import dayjs from "dayjs";

import objectSupport from "dayjs/plugin/objectSupport";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(objectSupport);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(isBetween);
