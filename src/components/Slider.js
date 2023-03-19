import styled from "styled-components";
import ArrowLeftOutlined from "@material-ui/icons/ArrowLeftOutlined";
import ArrowRightOutlined from "@material-ui/icons/ArrowRightOutlined";
import { SliderItems } from "../data";
import { useState } from "react";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartRedux";
import { publicRequest } from "../requestMethods";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Slider = () => {
  const dispatch = useDispatch();
  const quantity = 1;
  const [product, setProduct] = useState([]);

  const getProduct = (slideItem) => {
    fetch(`http://localhost:5000/api/products/find/${slideItem}`)
      .then((response) => response.json())
      .then((data) => dispatch(addProduct({ ...data, quantity })))
      .catch((error) => console.log(error));
  };

  const handleOrderNow = (item) => {
    console.log(item.id);
    getProduct(item.id);
    toast.success("Item has been added to Cart.", {
      position: toast.POSITION.TOP_CENTER,
      toastId: "success1",
    });
  };

  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {SliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <div className="container">
                <div className="center">
                  <Button onClick={() => handleOrderNow(item)}>
                    Order Now
                    <svg
                      width="180px"
                      height="60px"
                      viewBox="0 0 180 60"
                      class="border"
                    >
                      <polyline
                        points="179,1 179,59 1,59 1,1 179,1"
                        class="bg-line"
                      />
                      <polyline
                        points="179,1 179,59 1,59 1,1 179,1"
                        class="hl-line"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  bottom: 0;
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 105vh;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 450px;
  height: auto;
  object-fit: contain;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 3em;

  .container {
    width: 100%;
    height: 10vh;
  }

  .center {
    width: 180px;
    height: 60px;
    position: absolute;
  }

  svg {
    position: absolute;
    left: 0;
    top: 0;
    fill: none;
    stroke: #000000;
    stroke-dasharray: 150 480;
    stroke-dashoffset: 150;
    transition: 1s ease-in-out;
  }

  Button {
    width: 180px;
    height: 60px;
    cursor: pointer;
    background: transparent;
    border: 1px solid teal;
    outline: none;
    transition: 1s ease-in-out;
    &:hover {
      transition: 1s ease-in-out;
      background: teal;
      color: white;
    }
    &:hover svg {
      stroke-dashoffset: -480;
    }
    h2 {
      color: white;
    }
  }
`;

const Title = styled.h1`
  font-size: 4.3rem;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  font-size: 1.3rem;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
`;

export default Slider;
