import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import cogoToast from 'cogo-toast';
import { MUST_BE_LOGGED_IN } from '../../lib/constants/warnMessage';
import { RootState } from '../../modules';
import { loadUserThunk } from '../../modules/auth';
import { changeUserCode, initializeProblem, readProblemThunk } from '../../modules/problem';
import { initializeProblems, readProblemsThunk } from '../../modules/problems';
import { confirmSolutionThunk } from '../../modules/solution';
import Responsive from '../../components/common/Responisve';
import Loading from '../../components/common/Loading';
import ProblemSolving from '../../components/problem/ProblemSolving';

const ProblemSolvingContainer = () => {
  const {
    user,
    problem,
    userCode,
    problemError,
    isProblemLoading,
    problems,
    problemsError,
    solution,
    failureTestsIndex,
    solutionError,
    isSolutionLoading
  } = useSelector((state: RootState) => ({
    user: state.auth.user,
    problem: state.problem.problem,
    userCode: state.problem.userCode,
    problemError: state.problem.error,
    isProblemLoading: state.problem.isLoading,
    problems: state.problems.problems,
    problemsError: state.problems.error,
    solution: state.solution.solution,
    failureTestsIndex: state.solution.failureTestsIndex,
    solutionError: state.solution.error,
    isSolutionLoading: state.solution.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  const { problem_id: problemId } = useParams();
  const history = useHistory();

  const handleChangeUserCode = (value: string) => {
    dispatch(changeUserCode(value));
  };

  const handleConfirmSolution = async (userCode: string) => {
    await dispatch(confirmSolutionThunk(userCode, problem!._id));
    dispatch(loadUserThunk());
  };

  useEffect(() => {
    dispatch(readProblemThunk(problemId));

    return () => {
      dispatch(initializeProblem());
      dispatch(initializeProblems());
    };
  }, [dispatch, problemId]);

  useEffect(() => {
    if (problem) {
      dispatch(readProblemsThunk({ page: '1', level: String(problem.level - 1) }));
    }
  }, [dispatch, problem]);

  if (!user) {
    cogoToast.warn(MUST_BE_LOGGED_IN);
    history.push('/users/login');
  }

  if (problemError || problemsError) {
    return (
      <Responsive>
        <p>문제를 불러오는 데 실패했습니다!</p>
      </Responsive>
    );
  }

  if (isProblemLoading || !problem || !problems) {
    return (
      <Loading />
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Point Code - ${problem.title}`}</title>
      </Helmet>
      <ProblemSolving
        user={user!}
        problem={problem}
        userCode={userCode}
        isSolved={user!.solved_problems.includes(problem._id)}
        problems={problems}
        solution={solution}
        failureTestsIndex={failureTestsIndex}
        solutionError={solutionError}
        isSolutionLoading={isSolutionLoading}
        onChangeUserCode={handleChangeUserCode}
        onConfirmSolution={handleConfirmSolution}
      />
    </>
  );
};

export default ProblemSolvingContainer;
