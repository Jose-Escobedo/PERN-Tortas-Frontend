import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Products from "../components/Products";
import { mobile } from "../responsive";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilter] = useState({});
  const [sort, setSort] = useState();
  const [catImageLink, setCatImageLink] = useState("");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filters,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (cat === "tortas") {
      setCatImageLink(
        "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/cubana.jpg?alt=media&token=94876bed-3776-4093-9134-57f064c4ae7d"
      );
    } else if (cat === "burritos") {
      setCatImageLink(
        "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/burrito-wet.JPG?alt=media&token=8f2af152-f2f7-4a9c-be57-93db3f15fd6b"
      );
    } else {
      setCatImageLink(
        "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/tacos-buche.jpeg?alt=media&token=7ed5f819-0c85-45ba-b779-68dbaffffb27"
      );
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <TitleAndImageWrapper>
        <Title>{cat.toUpperCase()}</Title>
        <CategoryImageContainer>
          <CategoryImage src={catImageLink} />
        </CategoryImageContainer>
      </TitleAndImageWrapper>
      <FilterContainer>
        <Filter>
          <FilterText>Sort Items:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
const TitleAndImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  margin-top: 20vh;
  padding-bottom: 20px;
`;

const CategoryImageContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 50%;
  ${mobile({ height: "40vh" })}
`;
const CategoryImage = styled.img`
  width: auto;
  height: 100%;
  margin-left: -50px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 1.3em 0em;
  margin-left: 2em;
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
