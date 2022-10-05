import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import * as ICON from 'react-feather';
import blockImgList from '../../constants/blockImgList';

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}) {
  function handleDragStart(e) {
    const { target } = e;
    e.dataTransfer.setData('block_id', target.id);
  }

  return (
    <SidebarContainer isSidebarOpen={isSidebarOpen}>
      <SidebarToggler onClick={toggleSidebar}>
        {isSidebarOpen ? <ICON.ChevronRight /> : <ICON.ChevronLeft />}
      </SidebarToggler>
      <Selectbox>
        <span>
          Basic
        </span>
        <span>
          <ICON.List size={20} />
        </span>
      </Selectbox>
      <BlockList>
        {blockImgList.map((blockImg) => (
          <BlockItem
            id={blockImg.id}
            key={blockImg.id}
            onDragStart={handleDragStart}
            draggable
          >
            <img draggable={false} src={blockImg.src} alt={blockImg.id} />
          </BlockItem>
        ))}
      </BlockList>
    </SidebarContainer>
  );
}

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func.isRequired,
};

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isSidebarOpen }) => (isSidebarOpen ? '0px' : '-230px')};
  background: #fff;
  width: 230px;
  height: 100%;
  border-left: 1px solid rgba(211, 211, 211, 0.39);
  box-shadow: rgb(0 0 0 / 3%) 0 0 10px 0px;
  transition: all ease 0.3s;
`;

const SidebarToggler = styled.div`
  position: absolute;
  color: grey;
  width: 40px;
  height: 40px;
  top: 170px;
  left: -40px;
  background: #fff;
  border: 1px solid rgba(211, 211, 211, 0.52);
  border-right: none;
  line-height: 34px;
  text-align: center;
  box-shadow: rgb(0 0 0 / 3%) -4px 2px 5px 0px;
  cursor: pointer;
`;

const BlockList = styled.div`
  height: 100%;
  margin: 0;
  padding: 0 0 50px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
`;

const BlockItem = styled.div`
  width: 170px;
  overflow: hidden;
  background: rgb(0, 0, 0, 0.06);
  margin: 22px 22px 0;
  cursor: move;
  outline: rgba(219, 219, 219, 0.52) 1px solid;
  box-shadow: 0 5px 15px rgb(0 0 0 / 3%);

  & img {
    width: 100%;
    display: block;
    /* opacity: ${({ isDragging }) => (isDragging ? '0' : 'none')}; */
  }
`;

const Selectbox = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1.3rem 0 1.3rem;
  background: #eee;
  line-height: 40px !important;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
`;
