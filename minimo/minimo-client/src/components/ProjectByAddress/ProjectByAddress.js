import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getProjectByAddress } from '../../apis/project';
import useAsync from '../../hooks/useAsync';
import ProjectViewer from '../shared/ProjectViewer';

export default function ProjectByAddress() {
  const { address } = useParams();
  const {
    error,
    data,
    loading,
  } = useAsync(getProjectByAddress.bind(null, address), [address]);

  return (
    <>
      {/* useAsync를 쓰는 경우 아래 나타날 것들이 항상 같은 패턴일 듯, 재사용 가능할 듯 */}
      {data && <ProjectViewer project={data} />}
      {error && <Redirect to='/' />}
      {loading && <p>loading</p>}
    </>
  );
}
