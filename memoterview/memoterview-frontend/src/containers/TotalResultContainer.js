import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";

import { requestSendEmailToInterviewee } from "../api";
import IntervieweeAddModalView from "../components/IntervieweeAddModalView";
import Loading from "../components/Loading";
import Modal from "../components/Modal";
import TotalResultFilterModalView from "../components/TotalResultFilterModalView";
import useLogout from "../hooks/useLogout";
import useToken from "../hooks/useToken";
import TotalResult from "../pages/TotalResult";
import {
  addNewInterviewee,
  deleteInterviewee,
  extractIntervieweesByInterviewed,
  getInterviewees,
  intervieweeIdsToByIdObjs,
  updateIntervieweeRoomState,
} from "../redux/reducers/interviewees";
import {
  getDefaultTotalResultFilters,
  getFiltersFromFilterOptions,
} from "../utils/filters";
import {
  getDetailResultLink,
  getInterviewRoomLink,
  getWelcomLink,
} from "../utils/path";

const MODAL_TYPE = {
  ADD: "add",
  FILTER: "filter",
};

export default function TotalResultContainer() {
  const [modalType, setModalType] = useState(null);
  const { projectId } = useParams();
  const { token } = useToken();
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = useLogout();

  const { userData } = useSelector((state) => state.user);

  const customFilters = useSelector((state) =>
    state.projects.byId[projectId] ? state.projects.byId[projectId].filters : []
  );

  const { loading, error, interviewees } = useSelector(
    ({ interviewees: { loading, error, byId, allIds } }) => ({
      loading,
      error,
      interviewees: intervieweeIdsToByIdObjs(allIds, byId),
    })
  );

  const [filterOptions, setFilterOptions] = useState(
    getDefaultTotalResultFilters(customFilters)
  );

  const filters = getFiltersFromFilterOptions(filterOptions);

  const {
    waitingInterviewees,
    resultInterviewees,
  } = extractIntervieweesByInterviewed(interviewees);

  useEffect(() => {
    dispatch(getInterviewees({ token, projectId }));
  }, [dispatch, projectId, token]);

  function handleIntervieweeAddBtnClick() {
    openAddIntervieweeModal();
  }

  function handleIntervieweeDeleteBtnClick({ intervieweeId }) {
    dispatch(deleteInterviewee({ projectId, intervieweeId, token }));
  }

  function closeModal() {
    setModalType(null);
  }

  function openAddIntervieweeModal() {
    setModalType(MODAL_TYPE.ADD);
  }

  function handleIntervieweeAddSubmit({ pdf, intervieweeInfo }) {
    dispatch(addNewInterviewee({ token, projectId, pdf, intervieweeInfo }));
    closeModal();
  }

  function handleLogoutClick() {
    logout();
  }

  function handleIntervieweeInviteBtnClick({
    intervieweeId,
    intervieweeEmail,
  }) {
    const welcomePageLink = getWelcomLink({ intervieweeId, projectId });

    try {
      requestSendEmailToInterviewee({
        token,
        projectId,
        intervieweeId,
        intervieweeEmail,
        welcomePageLink,
      });

      dispatch(
        updateIntervieweeRoomState({
          token,
          projectId,
          intervieweeId,
          isRoomOpened: true,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  function handleInterviewRoomEnterBtnClick({ interviewee }) {
    const isAlreadyEvaluated = interviewee.comments.find((comment) => comment.commenter._id === userData.id);

    if (isAlreadyEvaluated) {
      toast.error("이미 평가하셨습니다");
      return;
    }

    const interviewRoomLink = getInterviewRoomLink({
      intervieweeId: interviewee.id,
      projectId,
    });

    history.push(interviewRoomLink);
  }

  function handleFilterBtnClick() {
    setModalType(MODAL_TYPE.FILTER);
  }

  function handleFiltersApplyBtnClick(filterOptions) {
    setFilterOptions(filterOptions);
    setModalType();
  }

  function handleResultItemClick({ intervieweeId }) {
    const detailResultPage = getDetailResultLink({
      intervieweeId,
      projectId,
    });
    history.push(detailResultPage);
  }

  return (
    <>
      {loading && <Loading />}
      {modalType && (
        <Modal onBackgroundClick={closeModal}>
          {modalType === MODAL_TYPE.ADD && (
            <IntervieweeAddModalView
              onCancleBtnClick={closeModal}
              onFormSubmitBtnClick={handleIntervieweeAddSubmit}
            />
          )}
          {modalType === MODAL_TYPE.FILTER && (
            <TotalResultFilterModalView
              onApplyBtnClick={handleFiltersApplyBtnClick}
              onCancleBtnClick={closeModal}
              defaultFilterOption={filterOptions}
            />
          )}
        </Modal>
      )}
      <TotalResult
        interviewees={waitingInterviewees}
        resultInterviewees={resultInterviewees}
        projectId={projectId}
        filters={filters}
        onIntervieweeAddBtnClick={handleIntervieweeAddBtnClick}
        onIntervieweeDeleteBtnClick={handleIntervieweeDeleteBtnClick}
        onIntervieweeInviteBtnClick={handleIntervieweeInviteBtnClick}
        onInterviewRoomEnterBtnClick={handleInterviewRoomEnterBtnClick}
        onLogoutClick={handleLogoutClick}
        onFilterBtnClick={handleFilterBtnClick}
        onResultItemClick={handleResultItemClick}
      />
    </>
  );
}
