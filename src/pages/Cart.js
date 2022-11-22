import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import {
  removeProduct,
  decrementQuantity,
  incrementQuantity,
} from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    console.log(item);
    dispatch(removeProduct(item));
  };
  const handleDecrementItem = (item) => {
    console.log(item);
    dispatch(decrementQuantity(item));
  };
  const handleIncrementItem = (item) => {
    console.log(item);
    dispatch(incrementQuantity(item));
  };

  const isGreaterThanTwenty = cart.subtotal > 20;

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Cart ({cart.quantity})</TopText>
          </TopTexts>
          {isGreaterThanTwenty ? (
            <Link to="/checkout">
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </Link>
          ) : null}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((item) => (
              <div key={item._id}>
                <Product>
                  <ProductDetail>
                    <Image src={item.img} />
                    <Details>
                      <ProductName>
                        <b>Product: </b>
                        {item.name}
                      </ProductName>
                      <ProductId>
                        <b>ID: </b>
                        {item._id.slice(0, 6)}
                      </ProductId>
                      <ProductExtras>
                        EXTRAS:<br></br>
                        {item.extras.map((extra) => `${extra}, `)}
                      </ProductExtras>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add
                        style={{ cursor: "pointer" }}
                        onClick={() => handleIncrementItem(item)}
                      />
                      <ProductAmount>{item.quantity}</ProductAmount>
                      <Remove
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDecrementItem(item)}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {(item.price * item.quantity).toFixed(2)}
                    </ProductPrice>
                    <RiDeleteBin6Line
                      style={{
                        paddingTop: "3em",
                        paddingBottom: "1.3em",
                        height: "25px",
                        width: "25px",
                        cursor: "pointer",
                        color: "darkred",
                      }}
                      onClick={() => handleRemoveItem(item)}
                    ></RiDeleteBin6Line>
                  </PriceDetail>
                </Product>
                <Hr></Hr>
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.subtotal.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Delivery Fee</SummaryItemText>
              <SummaryItemPrice>$4.99</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Taxes</SummaryItemText>
              <SummaryItemPrice>$ {cart.taxes.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            {isGreaterThanTwenty ? (
              <Link to="/optionaldelivery">
                <Button>CHECKOUT NOW</Button>
              </Link>
            ) : (
              <MinimumText>
                Delivery subtotal minimum of $20 not met. Please add more items
                to cart.
              </MinimumText>
            )}
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 70px;
`;
const Wrapper = styled.div`
  padding: 1.3em;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.3em;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 1.3em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductExtras = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;
const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 2rem;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px sild lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 2em 0em;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const MinimumText = styled.div`
  color: red;
  font-weight: bold;
`;

export default Cart;
