import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1.3rem;
  justify-content: space-between;
`;

export default Categories;
