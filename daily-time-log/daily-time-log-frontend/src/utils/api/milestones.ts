/* eslint-disable no-underscore-dangle */
import { v4 as uuid } from "uuid";

import { useServer } from "../../config/api";
import { MilestoneType } from "../../features/milestones/milestonesSlice";

export interface CreateMilestone {
  userId: string;
  summary: string;
  color: string;
  runningTimesIds?: string[];
}

export interface UpdateMilestone {
  id: string;
  summary: string;
}

export async function createMilestone({
  userId,
  summary,
  color,
  runningTimesIds = [],
}: CreateMilestone) {
  if (useServer) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary, color, runningTimesIds }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/users/${userId}/milestones`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const newMilestone = {
    _id: uuid(),
    summary,
    color,
    runningTimesIds,
    isDeleted: false,
  };
  const milestones = JSON.parse(localStorage.getItem("milestones"));
  milestones.push(newMilestone);
  localStorage.setItem("milestones", JSON.stringify(milestones));

  return newMilestone;
}

export async function updateMilestoneSummary({ id, summary }: UpdateMilestone) {
  if (useServer) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ summary }),
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/milestones/${id}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const milestones = JSON.parse(localStorage.getItem("milestones"));
  const newMilestones = milestones.map((milestone: CreateMilestone) => {
    if (milestones._id === id) {
      milestone.summary = summary;
    }

    return milestone;
  });
  localStorage.setItem("milestones", JSON.stringify(newMilestones));

  return null;
}

export async function deleteMilestone(id: string) {
  if (useServer) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/milestones/${id}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Problem fetching data");
    }

    return response.json();
  }

  const milestones = JSON.parse(localStorage.getItem("milestones"));
  const newMilestones = milestones.map((milestone: MilestoneType) => {
    if (milestones._id === id) {
      milestone.isDeleted = true;
    }

    return milestone;
  });
  localStorage.setItem("milestones", JSON.stringify(newMilestones));

  return null;
}
