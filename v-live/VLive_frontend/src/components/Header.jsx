import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import CreateChannel from './Main/CreateChannel';
import Modal from './Modal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!!sessionStorage.getItem('user'));
  });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <HeaderWrapper loginStatus={isLogin}>
      <Link href="/main" passHref>
        <span className="nav">CHANNEL</span>
      </Link>
      <Link href="/" passHref>
        <span className="nav logo">VLIVE</span>
      </Link>
      <span className="nav create-channel" onClick={openModal}>
        CREATE CHANNEL
      </span>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <CreateChannel onClose={closeModal} isModalOpen={isModalOpen} />
        </Modal>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  text-align: center;
  background-color: ${({ theme }) => theme.darkNavy};
  box-shadow: ${({ theme }) => theme.blueShadow};

  .nav {
    width: 33.3vh;
    box-sizing: border-box;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1em;
    color: ${({ theme }) => theme.white};

    &:hover {
      color: ${({ theme }) => theme.blue};
      transform: scale(1.05);
    }
  }

  .logo {
    font-weight: 800;
    font-size: 2em;
    color: ${({ theme }) => theme.blue};
  }

  .nav.create-channel {
    cursor: ${({ loginStatus }) => (!loginStatus ? 'not-allowed' : 'pointer')};
    pointer-events: ${({ loginStatus }) => (!loginStatus ? 'none' : 'auto')};
  }
`;
