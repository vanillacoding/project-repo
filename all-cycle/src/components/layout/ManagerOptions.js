import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 1vh;
  font-size: 0.8em;
`;

const Label = styled.label`
  padding: 0.4em 1em;
  font-size: 1em;
  text-transform: uppercase;
  font-family: ${(props) => props.theme.fontEng};
`;

const Select = styled.select`
  width: 30vw;
  max-width: 150px;
  padding: 0.3em 1em;
  border-radius: 2vw;
  font-size: 0.8em;
  color: ${(props) => props.theme.white.color};
  background-color: ${(props) => props.theme.gray.color};
  font-family: ${(props) => props.theme.fontKor};
`;

const Option = styled.option`
  font-size: 2vw;

  &:focus {
    outline: none;
  }
`;

function ManagerOptions({
  productId,
  name,
  types,
  defaultType = "etc",
  onChange,
}) {
  return (
    <Container>
      <Label htmlFor={name}>{name === "productType" ? "제품타입" : "용기타입"}</Label>
      <Select
        name={name}
        defaultValue={defaultType}
        onChange={(e) => onChange(e, productId, name)}
      >
        {types.map((type) => {
          const [engType, korType] = type;
          return (
            <Option key={productId + type} value={engType}>
              {korType}
            </Option>
          );
        })}
      </Select>
    </Container>
  );
}

export default ManagerOptions;
