import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Sidebar(props) {
  const { id } = useParams();

  return (
    <Container>
      <div>
        <input type="text" placeholder="Search...." />
      </div>

      <Users>
        {props.users.map(
          (user) =>
            id != user._id && (
              <UserInfo
                key={user._id}
                onClick={() => props.setActiveUser(user)}
                className={`${
                  props.activeUser._id == user._id ? "active" : ""
                }`}
              >
                <div>
                  <img src={user.profile} alt="" />
                </div>
                <p>{user.name}</p>
              </UserInfo>
            )
        )}
      </Users>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  position: relative;

  input {
    width: 90%;
    border: 1px solid #eee;
    outline: none;
    padding: 0.5rem;
    margin: 0.51rem;
  }
`;

const Users = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    margin: 0;
  }
`;

const UserInfo = styled.div`
  &.active {
    background-color: #eef1f3;
  }
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.03rem 0.5rem;
  cursor: pointer;

  > div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;
