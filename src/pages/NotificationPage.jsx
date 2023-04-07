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
          <Notifications>
            {props.notifications.length > 0 ? (
              props.notifications.map((notify) => (
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
              ))
            ) : (
              <h3>No notification</h3>
            )}
          </Notifications>
        </NotificationBoard>
      </Backdrop>
    </>
  );
}
const Notifications = styled.div`
  background-color: white;
  padding: 0.5rem;
  border: 1px solid #f5bbbb;
  border-radius: 10px;
`;
const Notes = styled.div`
  font-size: 0.8rem;
  color: #8a8686;
`;
const Header = styled.div`
  cursor: pointer;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  background-color: #fefeff0;
  padding: 0 1rem;
  color: #313030;
  margin-bottom: 1rem;
`;

const Notification = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 0.31rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
  padding: 0.3rem;
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
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const NotificationBoard = styled.div`
  background-color: #fdfcfc75;
  width: 40vw;
  padding: 0.5rem;
  border-radius: 10px;
  height: 85vh;
  box-shadow: 0 7px 20px rgba(0, 0, 0, 0.1);
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
  background-color: rgba(80, 76, 76, 0.096);
  backdrop-filter: blur(3px);
`;
