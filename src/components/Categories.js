import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

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
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

export default Categories;
