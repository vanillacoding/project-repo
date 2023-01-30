import PropTypes from "prop-types";
import { useState, createContext } from "react";

export const ProjectContext = createContext(null);

function ProjectProvider({ children }) {
  const [focusedProject, setFocusedProject] = useState(null);

  return (
    <ProjectContext.Provider value={{ focusedProject, setFocusedProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;

ProjectProvider.propTypes = {
  children: PropTypes.element,
};
