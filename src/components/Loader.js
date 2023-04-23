import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    </LoaderContainer>
  );
};

const LoaderContainer = styled.div`
  .loader-container {
    width: 100%;
    display: flex;
    justify-content: center;
    z-index: 3;
    margin-top: 10vh;
  }

  .spinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #3d5af1 transparent #3d5af1 transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
  }

  @keyframes spin-anim {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
