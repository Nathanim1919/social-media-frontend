import React from "react";
import { NavLink } from "react-router-dom";
import {GrLinkNext} from 'react-icons/gr';
import styled from "styled-components";

export default function StartChatting() {
  return (
    <div>
      <Header>
        <div>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <h5>Nathanim Tadele</h5>
            <p>last seen 2 minutes ago</p>
          </div>
        </div>
        <NavLink>
          <GrLinkNext/>
        </NavLink>
      </Header>
    </div>
  );
}

const Header = styled.div`
  background-color: #fff;
  box-shadow: 0 5px 13px rgba(0,0,0,.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;

  >div:nth-child(1){
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: .3rem;

    >div:nth-child(1){
      width: 40px;
      height: 40px;
      background-color: #eee;
      border-radius: 50%;
    }
    >div:nth-child(2){
      display: flex;
      flex-direction: column;
      >*{
        margin: 0;
      }
      >h5{
        font-size: .8rem;
      }
      p{
        font-size: .7rem;
      }
    }
  }
`