import { useEffect } from 'react';
import ReactDOM from 'react-dom';

export default function Modal({ children }) {
  const modalRoot = document.getElementById('modal-root');
  const modal = document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(modal);

    return () => {
      modalRoot.removeChild(modal);
    };
  });

  return ReactDOM.createPortal(children, modal);
}
