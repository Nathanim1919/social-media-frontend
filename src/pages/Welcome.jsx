import React from "react";
import styled from "styled-components";
import Header1 from "../components/Header1";
import m1 from "../images/m1.jpg";
import m2 from "../images/m2.jpg";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Welcome() {
  const [show, setShow] = useState(true);
  return (
    <Container>
      <Header1 />
      <Hero
        animate={{ opacity: show ? 1 : 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 2 }}
        exit={{ opacity: 0, y: -20, transition: { duration: 2 } }}
      >
        <div>
          <h1>Think-Positive Blog</h1>
          <p>
            We believe in the power of knowledge-sharing and community-building,
            which is why we created this platform for you to engage with
            like-minded individuals and expand your horizons.
          </p>
          <Buttons>
            <NavLink to={'/login'}>
              Sign in
            </NavLink>
            <NavLink to={'register'}>
              Sign up
            </NavLink>
          </Buttons>
        </div>
        <img src={m1} alt="" />
      </Hero>
    </Container>
  );
}

const Container = styled.div`
  padding: 0;
  margin: 0;
`;

const Hero = styled(motion.div)`
  display: grid;
  place-items: center;
  padding: 4rem;
  gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));

  img {
    width: 100%;
  }
`;

const Buttons = styled(motion.div)`
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center;
  margin-top: 5rem;

  a {
    text-decoration: none;
    padding: 0.8rem 2.5rem;
    border: none;
    outline: none;

    &:nth-child(1) {
      background-color: transparent;
    }
    &:nth-child(2) {
      background-color: #346e75;
      color: white;
      box-shadow: 0 7px 15px rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
  }
`;
