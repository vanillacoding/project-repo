import styled from 'styled-components';

import * as colors from '../../lib/colors';

const FormInput = styled.input`
  background-color: ${colors.FORM_INPUT_BACKGROUND};
  font-size: 1.4rem;
  padding: 1rem 1.5rem;
  width: 70%;
  border: none;
  box-shadow: 0.1rem 0.1rem 0.1rem ${colors.FORM_INPUT_BOX_SHADOW};
  margin: 0.5rem 0;
`;

export default FormInput;
