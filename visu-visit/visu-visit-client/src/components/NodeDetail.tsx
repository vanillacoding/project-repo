/* eslint-disable no-param-reassign */

import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import { BiTimeFive, BiPencil, BiLinkExternal } from "react-icons/bi";
import { AiOutlineNumber } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

import { select } from "d3-selection";
import { RootState } from "../app/store";
import { changeNodeColor, changeNodeMemo, deleteNode } from "../features/history/historySlice";
import flexCenter from "../styles/mixins/flexCenter";
import { IDomainNode, IVisit } from "../types/history";
import { NODE_COLORS } from "../constants/history";
import Tooltip from "./shared/Tooltip";
import Button from "./shared/Button";
import { removeSpecialCases } from "../util/history";

const Wrapper = styled.div`
  position: inherit;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background-color: white;

  * {
    border-radius: 5px;
  }
`;

const FlexContainer = styled.div<{ height?: number | string }>`
  display: flex;
  height: ${({ height = "auto" }) => height}%;
  padding: 5px;
  gap: 10px;
`;

const Domain = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 20px;
  padding: 5px;
  font-weight: 600;
  line-height: 30px;

  &:hover {
    overflow-x: scroll;
  }
`;

const ColorPalettes = styled.section`
  ${flexCenter}
  flex: 1;
  justify-content: space-around;
`;

const Color = styled.div<{ color: string }>`
  width: 20px;
  height: 20px;
  background-color: ${({ color }) => color};
  border: 0.1px solid gray;

  &:hover {
    cursor: pointer;
  }
`;

const MemoContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  padding: 0 5px 5px 5px;
  flex: 3;
`;

const Memo = styled.div`
  position: relative;
  font-family: Montserrat;
  font-size: 15px;
  width: 100%;
  height: 100%;

  &:hover {
    background-color: #d3d3d378;
    cursor: pointer;
  }
`;

const Section = styled.section`
  ${flexCenter}
  flex-direction: column;
  font-size: 10px;
`;

const Number = styled.div`
  font-size: 30px;
`;

const VisitCount = styled(Section)`
  background-color: lightgray;
  flex: 1;
`;

const VisitDuration = styled(Section)`
  background-color: lightgray;
  flex: 1;
`;

const UrlList = styled.section`
  position: relative;
  background-color: lightgray;
  padding: 0 5px 5px 5px;
  flex: 5;
`;

const UrlBox = styled.img`
  width: 30px;
  height: 30px;

  &:hover {
    cursor: pointer;
  }
`;

const SaveButton = styled(Button)`
  flex: 1;
  flex-direction: column;
  background-color: lightblue;
`;

const DeleteButton = styled(Button)`
  flex: 1;
  flex-direction: column;
  background-color: lightcoral;
`;

const TimeUnit = styled.span<{ unit: "hour" | "minute" }>`
  font-size: ${({ unit }) => (unit === "hour" ? 15 : 10)}px;
`;

interface NodeDetailProps {
  node: IDomainNode;
  handleClose: () => void;
}

const DEFAULT_DOMAIN_IMAGE_URL = "/images/graph/defaultNodeFavicon.png";
const MINUTES_LIMIT = 10000;

