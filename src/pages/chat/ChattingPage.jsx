import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import styled from "styled-components";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import Conversations from "./conversations";
import { useParams } from "react-router-dom";

export default function ChattingPage() {
  const [activeUser, setActiveUser] = useState({});
  const [users, setAllUsers] = useState([]);
  const [message, setmessage] = useState("");
  const [conversation, setConversation] = useState({});

  const { id } = useParams();
  const activeUserId = activeUser._id;

  // get specific conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        const conversation = await axios.get(
          `http://localhost:5000/user/${id}/startchat/conversation?activeUserId=${activeUserId}`
        );
        console.log(conversation.data);
        setConversation(conversation.data);
      } catch (error) {
        console.error(error);
      }
    };
    getConversation();
  }, [activeUserId]);

  // get all users from the database
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const alluser = await axios.get(`http://localhost:5000/user`);
        console.log(alluser);
        setAllUsers(alluser.data);
        console.log("hi");
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  async function sendMessage() {
    try {
      const response = await axios.post(
        `http://localhost:5000/user/${id}/startchat/sent`,
        {
          message,
          id,
          activeUserId,
        }
      );
      console.log("Message sent successfully!");
      return response.data;
    } catch (error) {
      console.error("Error sending message: ", error);
      throw error;
    }
  }

  return (
    <Container>
      <Sidebar
        setActiveUser={setActiveUser}
        users={users}
        activeUser={activeUser}
      />
      <Messagecontainer>
        {activeUser.name ? (
          <Activeuser>
            <div>
              <img src={activeUser.profile} alt="" />
            </div>
            <div>
              <p>{activeUser.name}</p>
              <h6>last seen 2 minutes ago</h6>
            </div>
          </Activeuser>
        ) : (
          ""
        )}
        <Conversation>
          {!activeUser.name ? (
            "Select user to start conversation"
          ) : (
            <Conversations
              conversation={conversation}
              activeUser={activeUser}
            />
          )}
        </Conversation>
        {activeUser.name ? (
          <Sendmessage>
            <input
              onChange={(e) => setmessage(e.target.value)}
              type="text"
              placeholder="write message..."
              value={message}
            />
            <button
              onClick={() => {
                sendMessage();
                setmessage("");
              }}
            >
              <FiSend />
            </button>
          </Sendmessage>
        ) : (
          ""
        )}
      </Messagecontainer>

      {activeUser.name && (
        <Userinfo>
          <Userprofile>
            <div>
              <img src={activeUser.profile} alt="" />
            </div>
            <div>
              <h4>{activeUser.name}</h4>
              <p>last seen 2 mins ago</p>
            </div>
          </Userprofile>
        </Userinfo>
      )}
    </Container>
  );
}

const Userinfo = styled.div`
  background-color: #ffffff;
  border-left: 1px solid #ddd;
`;

const Userprofile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  > div:nth-child(1) {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  >div:nth-child(2){
    display: flex;
    flex-direction: column;

    >*{
      margin: .2rem;
    }
  }
`;

const Sendmessage = styled.div`
  display: grid;
  position: absolute;
  grid-template-columns: 0.81fr 0.1fr;
  align-items: center;
  gap: 1rem;
  bottom: 5rem;
  width:100%;
  left:0;
  right:0;
  padding:.51rem;
  background-color: #fff;

  button {
    background-color: #63abfd;
    display: grid;
    place-items: center;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #3278c9;
    }
  }

  > * {
    outline: none;
    padding: 0.3rem;
    width: 100%;
    font-size: 1.2rem;
    border: none;
  }
`;

const Conversation = styled.div`
  padding-bottom: 3rem;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Messagecontainer = styled.div`
  display: grid;
  grid-template-rows: 0.13fr 1fr 0.14fr;
  width: 100%;
  height: 100vh;
  position:relative;
  background-color:#f7f5f5;
`;

const Activeuser = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  background-color: #fff;
  padding: 0.4rem 1rem;

  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    > * {
      margin: 0;
    }
  }
  > div:nth-child(1) {
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

const Container = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 0.2fr 0.5fr 0.3fr;
`;
