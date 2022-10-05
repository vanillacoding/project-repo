import { NextFunction, Request, Response } from "express";
import multer from "multer";

import { IDomainNode, IBrowserHistory, IVisit } from "../types/history.type";
import ERROR from "../constants/errorMessage";
import createError from "../utils/createError";

const upload = multer({
  storage: multer.diskStorage({
    destination: "src/tempHistory/",
    filename: (req, file, callback) => {
      callback(null, "History.db");
    },
  }),
});

export const uploadHistoryFile = upload.single("historyFile");

export const validateBrowserHistoryId = (req: Request, res: Response, next: NextFunction): void => {
  const { browser_history_id: browserHistoryId } = req.params;

  if (typeof browserHistoryId !== "string") {
    res.status(400).json(createError(2002, ERROR.INVALID_HISTORY_ID));
    return;
  }

  next();
};

const isDomainNode = (data: any): data is IDomainNode =>
  data.name !== undefined &&
  data.visitCount !== undefined &&
  data.visitDuration !== undefined &&
  data.lastVisitTime !== undefined;

const isVisit = (data: any): data is IVisit =>
  data.visitId !== undefined &&
  data.visitTime !== undefined &&
  data.targetUrl !== undefined &&
  data.targetUrlVisitCount !== undefined &&
  data.visitDuration !== undefined &&
  data.transitionType !== undefined &&
  data.sourceUrl !== undefined &&
  data.sourceUrlVisitCount !== undefined;

const isBrowserHistory = (data: any): data is IBrowserHistory => {
  if (typeof data !== "object") {
    return false;
  }

  if (
    data.nanoId === undefined ||
    data.totalVisits === undefined ||
    data.domainNodes === undefined
  ) {
    return false;
  }

  if (!Array.isArray(data.totalVisits) || !Array.isArray(data.domainNodes)) {
    return false;
  }

  for (let i = 0; i < data.totalVisits.length; i += 1) {
    if (!isVisit(data.totalVisits[i])) {
      return false;
    }
  }

  for (let i = 0; i < data.domainNodes.length; i += 1) {
    if (!isDomainNode(data.domainNodes[i])) {
      return false;
    }
  }

  return true;
};

export const validateBrowserHistory = (req: Request, res: Response, next: NextFunction): void => {
  if (isBrowserHistory(req.body)) {
    next();
    return;
  }

  res.status(400).json(createError(2003, ERROR.INVALID_HISTORY_FORMAT));
};
