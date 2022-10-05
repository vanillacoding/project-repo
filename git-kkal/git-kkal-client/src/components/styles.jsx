import styled from 'styled-components';

const NAV_HEIGHT = '60px';

export const HeaderWrapper = styled.div`
  height: ${NAV_HEIGHT};
`;

export const BodyWrapper = styled.div`
  display: flex;
  height: calc(100vh - ${NAV_HEIGHT});
`;
