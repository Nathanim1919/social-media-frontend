import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import styled from "styled-components";

export default function StartChatting({ selectedUser }) {
  const [lastSeen, setLastSeen] = useState("");

  useEffect(() => {
    // Here we can simulate the user's last seen time by setting it to the current time minus a random number of minutes
    const lastSeenTime = new Date();
    const randomMinutes = Math.floor(Math.random() * 60);
    lastSeenTime.setMinutes(lastSeenTime.getMinutes() - randomMinutes);
    setLastSeen(lastSeenTime.toLocaleTimeString());
  }, []);

  return (
    <Container>
      <Header>
        <div>
          <div>
            <img src={selectedUser && selectedUser.profile} alt="" />
          </div>
          <div>
            <h5>{selectedUser && selectedUser.name}</h5>
            <p>Last seen {lastSeen}</p>
          </div>
        </div>
        <NavLink>
          <GrLinkNext />
        </NavLink>
      </Header>
      <div>{/* Render the messages here */}</div>
      <Inputfield>
        <input type="text" placeholder="Write a message..." />
        <button type="submit">Send</button>
      </Inputfield>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;
const Inputfield = styled.div`
  position: fixed;
  bottom: 1rem;
  width: 60%;
  display: flex;
  align-items: center;
  gap: 1rem;

  > input {
    position: relative;
    width: 90%;
    padding: 0.6rem;
    border: 1px solid #eee;
  }
  > button {
    padding: 0.51rem;
    border: 1px solid #eee;
  }
`;

const Header = styled.div`
  background-color: #fff;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;

  > div:nth-child(1) {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.3rem;

    > div:nth-child(1) {
      width: 40px;
      height: 40px;
      background-color: #eee;
      border-radius: 50%;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      > * {
        margin: 0;
      }
      > h5 {
        font-size: 0.8rem;
      }
      p {
        font-size: 0.7rem;
      }
    }
  }
`;

const ChatContainer = styled.div`
  flex-grow: 1;
  background-color: #fff;
`;
