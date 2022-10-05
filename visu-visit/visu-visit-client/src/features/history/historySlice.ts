/* eslint-disable no-param-reassign */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBrowserHistory, IDomainNode } from "../../types/history.d";

interface BROWSER_HISTORY_INITIAL_STATE {
  data: IBrowserHistory;
  origin: IBrowserHistory | null;
}

export const INITIAL_BROWSER_HISTORY_ID = "initialization";
export const INITIAL_STATE: BROWSER_HISTORY_INITIAL_STATE = {
  data: {
    nanoId: INITIAL_BROWSER_HISTORY_ID,
    totalVisits: [
      {
        visitId: 0,
        visitTime: "",
        targetUrl: "http://www.naver.com",
        targetUrlVisitCount: 0,
        visitDuration: 1000,
        transitionType: "Link",
        sourceUrl: "http://www.google.com",
        sourceUrlVisitCount: 1,
      },
      {
        visitId: 1,
        visitTime: "",
        targetUrl: "http://www.google.com",
        targetUrlVisitCount: 0,
        visitDuration: 1000,
        transitionType: "Link",
        sourceUrl: "http://www.naver.com",
        sourceUrlVisitCount: 1,
      },
    ],
    domainNodes: [
      {
        name: "http://www.naver.com",
        x: 0,
        y: 0,
        fx: -100,
        fy: -100,
        memo: "memo",
        color: "skyblue",
        visitCount: 1,
        visitDuration: 0,
        lastVisitTime: null,
      },
      {
        name: "http://www.google.com",
        x: 500,
        y: 300,
        fx: -100,
        fy: -100,
        memo: "",
        color: "lightcoral",
        visitCount: 1,
        visitDuration: 0,
        lastVisitTime: null,
      },
    ],
  },
  origin: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState: INITIAL_STATE,
  reducers: {
    updateBrowserHistory: (state, action: PayloadAction<IBrowserHistory>) => {
      const { nanoId, domainNodes, totalVisits } = action.payload;

      state.data = { nanoId, domainNodes, totalVisits };
    },

    changeNodePosition: (state, action: PayloadAction<IDomainNode>) => {
      const targetIndex = state.data.domainNodes.findIndex(
        (node) => node.name === action.payload.name,
      );

      if (targetIndex !== -1) {
        const targetNode = state.data.domainNodes[targetIndex];

        state.data.domainNodes[targetIndex] = { ...targetNode, ...action.payload };
      }
    },

    resetNodePosition: (state, action: PayloadAction<IDomainNode>) => {
      const targetIndex = state.data.domainNodes.findIndex(
        (node) => node.name === action.payload.name,
      );
      const targetNode = action.payload;

      delete targetNode.fx;
      delete targetNode.fy;

      if (targetIndex !== -1) {
        state.data.domainNodes[targetIndex] = { ...targetNode };
      }
    },

    changeNodeColor: (state, action: PayloadAction<{ domainName: string; color: string }>) => {
      const targetIndex = state.data.domainNodes.findIndex(
        (node) => node.name === action.payload.domainName,
      );

      if (targetIndex !== -1) {
        state.data.domainNodes[targetIndex].color = action.payload.color;
      }
    },

    changeNodeMemo: (state, action: PayloadAction<{ domainName: string; memo: string }>) => {
      const { domainName, memo } = action.payload;
      const targetIndex = state.data.domainNodes.findIndex((node) => node.name === domainName);

      if (targetIndex !== -1) {
        state.data.domainNodes[targetIndex].memo = memo;
      }
    },

    deleteNode: (state, action: PayloadAction<{ domainName: string }>) => {
      const { domainName } = action.payload;
      const targetIndex = state.data.domainNodes.findIndex((node) => node.name === domainName);

      if (targetIndex === -1) {
        return;
      }

      state.data.totalVisits = state.data.totalVisits.filter(({ sourceUrl, targetUrl }) => {
        if (targetUrl.includes(domainName)) {
          return false;
        }

        if (sourceUrl && sourceUrl.includes(domainName)) {
          return false;
        }

        return true;
      });

      state.data.domainNodes.splice(targetIndex, 1);
    },

    updateOriginBrowserHistory: (state, action: PayloadAction<IBrowserHistory>) => {
      const { nanoId, domainNodes, totalVisits } = action.payload;

      state.origin = { nanoId, domainNodes, totalVisits };
      state.data = { nanoId, domainNodes, totalVisits };
    },
  },
});

export const {
  updateBrowserHistory,
  changeNodePosition,
  resetNodePosition,
  changeNodeMemo,
  changeNodeColor,
  deleteNode,
  updateOriginBrowserHistory,
} = historySlice.actions;

export default historySlice.reducer;
