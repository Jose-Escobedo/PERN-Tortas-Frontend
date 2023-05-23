import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import CategoryGridList from "./CategoryGridList";
import MenuGridList from "./MenuGridList";
import ProductItem from "./ProductItem";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [newArray, setNewArray] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
    // let mutateArry = products.slice(0, 7);
    // let addedArray = products.slice(99, 100);

    // setNewArray([].concat(mutateArry, addedArray));
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      {cat ? (
        <CategoryContainer>
          {filteredProducts.map((item) => {
            return <CategoryGridList item={item} key={item._id} />;
          })}
        </CategoryContainer>
      ) : (
        <Container>
          {products.slice(0, 6).map((item) => {
            return <ProductItem item={item} key={item._id} />;
          })}
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  padding: 30px;
  display: grid;
  max-width: 100%;
  align-items: center;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  grid-auto-rows: minmax(100px, auto);
  @media screen and (max-width: 1115px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const CategoryContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  grid-auto-rows: 1fr;
`;
export default Products;
