import { PRODUCT_TYPES, RECYCLE_TYPES } from "@/constants/productTypes";
import {
  Li,
  Wrapper,
  ImageContainer,
  Image,
  SelectContainer,
  ManagerOptions,
  ProductName,
} from "@/components/layout/manager/styled";

function ProductList({ list = [], handleChange }) {
  return (
    <ul>
      {list.length > 0
        && (list.map((product) => {
          const {
            _id,
            name,
            imgUrl,
            imgAlt,
            recycleType,
            productType,
          } = product;

          return (
            <Li key={_id}>
              <ProductName>{name}</ProductName>
              <Wrapper>
                <ImageContainer>
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                  />
                </ImageContainer>

                <SelectContainer>
                  <ManagerOptions
                    productId={_id}
                    name="productType"
                    types={PRODUCT_TYPES}
                    defaultType={productType}
                    onChange={handleChange}
                  />
                  <ManagerOptions
                    productId={_id}
                    name="recycleType"
                    types={RECYCLE_TYPES}
                    defaultType={recycleType}
                    onChange={handleChange}
                  />
                </SelectContainer>
              </Wrapper>
            </Li>
          );
        })
        )}
    </ul>
  );
}

export default ProductList;
