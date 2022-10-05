import Image from "next/image";
import styled, { css } from "styled-components";

const filter = css`
  ${({ isinpocket }) => {
    if (isinpocket === "false") {
      return css`
        filter: grayscale(100%);
      `;
    }
  }}
`;

const BadgeImage = styled(Image)`
  border-radius: 2vw;

  ${filter}
`;

const border = css`
  ${({ isinpocket }) => {
    if (isinpocket === "true") {
      return css`
        border: 2px solid ${(props) => props.theme.primary.color};
      `;
    }

    return css`
      filter: brightness(0.6);
    `;
  }}
`;

const Container = styled.span`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-radius: 20%;
  background-color: ${(props) => props.theme.badgeBg.color};
  box-shadow: inset 0px 0px 11px rgba(0, 0, 0, 0.15);

  ${border}
`;

function Badge({ isinpocket, name, height }) {
  return (
    <Container isinpocket={isinpocket}>
      <BadgeImage
        src={`/badges/${name}.jpg`}
        alt={name}
        width={100}
        height={height}
        isinpocket={isinpocket}
      />
    </Container>
  );
}
export default Badge;
