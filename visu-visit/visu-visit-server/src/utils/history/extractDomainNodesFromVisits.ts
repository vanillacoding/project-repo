import { IDomainNode, IVisit } from "../../types/history.type";

const extractDomainNodesFromVisits = (visits: IVisit[]): IDomainNode[] => {
  const nodeByDomain: { [key: string]: IDomainNode } = {};
  const urlMemo: { [domain: string]: boolean } = {};

  visits.forEach((visit) => {
    const {
      targetUrl,
      sourceUrl,
      targetUrlVisitCount,
      visitDuration,
      visitTime: lastVisitTime,
      sourceUrlVisitCount,
    } = visit;
    const targetDomainOrigin = new URL(targetUrl).origin;
    const targetDomainName = targetDomainOrigin === "null" ? targetUrl : targetDomainOrigin;

    if (nodeByDomain[targetDomainName]) {
      nodeByDomain[targetDomainName].visitDuration += visitDuration;

      if (!urlMemo[targetUrl]) {
        nodeByDomain[targetDomainName].visitCount += targetUrlVisitCount;
        nodeByDomain[targetDomainName].lastVisitTime = lastVisitTime;
      }
    } else {
      nodeByDomain[targetDomainName] = {
        name: targetDomainName,
        visitCount: targetUrlVisitCount,
        lastVisitTime,
        visitDuration,
      };

      urlMemo[targetUrl] = true;
    }

    if (!sourceUrl) {
      return;
    }

    const sourceDomainOrigin = new URL(sourceUrl).origin;
    const sourceDomainName = sourceDomainOrigin === "null" ? sourceUrl : sourceDomainOrigin;

    if (!nodeByDomain[sourceDomainName]) {
      nodeByDomain[sourceDomainName] = {
        name: sourceDomainName,
        visitCount: sourceUrlVisitCount,
        visitDuration: 0,
        lastVisitTime: null,
      };
    }
  });

  return Object.values(nodeByDomain);
};

export default extractDomainNodesFromVisits;
