/* eslint-disable no-useless-escape */

import { scaleLinear, scaleSqrt } from "d3-scale";
import { select } from "d3-selection";
import cloneDeep from "lodash/cloneDeep";

import { IDomainLink, IVisit, IDomainNode } from "../../types/history";

export const removeSpecialCases = (str: string): string => {
  const reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ ]/gim;

  return str.replace(reg, "");
};

export const makeGraphData = (
  totalVisits: IVisit[],
  domainNodes: IDomainNode[],
): { nodes: IDomainNode[]; links: IDomainLink[] } => {
  const nodes = cloneDeep(domainNodes);
  const links: { [key: string]: IDomainLink } = {};

  totalVisits.forEach(({ sourceUrl, targetUrl, transitionType }) => {
    if (!sourceUrl) {
      return;
    }

    const sourceDomain = new URL(sourceUrl).origin;
    const targetDomain = new URL(targetUrl).origin;

    if (sourceDomain === targetDomain) {
      return;
    }

    const sourceAndTarget = `from ${sourceDomain} to ${targetDomain}`;
    const sourceNode = nodes.find(({ name }) => name === sourceDomain);
    const targetNode = nodes.find(({ name }) => name === targetDomain);

    if (!sourceNode || !targetNode) {
      return;
    }

    if (links[sourceAndTarget]) {
      links[sourceAndTarget].count += 1;
    } else {
      links[sourceAndTarget] = {
        source: sourceNode,
        target: targetNode,
        type: transitionType,
        count: 1,
      };
    }
  });

  return { nodes, links: Object.values(links) };
};

const MINIMUM_DISTANCE = 200;
const MAXIMUM_DISTANCE = 800;
const MAX_HANDLED_LINK_COUNT = 1000;
const MAX_HANDLED_VISIT_DURATION = 1000000;
const MAX_NODE_STRENGTH = -300;
const MIN_NODE_STRENGTH = -800;
const MINIMUM_RADIUS = 20;
const MAXIMUM_RADIUS = 100;

const createLinkBySourceAndTarget = scaleLinear()
  .domain([0, MAX_HANDLED_LINK_COUNT])
  .range([MINIMUM_DISTANCE, MAXIMUM_DISTANCE]);

export const handleLinkDistance = (link: IDomainLink) => createLinkBySourceAndTarget(link.count);

export const getNodeStrength = (node: IDomainNode) =>
  scaleSqrt().domain([0, MAX_HANDLED_VISIT_DURATION]).range([MIN_NODE_STRENGTH, MAX_NODE_STRENGTH])(
    node.visitDuration,
  );

export const getLinkStroke = (link: IDomainLink) =>
  scaleLinear().domain([0, MAX_HANDLED_LINK_COUNT]).range([1, 10])(link.count);

export const convertDurationToRadius = scaleSqrt()
  .domain([0, MAX_HANDLED_VISIT_DURATION])
  .range([MINIMUM_RADIUS, MAXIMUM_RADIUS]);

export const getNodeRadius = (domainNode: IDomainNode) =>
  convertDurationToRadius(domainNode.visitDuration);

export const handleMouseOut = (event: MouseEvent, domainNode: IDomainNode) => {
  if (!domainNode) {
    return;
  }

  select(`#${removeSpecialCases(domainNode.name)} text`).remove();
};

export const handleMouseOver = (event: MouseEvent, domainNode: IDomainNode) => {
  if (!domainNode) {
    return;
  }

  select(`#${removeSpecialCases(domainNode.name)}`)
    .append("text")
    .attr("x", 8)
    .attr("y", "0.31em")
    .text(domainNode.name)
    .attr("fill", "black")
    .attr("font-size", "10px")
    .attr("transform", "translate(10 0)");
};

export const getArrowPosition = (link: IDomainLink, radius: number) => {
  if (
    link.target.x === undefined ||
    link.target.y === undefined ||
    link.source.x === undefined ||
    link.source.y === undefined
  ) {
    return "M0, -5L10, 0L0, 5";
  }

  const dx = link.target.x - link.source.x;
  const dy = link.target.y - link.source.y;
  const dr = Math.sqrt(dx * dx + dy * dy);

  const offsetX = (dx * radius) / dr || 0;
  const offsetY = (dy * radius) / dr || 0;

  const placeX = link.target.x - offsetX;
  const placeY = link.target.y - offsetY;

  const px = link.source.x;
  const py = link.source.y;

  return `M${px},${py}A${dr},${dr} 0 0,1 ${placeX},${placeY}`;
};
