import { useServer } from "../../config/api";
import { MilestoneType } from "../../features/milestones/milestonesSlice";

interface UpdateSettingBody {
  id: string;
  setting: {
    themeMode: string;
  };
}

export async function logIn<T>(body: T) {
  if (useServer) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
      body: JSON.stringify({
        ...body,
      }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/users/sign-in`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const themeMode = localStorage.getItem("themeMode") || "light";
  const milestones: MilestoneType[] = JSON.parse(localStorage.getItem("milestones")) || [];

  return {
    data: {
      themeMode,
      milestones,
    },
  };
}

export async function updateSetting({ id, setting }: UpdateSettingBody) {
  if (useServer) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      cors: "cors",
      body: JSON.stringify({
        ...setting,
      }),
    };

    const response = await fetch(`${process.env.REACT_APP_API_SERVER}/users/${id}`, requestOptions);

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }
}
