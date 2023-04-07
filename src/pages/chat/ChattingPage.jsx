import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import styled from "styled-components";
import SideBar from "./SideBar";
import StartChatting from "./StartChatting";

const ENDPOINT = "http://localhost:5000";

export default function ChattingPage(){
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("get_users", id);

      socket.on("users", (users) => {
        setUsers(users);
      });
    }
  }, [socket, id]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <Container>
      <SideBar users={users} onUserClick={handleUserClick} />
      {selectedUser ? (
        <StartChatting selectedUser={selectedUser} />
      ) : (
        <Placeholder>
          <p>Select a user to start chatting</p>
        </Placeholder>
      )}
    </Container>
  );
};

// styled components

const Placeholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`;
