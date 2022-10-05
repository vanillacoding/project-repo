import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import { RiSave3Fill, RiDeleteBin6Fill, RiQuestionLine } from "react-icons/ri";
import { BiCopy } from "react-icons/bi";
import { BsFillShareFill } from "react-icons/bs";

import { RootState } from "../app/store";
import {
  INITIAL_BROWSER_HISTORY_ID,
  updateBrowserHistory,
  updateOriginBrowserHistory,
} from "../features/history/historySlice";
import {
  IBrowserHistory,
  IHistoryFormData,
  IHistoryApiResponse,
  IVisit,
  IDomainNode,
} from "../types/history";

import { deleteHistory, fetchHistory, saveHistory } from "../api";
import updateDomainNodesFromVisits from "../util/history/updateDomainNodesFromVisits";
import filterVisits from "../util/history/filterVisits";

import DirectedGraph from "../components/DirectedGraph";
import Instruction from "../components/Instruction";

import Aside from "../components/shared/Aside";
import ErrorMessage from "../components/shared/ErrorMessage";
import Loading from "../components/shared/Loading";
import Title from "../components/shared/Title";
import Modal from "../components/shared/Modal";

import { ASIDE_BUTTON_KOREAN } from "../constants/message";

const Wrapper = styled.div`
  display: flex;
  font-family: Montserrat;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const HistoryTitle = styled(Title)`
  font-size: 30px;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

const Fieldset = styled.fieldset`
  display: flex;
  align-items: center;
  margin: 20px;
  font-size: 20px;
  font-weight: 100;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: 1px solid gray;
  height: 20px;
  width: fit-content;
  font-family: Montserrat;
  font-weight: 200;
`;

const SearchButton = styled.button`
  width: 150px;
  height: 40px;
  margin-left: auto;
  margin-right: 20px;
  border-radius: 5px;
  border: 0;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background: ${({ theme, disabled }) => (disabled ? "lightgray" : theme.gradient.orange)};
  font-family: Montserrat;
  font-weight: 200;
  font-size: 20px;
`;

const AsideButton = styled.button`
  width: 50px;
  height: 50px;
  background: none;
  border: 0;

  &:hover {
    background-color: lightgray;
    border-radius: 10px;
  }
`;

const Share = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
  height: 100px;
  background-color: white;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  gap: 10px;
  padding: 10px;

  > svg {
    padding: 5px;

    &:hover {
      cursor: pointer;
      background-color: lightgray;
      border-radius: 5px;
    }
  }
