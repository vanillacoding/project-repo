import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import qs from 'qs';
import { RootState } from '../../modules';
import { initializeProblems, readProblemsThunk } from '../../modules/problems';
import Responsive from '../../components/common/Responisve';
import ProblemList from '../../components/problems/ProblemList';

const PostListContainer = () => {
  const { problems, error, isLoading } = useSelector((state: RootState) => ({
    problems: state.problems.problems,
    error: state.problems.error,
    isLoading: state.problems.isLoading
  }), shallowEqual);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const { page, level } = qs.parse(location.search, {
      ignoreQueryPrefix: true
    });

    dispatch(readProblemsThunk({ page, level }));

    return () => {
      dispatch(initializeProblems());
    };
  }, [dispatch, location.search]);

  if (error) {
    return (
      <Responsive>
        <p>문제 리스트를 불러오는 데 실패했습니다!</p>
      </Responsive>
    );
  }

  return (
    <ProblemList
      problems={problems}
      isLoading={isLoading}
    />
  );
};

export default PostListContainer;
