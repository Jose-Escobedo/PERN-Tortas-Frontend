import { Add, Remove } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { extrasInfo } from "../data";

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const cart = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    product.extras.push(extras);
    dispatch(addProduct({ ...product, quantity, extras }));
    toast.success("Item has been added to Cart.", {
      position: toast.POSITION.TOP_CENTER,
      toastId: "success3",
    });
  };
  const addOrRemove = (e) => {
    // current array of options
    const newExtras = extras;
    let index;

    // check if the check box is checked or unchecked
    if (e.target.checked) {
      // add the numerical value of the checkbox to options array
      newExtras.push(e.target.value);
    } else {
      // or remove the value from the unchecked checkbox from the array
      index = newExtras.indexOf(e.target.value);
      newExtras.splice(index, 1);
    }

    // update the state with the new array of options
    setExtras(newExtras);
    console.log(extras);
  };

  return (
    <Container>
      <StyledToastContainer />
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Extras</FilterTitle>
              <FilterExtras onChange={(e) => addOrRemove(e)}>
                {extrasInfo?.map((e) => (
                  <>
                    <label>
                      <input value={e.option} type="checkbox" />
                      {e.option}
                    </label>
                  </>
                ))}
              </FilterExtras>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("dec")}
              />
              <Amount>{quantity}</Amount>
              <Add
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("inc")}
              />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

const StyledToastContainer = styled(ToastContainer).attrs({
  className: "toast-container",
  toastClassName: "toast",
  bodyClassName: "body",
  progressClassName: "progress",
})`
  .toast {
    background-color: black;
    color: white;
  }
  button[aria-label="close"] {
    color: white;
  }
`;

const Container = styled.div`
  margin-top: 70px;
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
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
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
`;
const FilterTitle = styled.span`
  font-size: 1.3rem;
  font-weight: 200;
`;
const FilterExtras = styled.div`
  display: flex;

  flex-direction: column;
  label input {
    margin-right: 1em;
  }
  label {
    font-size: 2rem;
    display: block;
  }
  input {
    width: 13px;
    height: 13px;
    vertical-align: middle;

    position: relative;
    *overflow: hidden;
  }
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
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
