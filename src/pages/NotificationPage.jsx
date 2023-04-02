import React from "react";
import styled from "styled-components";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";

export default function (props) {
  return (
    <>
      <Backdrop>
        <NotificationBoard>
          <Header>
            <h3>Notifications</h3>
            <AiOutlineClose onClick={() => props.setNotificationOpen(false)} />
          </Header>
          <div>
            {props.notifications.map((notify) => (
              <Notification>
                <div>
                  <div>
                    <img src={notify.sender.profile} alt="" />
                  </div>
                  <div>
                    <h5>{notify.sender.name}</h5>
                  </div>
                </div>
                <Notes>
                  {notify.type == "follow" && (
                    <p>{notify.sender.name} Started following you</p>
                  )}
                  {notify.type == "like" && <p>likes your post</p>}
                  {notify.type == "comment" && <p>commented on your post</p>}
                </Notes>
                <NavLink>
                  <AiOutlineDelete />
                </NavLink>
              </Notification>
            ))}
          </div>
        </NotificationBoard>
      </Backdrop>
    </>
  );
}

const Notes = styled.div`
  font-size: 0.8rem;
  color: #8a8686;
`;
const Header = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #75a1ff;
  padding: 0 1rem;
  color: white;
  margin-bottom: 1rem;
`;

const Notification = styled.div`
  background-color: #fff;
  border-radius: 10px;
  margin:.5rem;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  padding: 0.3rem;
  border: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 1rem;

    > div:nth-child(1) {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
      }
    }
  }
`;

const NotificationBoard = styled.div`
  background-color: #f8f5f5cf;
  width: 40vw;
  padding: 1rem;
  height: 70vh;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
`;
const Backdrop = styled.div`
  display: grid;
  place-items: center;
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(190, 182, 182, 0.096);
  backdrop-filter: blur(3px);
`;
