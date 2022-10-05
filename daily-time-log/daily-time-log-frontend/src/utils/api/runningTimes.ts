import { useServer } from "../../config/api";

interface CreateRunningTime {
  milestoneId: string;
  runningTime: {
    start: {
      dateTime: string;
      timezone: string;
    };
    end: {
      dateTime: string;
      timezone: string;
    };
  };
}

export async function createRunningTime({ milestoneId, runningTime }: CreateRunningTime) {
  if (useServer) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(runningTime),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/milestones/${milestoneId}/goals`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }
}

export async function getRunningTimeByDate(email: string, startDate: string, endDate: string) {
  if (useServer) {
    const requestOptions = {
      method: "GET",
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/goals/date?email=${email}&startDate=${startDate}&endDate=${endDate}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }
}
