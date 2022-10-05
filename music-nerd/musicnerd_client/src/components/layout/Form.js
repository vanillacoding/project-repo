import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../lib/colors';

const Form = ({
  title,
  onSubmit,
  style,
  children
}) => (
  <FormWrapper style={style} onSubmit={onSubmit}>
    {title ? <h1>{title}</h1> : null}
    {children}
  </FormWrapper>
);

const FormWrapper = styled.form`
  width: 40vw;
  height: 70vh;
  color: ${colors.MAIN_TEXT_COLOR};
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 4rem;
    margin-bottom: 4rem;
  }
`;

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.node
};

export default Form;
