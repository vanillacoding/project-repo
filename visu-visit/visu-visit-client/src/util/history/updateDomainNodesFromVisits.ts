import { IVisit, IDomainNode } from "../../types/history";

const updateDomainNodesFromVisits = (
  visits: IVisit[],
  domainNodes: IDomainNode[],
): IDomainNode[] => {
  const nodeByDomain: {
    [key: string]: IDomainNode;
  } = {};
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
    const targetNode = domainNodes[domainNodes.findIndex(({ name }) => name === targetDomainName)];

    if (nodeByDomain[targetDomainName]) {
      nodeByDomain[targetDomainName].visitDuration += visitDuration;

      if (!urlMemo[targetUrl]) {
        nodeByDomain[targetDomainName].visitCount += targetUrlVisitCount;
        nodeByDomain[targetDomainName].lastVisitTime = lastVisitTime;
      }
    } else {
      nodeByDomain[targetDomainName] = {
        ...targetNode,
        name: targetDomainName,
        visitCount: targetUrlVisitCount,
        visitDuration,
        lastVisitTime,
      };

      urlMemo[targetUrl] = true;
    }

    if (!sourceUrl) {
      return;
    }

    const sourceDomainOrigin = new URL(sourceUrl).origin;
    const sourceDomainName = sourceDomainOrigin === "null" ? sourceUrl : sourceDomainOrigin;
    const sourceNode = domainNodes[domainNodes.findIndex(({ name }) => name === sourceDomainName)];

    if (!nodeByDomain[sourceDomainName]) {
      nodeByDomain[sourceDomainName] = {
        ...sourceNode,
        name: sourceDomainName,
        visitCount: sourceUrlVisitCount || 0,
        visitDuration: 0,
        lastVisitTime: null,
      };
    }
  });

  return Object.values(nodeByDomain);
};

export default updateDomainNodesFromVisits;
