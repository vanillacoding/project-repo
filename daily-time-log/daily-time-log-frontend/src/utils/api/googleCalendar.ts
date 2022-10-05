interface CreateGoogleCalendar {
  googleAccessToken: string;
  timeZone: string;
}

interface DeleteSchedule {
  googleAccessToken: string;
  calendarId: string;
  scheduleId: string;
}
interface CreateSchedule {
  googleAccessToken: string;
  calendarId: string;
  summary: string;
  description: string;
  start: {
    date: string;
    timeZone: string;
  };
  end: {
    date: string;
    timeZone: string;
  };
}

export async function getGoogleCalendarList(googleAccessToken: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList?minAccessRole=owner",
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}
export async function createGoogleCalendar({ googleAccessToken, timeZone }: CreateGoogleCalendar) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify({
      summary: "daily-time-log",
      timeZone,
    }),
  };

  const response = await fetch("https://www.googleapis.com/calendar/v3/calendars", requestOptions);

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function getSchedules(googleAccessToken: string, calendarId: string) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?timeMin=2021-01-01T00:00:00Z`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function createSchedule({
  googleAccessToken,
  calendarId,
  summary,
  description,
  start,
  end,
}: CreateSchedule) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
    body: JSON.stringify({
      summary,
      description,
      start,
      end,
    }),
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }

  return response.json();
}

export async function deleteSchedule({
  googleAccessToken,
  calendarId,
  scheduleId,
}: DeleteSchedule) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
    },
  };

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${scheduleId}`,
    requestOptions,
  );

  if (!response.ok) {
    throw new Error("Problem fetching data");
  }
}
