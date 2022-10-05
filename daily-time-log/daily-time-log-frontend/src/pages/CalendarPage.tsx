import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import dayjs from "dayjs";

import { useAppSelector, useAppDispatch } from "../app/store";
import { changeMode } from "../features/setting/settingSlice";
import { addGoogleSchedules } from "../features/schedules/schedulesSlice";
import { loadMilestones } from "../features/milestones/milestonesSlice";
import { logIn } from "../utils/api/user";
import {
  createGoogleCalendar,
  getGoogleCalendarList,
  getSchedules,
} from "../utils/api/googleCalendar";

import Layout from "../layouts";
import Side from "../layouts/Side";
import Error from "../features/common/Error";
import MonthCalendar from "../features/calendar/MonthCalendar";
import Milestone from "../features/milestones/Milestone";
import TimeLog from "../features/timeLog/TimeLog";
import { setGoogleCalendarId } from "../features/auth/authSlice";

function CalendarPage() {
  const isLogIn = useAppSelector((state) => state.auth.isLogIn);
  const { email, name, googleAccessToken, googleCalendarId } = useAppSelector(
    (state) => state.auth,
  );
  const { themeMode } = useAppSelector((state) => state.setting);

  const dispatch = useAppDispatch();

  const mileStones = JSON.parse(localStorage.getItem("milestones")) || [];

  const { data: userData, isError: isErrorForLogin } = useQuery(
    "user",
    () => logIn({ email, name, themeMode, mileStones }),
    {
      enabled: isLogIn,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  const { data: googleSchedulesData, isError: IsErrorForGoogleSchedules } = useQuery(
    "schedules",
    () => getSchedules(googleAccessToken, googleCalendarId),
    {
      enabled: !!googleAccessToken && !!googleCalendarId,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  const { data: googleCalendarList, isError: IsErrorForGetGoogleCalendarList } = useQuery(
    "getGoogleCalendarList",
    () => getGoogleCalendarList(googleAccessToken),
    {
      enabled: !!googleAccessToken,
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  );

  const createGoogleCalendarMutation = useMutation(createGoogleCalendar, {
    onSuccess: ({ id }) => {
      dispatch(setGoogleCalendarId(id));
    },
  });

  useEffect(() => {
    if (googleCalendarList) {
      const dailyTimeLogCalendar = googleCalendarList.items.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => item.summary === "daily-time-log",
      );

      if (dailyTimeLogCalendar) {
        dispatch(setGoogleCalendarId(dailyTimeLogCalendar.id));
      } else {
        createGoogleCalendarMutation.mutate({ googleAccessToken, timeZone: dayjs.tz.guess() });
      }
    }
  }, [googleCalendarList]);

  useEffect(() => {
    if (userData) {
      dispatch(changeMode({ themeMode: userData.data.themeMode }));
      dispatch(loadMilestones(userData.data.milestones));
    }
  }, [userData]);

  useEffect(() => {
    if (googleSchedulesData) {
      dispatch(addGoogleSchedules(googleSchedulesData.items));
    }
  }, [googleSchedulesData]);

  if (isErrorForLogin && IsErrorForGoogleSchedules && IsErrorForGetGoogleCalendarList) {
    return <Error />;
  }

  return (
    <Layout>
      <Side>
        <MonthCalendar />
      </Side>

      <Milestone />
      <TimeLog />
    </Layout>
  );
}

export default CalendarPage;
