import React from "react";
import { FaBlog } from "react-icons/fa";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

export default function () {
  return (
    <Headere>
      <nav>
        <div>
          <NavLink to={'/'}>
            <FaBlog />
          </NavLink>
        </div>
        <ul>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/login'}>Log in</NavLink>
          <NavLink to={'/register'}>Sign Up</NavLink>
        </ul>
      </nav>
    </Headere>
  );
}

const Headere = styled.div`
  border-bottom:1px solid #eee;
  margin: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, .051);
  padding: .1rem 1rem;

  nav div:nth-child(1){
    font-size: 2rem;
  }
  nav ,ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #346E75;
    
    ul{
      gap: 3rem;
      a{
         color: #346E75;
        text-decoration: none;
        text-transform: uppercase;
        padding: .5rem 1rem;
      }

      a:nth-child(3){
       background-color: #3DABC3;
       color: white;
       border-radius: 7px;
       box-shadow: 0 8px 15px rgba(0, 0, 0, .1);
      }
    }
  }
`;
