import { PRODUCT_TYPES, RECYCLE_TYPES } from "@/constants/productTypes";
import Filter from "@/components/layout/filter/Filter";
import { Container, InitButton } from "@/components/layout/filter/styled";
import StyledList from "@/components/element/StyledList";

function FilterContainer({ sortFilter, sortWithTypes, initializeFilter }) {
  return (
    <StyledList>
      <Container>
        <InitButton onClick={initializeFilter} size={0.4}>필터 초기화</InitButton>
      </Container>

      <Filter
        name="CATEGORY"
        TYPES={PRODUCT_TYPES}
        sortFilter={sortFilter}
        sortWithTypes={sortWithTypes}
      />

      <Filter
        name="PACKAGE"
        TYPES={RECYCLE_TYPES}
        sortFilter={sortFilter}
        sortWithTypes={sortWithTypes}
      />
    </StyledList>
  );
}

export default FilterContainer;
