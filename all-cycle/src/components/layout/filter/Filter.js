import {
  Container,
  Name,
  ToggleButton,
} from "@/components/layout/filter/styled";

function Filter({
  name,
  TYPES,
  sortFilter,
  sortWithTypes,
}) {
  return (
    <Container>
      <Name>{name}</Name>

      {TYPES.map((type) => (
        <ToggleButton
          key={JSON.stringify(type)}
          isclicked={sortFilter.productType === type[0]}
          onClick={() => sortWithTypes("productType", type[0])}
          size={0.4}
        >
          {type[1]}
        </ToggleButton>
      ))}
    </Container>
  );
}

export default Filter;
