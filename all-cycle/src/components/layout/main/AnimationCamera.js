import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faMobileAlt } from "@fortawesome/free-solid-svg-icons";

import StyledIcon from "@/components/element/StyledIcon";
import {
  AnimationContainer,
  Logo,
  BubbleText,
  Bubble,
  ShakeCamera,
  Comment,
} from "@/components/layout/main/styled";

function AnimationCamera({ onClick }) {
  return (
    <AnimationContainer>
      <Logo>All-Cycle</Logo>
      <Image
        src="/drink-water.png"
        alt="PETE bottle"
        width={350}
        height={350}
      />
      <BubbleText>Click!</BubbleText>
      <Bubble>
        <StyledIcon icon={faComment} />
      </Bubble>
      <ShakeCamera>
        <FontAwesomeIcon
          icon={faMobileAlt}
          size="8x"
          onClick={onClick}
        />
      </ShakeCamera>
      <Comment>BEFORE BUY DRINK, SEARCH IT!!</Comment>
    </AnimationContainer>
  );
}

export default AnimationCamera;
