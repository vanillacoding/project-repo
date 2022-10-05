import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

export const ProjectContext = createContext();
// TODO: steps 로직이 분리되어있음, 매니저와 합치고, 스탭 관련은 스탭바가 가지고 있던, 스탭바 콘텍스트를 만들 던 해야할 듯.

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(null);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

ProjectProvider.propTypes = {
  children: PropTypes.element,
};
