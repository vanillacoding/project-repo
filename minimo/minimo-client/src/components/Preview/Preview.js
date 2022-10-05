import React, { useContext } from 'react';
import { ProjectContext } from '../../contexts/ProjectContext';
import ProjectViewer from '../shared/ProjectViewer';

export default function Preview() {
  const { project } = useContext(ProjectContext);

  return (
    <>
      <ProjectViewer
        project={project}
      />
    </>
  );
}
