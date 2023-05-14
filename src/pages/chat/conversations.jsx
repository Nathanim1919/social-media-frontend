import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";


export default function Conversations({ conversation, activeUser }) {
  const { id } = useParams();
  const [user, setUser] = useState({});

  // get user using its unique id
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get(`http://localhost:5000/user/${id}`);
        setUser(user.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  return (
    <Container>
      {conversation.messages != null &&
        conversation.messages.map((message) => {
          return (
            <div
              className={`${message.sender._id === id ? "sent" : "received"}`}
              key={message._id}
            >
              {/* {message.sender._id === id && (
                <div>
                  <img
                    src={
                      message.sender._id === id
                        ? user.profile
                        : activeUser.profile
                    }
                    alt=""
                  />
                </div>
              )} */}
              <p>{message.content}</p>
              {/* {message.sender._id !== id && (
                <div>
                  <img
                    src={
                      message.sender._id === id
                        ? user.profile
                        : activeUser.profile
                    }
                    alt=""
                  />
                </div>
              )} */}
            </div>
          );
        })}
    </Container>
  );
}


const Container = styled.div`
  overflow: auto;
  max-height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  p {
    margin: 0.53rem;
    box-shadow: 0 3px 5px #dbd9d9;
    max-width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 0px;
    border-top-right-radius: 10px;
    padding: 0.3rem;
    font-size: 0.9rem;
  }
  > div {
    display: flex;
    > div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  > div.sent {
    align-self: flex-start;
    > p {
      background-color: #9191fd;
      color: #fff;
    }
  }
  > div.received {
    align-self: end;
    justify-self: center;

    > p {
      background-color: #ffffff;
      color: #1f1e1e;
      border-top-left-radius: 10px;
      border-top-right-radius: 0px;
    }
  }
`;