`;

const INITIAL_HISTORY_FORM_DATA = {
  start: "",
  end: "",
  domain: "",
};

export default function History() {
  const originBrowserHistory = useSelector<RootState, IBrowserHistory | null>(
    ({ history }) => history.origin,
  );
  const browserHistoryData = useSelector<RootState, IBrowserHistory>(({ history }) => history.data);
  const historyId = useSelector<RootState, string>(({ history }) => history.data.nanoId);
  const domainNodes = useSelector<RootState, IDomainNode[]>(
    ({ history }) => history.data.domainNodes,
  );
  const totalVisits = useSelector<RootState, IVisit[]>(({ history }) => history.data.totalVisits);

  const [formData, setFormData] = useState<IHistoryFormData>(INITIAL_HISTORY_FORM_DATA);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isShareVisible, setIsShareVisible] = useState(false);
  const [isHowToVisible, setIsHowToVisible] = useState(false);
  const [linkCopiedMessage, setLinkCopiedMessage] = useState("");

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const handleFormChange = ({ target: { name, value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const getHistoryData = async () => {
    let [visits, nodes] = [totalVisits, domainNodes];

    if (originBrowserHistory) {
      [visits, nodes] = [originBrowserHistory.totalVisits, originBrowserHistory.domainNodes];

      const filteredVisits = filterVisits(visits, formData);
      const updatedDomainNodes = updateDomainNodesFromVisits(filteredVisits, nodes);

      dispatch(
        updateBrowserHistory({
          nanoId: historyId,
          totalVisits: filteredVisits,
          domainNodes: updatedDomainNodes,
        }),
      );

      return;
    }

    try {
      setIsLoading(true);

      const response: IHistoryApiResponse = await fetchHistory({ id });

      if (response.result === "ok") {
        const browserHistory = response.data as IBrowserHistory;

        dispatch(updateOriginBrowserHistory(browserHistory));
        return;
      }

      if (response.error) {
        setErrorMessage(response.error.message);
      }
    } catch (error: any) {
      setErrorMessage("히스토리 파일을 가져오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (historyId === INITIAL_BROWSER_HISTORY_ID) {
      getHistoryData();
    }
  }, [historyId]);

  const handleClickAsideButton = async (event: any) => {
    const { name }: { name: "save" | "share" | "delete" | "howTo" } = event.target.dataset;

    if (name === "save" || name === "delete") {
      try {
        setIsLoading(true);

        if (name === "save") {
          await saveHistory({ id: historyId, history: browserHistoryData });
          dispatch(updateOriginBrowserHistory(browserHistoryData));
          setIsLoading(false);
        } else if (name === "delete") {
          await deleteHistory({ id: historyId });
          setIsLoading(false);
          history.push("/");
        }
      } catch (error: any) {
        setErrorMessage(
          `히스토리를 ${ASIDE_BUTTON_KOREAN[name]}하는 과정에서 에러가 발생했습니다.`,
        );
        setIsLoading(false);
      }
    }

    if (name === "share") {
      setIsShareVisible(true);
    } else if (name === "howTo") {
      setIsHowToVisible(true);
    }
  };

  const handleClickCopyLink = async () => {
    setLinkCopiedMessage("");

    try {
      await window.navigator.clipboard.writeText(window.location.href);

      setLinkCopiedMessage("Copied!");
    } catch (error) {
      setLinkCopiedMessage("공유 링크를 복사하는데 실패했습니다.");
    }
  };

  const { start, end, domain } = formData;
  const isFormSubmitActive: boolean = Boolean(
    new Date(start).getTime() <= new Date(end).getTime() || (!start && !end && domain),
  );

  return (
    <Wrapper>
      <Form
        onSubmit={(event) => {
          event.preventDefault();

          getHistoryData();
        }}
      >
        <HistoryTitle>
          <Link to="/">MY WEB HISTORY MAP</Link>
        </HistoryTitle>
        <Fieldset>
          <Label htmlFor="start">
            Start Date
            <Input
              id="start"
              value={formData.start}
              onChange={handleFormChange}
              name="start"
              type="date"
            />
          </Label>
          <div>~</div>
          <Label htmlFor="end">
            End Date
            <Input
              id="end"
              value={formData.end}
              onChange={handleFormChange}
              name="end"
              type="date"
            />
          </Label>
        </Fieldset>
        <Fieldset>
          <Label htmlFor="domain">
            Domain
            <Input
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleFormChange}
              type="text"
            />
          </Label>
        </Fieldset>
        <SearchButton disabled={!isFormSubmitActive} type="submit">
          Search
        </SearchButton>
      </Form>

      <Aside onClick={handleClickAsideButton} direction="right">
        <AsideButton data-name="save">
          <RiSave3Fill data-name="save" size={30} />
          Save
        </AsideButton>
        <AsideButton data-name="share">
          <BsFillShareFill data-name="share" size={25} />
          Share
        </AsideButton>
        <AsideButton data-name="delete">
          <RiDeleteBin6Fill data-name="delete" size={30} />
          Delete
        </AsideButton>
        <AsideButton data-name="howTo" style={{ marginTop: "auto" }}>
          <RiQuestionLine data-name="howTo" size={30} />
          HowTo
        </AsideButton>
      </Aside>

      {isShareVisible && (
        <Modal
          handleClose={() => {
            setLinkCopiedMessage("");
            setIsShareVisible(false);
          }}
        >
          <Share>
            {window.location.href}
            <BiCopy size={20} onClick={handleClickCopyLink} />
            <span>{linkCopiedMessage}</span>
          </Share>
        </Modal>
      )}
      {isHowToVisible && (
        <Modal handleClose={() => setIsHowToVisible(false)}>
          <Instruction />
        </Modal>
      )}
      {isLoading && (
        <Modal>
          <Loading center />
        </Modal>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {!errorMessage && <DirectedGraph />}
    </Wrapper>
  );
}
