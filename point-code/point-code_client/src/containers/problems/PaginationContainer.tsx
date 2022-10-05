
import React, { ChangeEvent } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { RootState } from '../../modules';
import Pagination from '../../components/problems/Pagination';

const PaginationContainer = () => {
  const lastPage = useSelector((state: RootState) => state.problems.lastPage);
  const location = useLocation();
  const history = useHistory();

  const { page = '1', level } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });

  const handleChangeLevel = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const query = qs.stringify({
      page: '1',
      level: value === 'reset' ? undefined : value
    });

    history.push(`/problems?${query}`);
  };

  return (
    <Pagination
      page={Number(page)}
      level={level}
      lastPage={lastPage}
      onChangeLevel={handleChangeLevel}
    />
  );
};

export default PaginationContainer;
