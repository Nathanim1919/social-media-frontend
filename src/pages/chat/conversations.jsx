import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function Conversations({ conversation, activeUserId }) {
  const { id } = useParams();
  return (
    <Container>
      {conversation.messages!= null &&
        conversation.messages.map((message) => {
          return (
            <p
              className={`${message.sender._id === id ? "sent" : "received"}`}
              key={message._id}
            >
              {message.content}
            </p>
          );
        })}
    </Container>
  );
}


const Container = styled.div`
    overflow: auto;
    max-height: 90%;
    padding: 1rem;
    >*{
        margin: .3rem;
        box-shadow: 0 3px 3px #a7a4a4;
        max-width: 40%;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 20px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 0.3rem;
    }
  & > p.sent {
    background-color: #9191fd;
    color: #fff;
    float: left;
    clear: both;
  }
  & > p.received {
    background-color: #ffffff;
    color: #1f1e1e;
    float: right;
    clear: both;
  }
`;
