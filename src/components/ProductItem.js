import {
  FavoriteBorder,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct } from "../redux/cartRedux";
import TortaCubana from "../images/cubana.jpg";
import { useEffect, useState } from "react";

const ProductItem = ({ item }) => {
  const dispatch = useDispatch();
  const quantity = 1;
  const [asadaBoolean, setAsadaBoolean] = useState();
  const [comboBoolean, setComboBoolean] = useState();
  const handleClick = (item) => {
    dispatch(addProduct({ ...item, quantity }));
    toast.success("Item has been added to Cart.", {
      position: toast.POSITION.TOP_CENTER,
      toastId: "success2",
    });
  };

  useEffect(() => {
    if (item.name === "Asada Fries") {
      setAsadaBoolean(true);
    } else {
      setAsadaBoolean(false);
    }
    if (item.name === "1 Tamal Combination") {
      setComboBoolean(true);
    } else {
      setComboBoolean(false);
    }
  }, []);

  return (
    <Container>
      {asadaBoolean ? (
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/asada-fries-min.jpeg?alt=media&token=074ff610-fae7-442a-a333-bddfc5265649"
          }
        />
      ) : (
        <Image src={item.img} />
      )}

      <Info>
        <Icon onClick={() => handleClick(item)}>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
      </Info>
    </Container>
  );
};

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  width: 330px;
  height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 60%;
  z-index: 2;
  max-width: 70%;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

export default ProductItem;
