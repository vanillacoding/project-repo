import ReactDOM from 'react-dom';

export default function ModalPortal({ children }) {
  return ReactDOM.createPortal(children, document.getElementById('modal'));
}
