import React, { useContext } from 'react';
import styled from 'styled-components';
import EditableProject from '../EditableProject';
import ColorPicker from '../shared/ColorPicker';
import useColorPicker from '../../hooks/useColorPicker';
import { ProjectContext } from '../../contexts/ProjectContext';
import { OkButton } from '../shared/StyledButton';
import Sidebar from '../Sidebar';
import useBlocks from './useBlocks';
import useSidebar from './useSidebar';

export default function Editor() {
  const { project } = useContext(ProjectContext);

  const {
    blocks,
    setBlocks,
    swapBlocks,
    deleteBlock,
    insertBlock,
    resetBlockContents,
    handleChangeBlock,
    handleChangeStyle,
    handleClickSave,
  } = useBlocks();

  const {
    color: bgColor,
    isColorPickerOpen,
    toggleColorPicker,
    handleChangeColor,
  } = useColorPicker(project.backgroundColor);

  const {
    isSidebarOpen,
    toggleSidebar,
  } = useSidebar();

  return (
    <Container>
      <SaveButton
        type='button'
        onClick={() => handleClickSave(bgColor)}
      >
        SAVE
      </SaveButton>
      <ProjectWrapper
        bgColor={bgColor}
      >
        <EditableProject
          blocks={blocks}
          setBlocks={setBlocks}
          insertBlock={insertBlock}
          swapBlocks={swapBlocks}
          resetBlockContents={resetBlockContents}
          handleChangeBlock={handleChangeBlock}
          handleChangeStyle={handleChangeStyle}
          deleteBlock={deleteBlock}
        />
        {/* FIXME: rename -> colorpicker tool ? */}
        <ColorPicker
          color={bgColor}
          isColorPickerOpen={isColorPickerOpen}
          onChange={handleChangeColor}
          toggleColorPicker={toggleColorPicker}
        />
      </ProjectWrapper>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectWrapper = styled.main`
  position: relative;
  max-width: 800px;
  width: 100%;
  padding: 0 35px;
  box-sizing: border-box;
  background: ${({ bgColor }) => bgColor ?? 'none'};
`;

const SaveButton = styled(OkButton)`
  text-align: center;
  margin-top: 2em;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 300;
  color: grey;
`;
