import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Error404 = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <ErrorTextAndImageWrapper>
        <Error404Text>
          Error 404. Sorry we couldn't find <br></br> what you're looking for...
        </Error404Text>
        <ImageContainer>
          <img src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/astro-far500.png?alt=media&token=67d84223-f370-461d-b14a-df4ff186c986"></img>
        </ImageContainer>
      </ErrorTextAndImageWrapper>
      <Footer></Footer>
    </Container>
  );
};

const Container = styled.div``;
const Error404Text = styled.h1`
  font-size: 3rem;
`;
const ErrorTextAndImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
`;
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Error404;
