import React from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import bearsLogo from "../../assets/images/logo_bears.png";
import dinosLogo from "../../assets/images/logo_dinos.png";
import eaglesLogo from "../../assets/images/logo_eagles.png";
import giantsLogo from "../../assets/images/logo_giants.png";
import heroesLogo from "../../assets/images/logo_heroes.png";
import landersLogo from "../../assets/images/logo_landers.png";
import lionsLogo from "../../assets/images/logo_lions.png";
import tigersLogo from "../../assets/images/logo_tigers.png";
import twinsLogo from "../../assets/images/logo_twins.png";
import wizLogo from "../../assets/images/logo_wiz.png";

const Image = styled.img`
  width: auto;
  height: ${(props) => props.height};
`;

function Logo({ teamName, height }) {
  const selectTeamLogo = (team) => {
    switch (team) {
      case "두산":
        return bearsLogo;
      case "한화":
        return eaglesLogo;
      case "삼성":
        return lionsLogo;
      case "롯데":
        return giantsLogo;
      case "SSG":
        return landersLogo;
      case "NC":
        return dinosLogo;
      case "키움":
        return heroesLogo;
      case "KIA":
        return tigersLogo;
      case "KT":
        return wizLogo;
      case "LG":
        return twinsLogo;
      default:
        return bearsLogo;
    }
  };

  return (
    <Image
      src={selectTeamLogo(teamName)}
      height={height}
    />
  );
}

Logo.propTypes = {
  teamName: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default Logo;
