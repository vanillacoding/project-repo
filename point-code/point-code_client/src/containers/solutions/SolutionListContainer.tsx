import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import cogoToast from 'cogo-toast';
import { MUST_BE_LOGGED_IN, MUST_BE_SOLVED } from '../../lib/constants/warnMessage';
import { RootState } from '../../modules';
import { readSolutionsThunk } from '../../modules/solutions';
import Responsive from '../../components/common/Responisve';
import SolutionList from '../../components/solutions/SolutionList';

const SolutionListContainer = () => {
  const { user, solutions, error, isLoading } = useSelector((state: RootState) => ({
    user: state.auth.user,
    solutions: state.solutions.solutions,
    error: state.solutions.error,
    isLoading: state.solutions.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  const { problem_id: problemId } = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(readSolutionsThunk(problemId));
  }, [dispatch, problemId]);

  if (!user) {
    cogoToast.warn(MUST_BE_LOGGED_IN);
    history.push('/users/login');
  }

  if (error) {
    if (error.response!.status === 401) {
      cogoToast.warn(MUST_BE_SOLVED);
      history.push('/');
    }

    return (
      <Responsive>
        <p>솔루션 리스트를 불러오는 데 실패했습니다!</p>
      </Responsive>
    );
  }

  return (
    <SolutionList
      solutions={solutions}
      isLoading={isLoading}
    />
  );
};

export default SolutionListContainer;
