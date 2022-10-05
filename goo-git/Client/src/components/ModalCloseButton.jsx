import { CloseButton } from '../styledComponents/ModalCloseButton.styled';
import CloseIcon from '@material-ui/icons/Close';

export default function ModalCloseButton({ onClick }) {
  return (
    <CloseButton onClick={onClick}>
      <CloseIcon />
    </CloseButton>
  );
}
