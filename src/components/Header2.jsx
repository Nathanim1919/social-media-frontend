import React, { useEffect, useState } from "react";
import { FaBlog } from "react-icons/fa";
import styled from "styled-components";
import { IoMdNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { GrUserSettings } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import NotificationPage from "../pages/NotificationPage";
import axios from "axios";

export default function (props) {
  const [option, setOption] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isnotificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  const logout = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const notification = await axios.get(
          `http://localhost:5000/user/${id}/notification`
        );
        setNotifications(notification.data);
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [id, isnotificationOpen]);

  return (
    <>
      {isnotificationOpen && (
        <NotificationPage
          notifications={notifications}
          setNotificationOpen={setNotificationOpen}
        />
      )}
      <Headere>
        <nav>
          <div>
            <NavLink to={`/user/${props.user._id}`}>
              <FaBlog />
            </NavLink>
          </div>
          <Profile>
            <Icons>
              <Counter>
                <p>{notifications.length}</p>
              </Counter>
              <NavLink>
              <IoMdNotificationsOutline
                onClick={() => setNotificationOpen(true)}
              />
              </NavLink>
            </Icons>
            <Userprofile onClick={() => setOption(!option)}>
              <div>
                <img src={props.user.profile} alt="" />
              </div>
              <div>
                <h5>{props.user.name}</h5>
                <h6>{props.user.profesion}</h6>
              </div>
            </Userprofile>
          </Profile>
        </nav>
      </Headere>
      {option && (
        <Setting>
          <div>
            <div>
              <GrUserSettings />
              <p>Setting</p>
            </div>
            <ul>
              <NavLink
                onClick={() => setOption(!option)}
                to={`user/${props.user._id}/profile`}
              >
                <CgProfile />
                Profile
              </NavLink>
              <NavLink
                onClick={() => {
                  setOption(!option);
                  logout();
                }}
              >
                <AiOutlineLogout />
                Log Out
              </NavLink>
            </ul>
          </div>
        </Setting>
      )}
    </>
  );
}
const Counter = styled.div`
  position: absolute;
  top: -1.5rem;
  right: 0.1rem;

  p {
    display: grid;
    place-items: center;
    font-weight: bolder;
    font-size: 1rem;
    color: red;
  }
`;
const Setting = styled.div`
  box-shadow: 0 12px 23px rgba(0, 0, 0, 0.1);
  max-width: 130px;
  position: absolute;
  right: 1rem;
  z-index: 3;
  background-color: white;
  top: 5rem;
  padding: 0;
  border-radius: 5px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > * {
      margin: 0;
    }

    > div {
      display: flex;
      align-items: center;
      margin-top: 0;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 0 1rem;
    }
    > ul {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      > a {
        display: grid;
        grid-template-columns: 0.5fr 1fr;
        color: #4e4c4c;
        place-items: start;
        margin-left: -2.5rem;
        text-decoration: none;
        font-size: 0.8rem;
        padding: 0.41rem;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
`;
const Icons = styled.div`
  position: relative;

  >a{
    font-size:1.7rem;
    cursor:pointer;

    &:hover{
      color:#636060;
    }
  }
  
`;
const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;
const Userprofile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.41rem;
  cursor: pointer;

  > div:nth-child(1) {
    width: 40px;
    height: 40px;
    background-color: #eee;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    > * {
      margin: 0;
    }
  }
`;
const Headere = styled.div`
  border-bottom: 1px solid #fffdfd;
  margin: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.01);
  padding: 0.4rem;

  nav div:nth-child(1) {
    font-size: 2rem;
  }
  nav,
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #346e75;

    ul {
      gap: 3rem;
      a {
        color: #346e75;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
      }
    }
  }
`;
