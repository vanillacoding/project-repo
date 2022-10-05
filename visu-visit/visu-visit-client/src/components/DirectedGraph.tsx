/* eslint-disable no-param-reassign */

import { MouseEvent, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { forceManyBody, forceLink, forceSimulation, forceX, forceY } from "d3-force";
import { schemePaired } from "d3-scale-chromatic";
import { scaleOrdinal } from "d3-scale";
import { select } from "d3-selection";
import { D3ZoomEvent, zoom } from "d3-zoom";
import { drag } from "d3-drag";

import { RootState } from "../app/store";
import { changeNodePosition, resetNodePosition } from "../features/history/historySlice";
import { IClickedNode, IDomainLink, IDomainNode, IVisit } from "../types/history";
import { DEFAULT_STROKE_WIDTH, URL_TRANSITION_TYPES } from "../constants/history";
import Modal from "./shared/Modal";
import NodeDetail from "./NodeDetail";
import {
  getArrowPosition,
  handleLinkDistance,
  getLinkStroke,
  handleMouseOut,
  handleMouseOver,
  makeGraphData,
  removeSpecialCases,
  getNodeRadius,
  getNodeStrength,
} from "../util/history";
import LinkDescription from "./LinkDescription";

const Wrapper = styled.div`
  margin: 20px;

  .node {
    cursor: move;
    fill: #ffffff;
    stroke: #000;
    stroke-width: 1.5px;
  }
`;

const Board = styled.svg`
  width: 100%;
  height: 80vh;
  background-color: #eee;
  border-radius: 10px;
`;

const colorScaleOrdinal = scaleOrdinal(URL_TRANSITION_TYPES, schemePaired);
const INITIAL_CLICKED_NODE = { top: 0, left: 0, node: {} as IDomainNode };

export default function DirectedGraph() {
  const domainNodes = useSelector<RootState, IDomainNode[]>(
    ({ history }) => history.data.domainNodes,
  );
  const totalVisits = useSelector<RootState, IVisit[]>(({ history }) => history.data.totalVisits);
  const [clickedNode, setClickedNode] = useState<IClickedNode>(INITIAL_CLICKED_NODE);
  const [isNodeDetailVisible, setIsNodeDetailVisible] = useState<boolean>(false);
  const [zoomTransform, setZoomTransform] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const dispatch = useDispatch();

  const handleCloseNodeDetail = () => {
    setIsNodeDetailVisible(false);
  };

  useLayoutEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const { width, height } = svgRef.current.getBoundingClientRect();
    const { nodes, links } = makeGraphData(totalVisits, domainNodes);
    const svg = select<SVGSVGElement, SVGSVGElement>(svgRef.current);

    svg.selectAll("*").remove();

    const container = svg.append("svg:g");

    if (zoomTransform) {
      container.attr("transform", zoomTransform);
    }

    const handleZoom = (event: D3ZoomEvent<SVGSVGElement, SVGSVGElement>) => {
      container.attr("transform", event.transform.toString());
      setZoomTransform(event.transform.toString());
    };
    const zoomBehavior = zoom<SVGSVGElement, SVGSVGElement>()
      .extent([
        [0, 0],
        [width, height],
      ])
      .scaleExtent([0, 2])
      .on("zoom", handleZoom);

    svg.call(zoomBehavior).on("dblclick.zoom", null);

    const simulation = forceSimulation<IDomainNode, IDomainLink>(nodes)
      .force(
        "link",
        forceLink<IDomainNode, IDomainLink>(links)
          .distance(handleLinkDistance)
          .id(({ name }) => name),
      )
      .force("charge", forceManyBody<IDomainNode>().strength(getNodeStrength))
      .force("x", forceX(width / 2))
      .force("y", forceY(height / 2));

    const handleDrag = ({ x, y }: DragEvent, node: IDomainNode) => {
      node.fx = x;
      node.fy = y;
      simulation.alpha(1).restart();
    };
    const handleDragEnd = (event: DragEvent, node: IDomainNode) => {
      dispatch(changeNodePosition(node));
    };
    const dragBehavior = drag<SVGSVGElement, IDomainNode>()
      .on("drag", handleDrag)
      .on("end", handleDragEnd);

    container
      .append("svg:defs")
      .selectAll("marker")
      .data(URL_TRANSITION_TYPES)
      .join("marker")
      .attr("id", (urlTransition) => `arrow-${urlTransition}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10)
      .attr("refY", -1.5)
      .attr("markerWidth", 5)
      .attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("svg:path")
      .attr("fill", colorScaleOrdinal)
      .attr("d", "M0, -5L10, 0L0, 5");

    const linkGroup = container
      .append("svg:g")
      .attr("fill", "none")
      .selectAll("path")
      .data<IDomainLink>(links)
      .join("path")
      .attr("stroke-width", getLinkStroke)
      .attr("stroke", (domainLink) => colorScaleOrdinal(domainLink.type))
      .attr("marker-end", (domainLink) => `url(#arrow-${domainLink.type})`);

    const nodeGroup = container
      .append<SVGSVGElement>("svg:g")
      .selectAll("g")
      .data<IDomainNode>(nodes)
      .join("g")
      .style("cursor", "pointer")
      .attr("class", "history-node")
      .attr("id", (domainNode) => removeSpecialCases(domainNode.name));

    nodeGroup
      .append("circle")
      .attr("fill", ({ color: nodeColor }) => nodeColor || "white")
      .attr("stroke", "gray")
      .attr("stroke-width", DEFAULT_STROKE_WIDTH)
      .attr("r", getNodeRadius)
      .join("circle");

    nodeGroup
      .append("image")
      .attr(
        "xlink:href",
        ({ name }) =>
          `https://www.google.com/s2/favicons?sz=128&domain_url=${new URL(name).hostname}`,
      )
      .on("error", ({ target }) => {
        select(target).attr("xlink:href", "/images/graph/defaultNodeFavicon.png");
      })
      .attr("width", (node) => getNodeRadius(node))
      .attr("height", (node) => getNodeRadius(node))
      .attr("x", (node) => -getNodeRadius(node) / 2)
      .attr("y", (node) => -getNodeRadius(node) / 2);

    const handleContextMenu = (event: MouseEvent, domainNode: IDomainNode) => {
      event.preventDefault();

      const [RESIZE_X, RESIZE_Y] = [500, 300];
      const SCREEN_HALF_RATIO = 0.5;
      const { pageX, pageY, clientX, clientY, view } = event;
      const { innerHeight, innerWidth }: any = view;
      const left = clientX / innerWidth < SCREEN_HALF_RATIO ? pageX : pageX - RESIZE_X;
      const top = clientY / innerHeight < SCREEN_HALF_RATIO ? pageY : pageY - RESIZE_Y;

      setClickedNode({
        top,
        left,
        node: domainNode,
      });
      setIsNodeDetailVisible(true);
    };

    const handleDoubleClick = (event: MouseEvent, domainNode: IDomainNode) => {
      if (!domainNode) {
        return;
      }

      dispatch(resetNodePosition(domainNode));

      simulation.alpha(1).restart();
    };

    container
      .selectAll<SVGSVGElement, IDomainNode>(".history-node")
      .call(dragBehavior)
      .on("contextmenu", handleContextMenu)
      .on("dblclick", handleDoubleClick)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);

    const handleTick = () => {
      linkGroup.attr("d", (domainLink) => {
        const targetNode = nodes.find((node) => node.name === domainLink.target.name);
        let radius = 20;

        if (targetNode) {
          radius = getNodeRadius(targetNode);
        }

        return getArrowPosition(domainLink, radius);
      });

      nodeGroup.attr("transform", (domainNode) => `translate(${domainNode.x},${domainNode.y})`);
    };

    simulation.on("tick", handleTick);
  }, [totalVisits]);

  return (
    <Wrapper>
      <LinkDescription colorScaleOrdinal={colorScaleOrdinal} />
      <Board ref={svgRef} />
      {isNodeDetailVisible && (
        <Modal
          position={{ top: `${clickedNode.top}px`, left: `${clickedNode.left}px` }}
          handleClose={handleCloseNodeDetail}
        >
          <NodeDetail node={clickedNode.node} handleClose={handleCloseNodeDetail} />
        </Modal>
      )}
    </Wrapper>
  );
}
