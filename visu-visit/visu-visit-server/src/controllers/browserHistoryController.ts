import fs from "fs";
import { Request, Response } from "express";
import { getVisitData } from "../sqlite3/index";

import { IBrowserHistory } from "../types/history.type";
import BrowserHistory from "../models/BrowserHistory";

import extractDomainNodesFromVisits from "../utils/history/extractDomainNodesFromVisits";
import createError from "../utils/createError";

import ERROR from "../constants/errorMessage";

export const convertHistoryFile = async (req: Request, res: Response): Promise<void> => {
  const { browser_history_id: browserHistoryId } = req.params;

  try {
    const totalVisits = await getVisitData();

    const domainNodes = extractDomainNodesFromVisits(totalVisits);

    const browserHistory: IBrowserHistory = {
      nanoId: browserHistoryId,
      totalVisits,
      domainNodes,
    };

    res.json({ result: "ok", data: browserHistory });
  } catch (error) {
    res.status(500).json(createError(2000, ERROR.HISTORY_PROCESS));
  } finally {
    fs.unlinkSync("src/tempHistory/History.db");
  }
};

export const getBrowserHistory = async (req: Request, res: Response): Promise<void> => {
  const { browser_history_id: browserHistoryId } = req.params;

  try {
    const browserHistory: IBrowserHistory = await BrowserHistory.findOne({
      nanoId: browserHistoryId,
    }).lean();

    if (!browserHistory) {
      res.status(400).json(createError(2007, ERROR.INVALID_HISTORY_ID));
      return;
    }

    res.json({
      result: "ok",
      data: browserHistory,
    });
  } catch (error) {
    res.status(500).json(createError(2000, ERROR.INTERNAL_SERVER));
  }
};

export const saveOrUpdateBrowserHistory = async (req: Request, res: Response): Promise<void> => {
  const { browser_history_id: browserHistoryId } = req.params;
  const browserHistory: IBrowserHistory = req.body;

  try {
    if (!browserHistory) {
      res.status(500).json(createError(2007, ERROR.HISTORY_PROCESS));
      return;
    }

    const targetBrowserHistory = await BrowserHistory.findOne({ nanoId: browserHistoryId });

    if (targetBrowserHistory) {
      await BrowserHistory.updateOne({ nanoId: browserHistoryId }, { ...browserHistory });
    } else {
      await BrowserHistory.create(browserHistory);
    }

    res.json({ result: "ok" });
  } catch (error) {
    res.status(500).json(createError(2004, ERROR.HISTORY_PROCESS));
  }
};

export const deleteBrowserHistory = async (req: Request, res: Response): Promise<void> => {
  const { browser_history_id: browserHistoryId } = req.params;

  try {
    const { deletedCount } = await BrowserHistory.deleteOne({
      nanoId: browserHistoryId,
    });

    if (deletedCount === 0) {
      res.status(400).json(createError(2007, ERROR.HISTORY_ID_NOT_EXIST));
      return;
    }

    res.json({ result: "ok" });
  } catch (error) {
    res.status(500).json(createError(2001, ERROR.HISTORY_DELETE));
  }
};
