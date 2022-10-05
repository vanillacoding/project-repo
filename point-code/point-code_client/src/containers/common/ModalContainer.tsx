import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { toggle } from '../../modules/modal';
import Modal from '../../components/common/Modal';

type ModalContainerProps = {
  children: ReactNode;
};

const ModalContainer = ({ children }: ModalContainerProps) => {
  const isModalVisible = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  return (
    isModalVisible ? (
      <Modal onOverlayClick={() => dispatch(toggle())}>
        {children}
      </Modal>
    ) : null
  );
};

export default ModalContainer;
