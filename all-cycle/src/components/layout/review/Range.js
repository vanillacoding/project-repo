import { faSmile, faSadTear } from "@fortawesome/free-solid-svg-icons";

import {
  Container,
  RangeFigure,
  SmileIcon,
  RangeSlider,
  SadIcon,
  RangeDataList,
} from "@/components/layout/review/styled/FormStyled";

function Range({ name, value, onChange }) {
  return (
    <Container>
      <RangeFigure>
        <SmileIcon icon={faSmile} />
        <RangeSlider
          name={name}
          value={value}
          type="range"
          max="5"
          min="1"
          step="1"
          list="ticks1"
          onChange={onChange}
        />
        <SadIcon icon={faSadTear} />
      </RangeFigure>
      <RangeDataList id="ticks1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </RangeDataList>
    </Container>
  );
}

export default Range;