export default function NodeDetail({ node, handleClose }: NodeDetailProps) {
  const totalVisits = useSelector<RootState, IVisit[]>(({ history }) => history.data.totalVisits);
  const currentNode = useSelector<RootState, IDomainNode>(({ history: { data } }) => {
    const targetIndex = data.domainNodes.findIndex((domainNode) => domainNode.name === node.name);

    return data.domainNodes[targetIndex];
  });
  const [memo, setMemo] = useState<string>(currentNode.memo || "");
  const [isMemoModifying, setIsMemoModifying] = useState(false);
  const dispatch = useDispatch();

  const domainName = currentNode.name;
  const circleSelected = select(`#${removeSpecialCases(domainName)}`).select("circle");

  const mapUrl = ({ targetUrl, sourceUrl }: IVisit) =>
    targetUrl.includes(domainName) && sourceUrl ? sourceUrl : targetUrl;
  const filterByDomain = ({ targetUrl, sourceUrl }: IVisit) =>
    targetUrl.includes(domainName) || (sourceUrl && sourceUrl.includes(domainName));
  const relatedUrls = [...new Set<string>(totalVisits.filter(filterByDomain).map(mapUrl))];
  const visitDuration = Math.ceil((currentNode.visitDuration / 60) * 10) / 10;

  const handleImageError = (event: any) => {
    event.target.src = DEFAULT_DOMAIN_IMAGE_URL;
  };

  // https://www.google.com/s2/favicons?sz=64&domain_url=yahoo.com

  const getFaviconUrl = (srcUrl: string) =>
    `https://www.google.com/s2/favicons?sz=64&domain_url=${srcUrl}`;

  const handleChangeMemo = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(value);
  };

  const handleClick = ({ target: { dataset } }: any) => {
    if (dataset.name === "memo") {
      setIsMemoModifying(true);
    } else if (dataset.name === "color") {
      circleSelected.attr("fill", dataset!.color as string);
      dispatch(changeNodeColor({ domainName, color: dataset.color as string }));
    } else if (dataset.name === "save") {
      dispatch(changeNodeMemo({ memo, domainName }));
      handleClose();
    } else if (dataset.name === "delete") {
      dispatch(deleteNode({ domainName }));
      handleClose();
    } else {
      dispatch(changeNodeMemo({ memo, domainName }));
      setIsMemoModifying(false);
    }
  };

  const isTimeTooBig = visitDuration >= MINUTES_LIMIT;

  return (
    <Wrapper onClick={handleClick}>
      <FlexContainer height={15}>
        <Domain>
          <a href={domainName} target="_blank" rel="noreferrer">
            <UrlBox
              src={getFaviconUrl(domainName)}
              alt="favicon-by-url"
              onError={handleImageError}
            />
          </a>
          {domainName}
        </Domain>
        <ColorPalettes>
          {NODE_COLORS.map((color) => (
            <Color data-name="color" data-color={color} key={color} color={color} />
          ))}
        </ColorPalettes>
      </FlexContainer>
      <FlexContainer height={45}>
        <MemoContainer>
          <FlexContainer>
            <BiPencil />
            <span>Memo</span>
          </FlexContainer>
          {isMemoModifying ? (
            <textarea
              onChange={handleChangeMemo}
              data-name="memo"
              value={memo}
              rows={100}
              cols={20}
              maxLength={1024}
            />
          ) : (
            <Memo data-name="memo">{memo}</Memo>
          )}
        </MemoContainer>
        <VisitCount>
          <AiOutlineNumber size={40} />
          Visit Count
          <Number>{node.visitCount}</Number>
        </VisitCount>
        <VisitDuration>
          <BiTimeFive size={40} />
          Visit Duration
          <Number>
            {isTimeTooBig ? (
              <>
                {Math.floor((visitDuration / 60) * 10) / 10}
                <TimeUnit unit="hour">h</TimeUnit>
              </>
            ) : (
              <>
                {visitDuration}
                <TimeUnit unit="minute">min</TimeUnit>
              </>
            )}
          </Number>
        </VisitDuration>
      </FlexContainer>
      <FlexContainer height={25}>
        <UrlList>
          <FlexContainer>
            <BiLinkExternal />
            Related Urls
          </FlexContainer>
          <FlexContainer style={{ overflow: "auto", width: "300px" }}>
            {relatedUrls.map((url) => (
              <Tooltip key={url} message={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  <UrlBox
                    src={getFaviconUrl(url)}
                    alt="favicon-by-url"
                    onError={handleImageError}
                  />
                </a>
              </Tooltip>
            ))}
          </FlexContainer>
        </UrlList>
        <SaveButton data-name="save">
          <FaCheck data-name="save" size={30} />
          Save
        </SaveButton>
        <DeleteButton data-name="delete">
          <MdDeleteForever data-name="delete" size={30} />
          Delete
        </DeleteButton>
      </FlexContainer>
    </Wrapper>
  );
}
