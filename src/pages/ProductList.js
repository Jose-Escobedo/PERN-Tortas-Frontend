import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const ProductList = () => {
  return (
    <Container>
      <Navbar />
      <Title>Tortas</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Items:</FilterText>
          <Select>
            <Option disabled selected>
              Type
            </Option>
            <Option>Tortas</Option>
            <Option>Tacos</Option>
            <Option>Burritos</Option>
            <Option>Soups</Option>
            <Option>Sides</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Items:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products />
      <Newsletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
const Title = styled.h1`
  margin: 1.3em;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 1.3em;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

export default ProductList;
