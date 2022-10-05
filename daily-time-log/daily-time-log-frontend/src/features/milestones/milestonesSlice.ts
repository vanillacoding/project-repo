/* eslint-disable no-underscore-dangle */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MilestoneType {
  _id: string;
  summary: string;
  color?: string;
  isDeleted?: boolean;
  runningTimesIds?: string[];
}

export interface MilestoneState {
  allMilestonesId: string[];
  byMilestonesId: {
    [key: string]: MilestoneType;
  };
}

const initialState: MilestoneState = {
  allMilestonesId: [],
  byMilestonesId: {},
};

const milestonesSlice = createSlice({
  name: "milestones",
  initialState,
  reducers: {
    initMilestones: (state) => {
      state.allMilestonesId = [];
      state.byMilestonesId = {};
    },
    loadMilestones: (state, action: PayloadAction<MilestoneType[]>) => {
      const milestonesData = action.payload;
      milestonesData.forEach((milestone) => {
        state.allMilestonesId.push(milestone._id);
        state.byMilestonesId[milestone._id] = milestone;
      });
    },
    addMilestone: (state, action: PayloadAction<MilestoneType>) => {
      const milestoneData = action.payload;

      state.allMilestonesId.push(milestoneData._id);
      state.byMilestonesId[milestoneData._id] = milestoneData;
    },
    updateMilestone: (state, action: PayloadAction<MilestoneType>) => {
      const milestoneData = action.payload;

      state.byMilestonesId[milestoneData._id].summary = milestoneData.summary;
    },
    removeMilestone: (state, action: PayloadAction<string>) => {
      state.byMilestonesId[action.payload].isDeleted = true;
    },
  },
});

export const { initMilestones, loadMilestones, addMilestone, updateMilestone, removeMilestone } =
  milestonesSlice.actions;

export default milestonesSlice.reducer;
