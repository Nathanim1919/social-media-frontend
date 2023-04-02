import React from "react";
import img1 from "../images/loader.png";
import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <Container>
      <Loader>
        <img src={img1} alt="Loading..." />
      </Loader>
    </Container>
  );
}

const Container = styled.div`
  margin-top:4rem;
  background-color: transparent;
`;

const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
  animation: ${rotateAnimation} 1s linear infinite;

  > img {
    width: 100%;
  }
`;
