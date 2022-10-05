import useKeyword from "@/hooks/useKeyword";
import { Form, Input } from "@/components/layout/product/styled";

function SearchBar({ sortWithKeyword, handleError }) {
  const { keyword, handleChange, handleSubmit } = useKeyword(sortWithKeyword, handleError);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Find Some"
        name="keyword"
        value={keyword}
        onChange={handleChange}
      />
    </Form>
  );
}

export default SearchBar;
