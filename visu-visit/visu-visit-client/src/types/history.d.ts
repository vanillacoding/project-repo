export interface IHistoryFormData {
  start: string;
  end: string;
  domain?: string;
}

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
  visitId: number;
  targetUrl: string;
  targetUrlVisitCount: number;
  visitDuration: number;
  visitTime: string;
  transitionType: UrlTransition;
  sourceUrl: string | null;
  sourceUrlVisitCount: number | null;
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
  name: string;
  index?: number;
  memo?: string;
  color?: string;
  visitCount: number;
  visitDuration: number;
  lastVisitTime: string | null;
}

export interface IDomainLink {
  source: IDomainNode;
  target: IDomainNode;
  count: number;
  type: UrlTransition;
}

export interface IDirectedGraph<Node, Link> {
  nodes: Node[];
  links: Link[];
}

export interface IBrowserHistory {
  nanoId: string;
  totalVisits: IVisit[] | [];
  domainNodes: IDomainNode[] | [];
}

export interface IHistoryApiResponse {
  result: "ok" | "error";
  data?: IBrowserHistory;
  error?: { code: number; message: string };
}

export interface IClickedNode {
  top: number;
  left: number;
  node: IDomainNode;
}
