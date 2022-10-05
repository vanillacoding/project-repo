export type UrlTransition =
  | "Link"
  | "Typed"
  | "Auto_Bookmark"
  | "Auto_Subframe"
  | "Manual_Subframe"
  | "Generated"
  | "Auto_Toplevel"
  | "Form_Submit"
  | "Reload"
  | "Keyword"
  | "Keyword_Generated";

export interface IVisit {
  readonly visitId: number;
  readonly targetUrl: string;
  readonly targetUrlVisitCount: number;
  readonly visitDuration: number;
  readonly visitTime: string;
  readonly transitionType: UrlTransition;
  readonly sourceUrl: string | null;
  readonly sourceUrlVisitCount: number | null;
}

export interface INodePosition {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

export interface IDomainNode extends INodePosition {
  readonly name: string;
  index?: number;
  visitCount: number;
  visitDuration: number;
  lastVisitTime: string | null;
  memo?: string;
  color?: string;
}

export interface IBrowserHistory {
  readonly nanoId: string;
  totalVisits: IVisit[];
  domainNodes: IDomainNode[];
}

export interface IBrowserHistoryQuery {
  readonly start?: string;
  readonly end?: string;
  readonly domain?: string;
}
