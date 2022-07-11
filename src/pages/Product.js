import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import AsadaFries from "./images/asada-fries.jpeg";
const Product = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={AsadaFries} />
        </ImgContainer>
        <InfoContainer>
          <Title>Al Pastor Torta</Title>
          <Desc>
            BBQ pork. Authentic Mexican style grilled sandwich made with beans,
            mayonnaise, lettuce, tomato, onions, avocado and jalapenos.
          </Desc>
          <Price>$ 12</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Extras</FilterTitle>
              <FilterExtras>
                <FilterExtrasOption>Add Guacamole</FilterExtrasOption>
                <FilterExtrasOption>Add Cheese</FilterExtrasOption>
                <FilterExtrasOption>Add Lettuce</FilterExtrasOption>
                <FilterExtrasOption>Add Cilantro</FilterExtrasOption>
                <FilterExtrasOption>Add Sour Cream</FilterExtrasOption>
                <FilterExtrasOption>Add Pico de Gallo</FilterExtrasOption>
              </FilterExtras>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 3em;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 30px 0px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 200;
`;
const FilterExtras = styled.select`
  margin-left: 0.8em;
  padding: 5px;
`;
const FilterExtrasOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 1em;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export default Product;
