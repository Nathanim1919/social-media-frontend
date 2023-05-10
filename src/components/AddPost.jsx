import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddPost(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Image = await toBase64(photo);
      const post = await axios.post(
        `http://localhost:5000/posts/${id}/new`,
        {
          title,
          description,
          Image,
        },
        {
          withCredentials: true,
        }
      );
      props.setIsBox(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
      <Backdrop>
        <Container>
          <NavLink onClick={() => props.setIsBox(false)}>
            <AiOutlineClose />
          </NavLink>
          <h2>Add Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Blog Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              id="w3review"
              name="w3review"
              rows="7"
              cols="50"
              placeholder="Blog Placeholder"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input type="file" onChange={(e) => setPhoto(e.target.files[0])} />
            <button type="submit">Post</button>
          </form>
        </Container>
      </Backdrop>
    </>
  );
}

const Container = styled.div`
  width: 50%;
  position: absolute;
  background-color: #fcf8f8;
  color: #181717;
  text-shadow: 0 10px 10px rgba(121, 117, 117, 0.014);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  box-shadow: 0 8px 17px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);

  > a {
    position: absolute;
    top: 1rem;
    font-size: 1.32rem;
    right: 1rem;
  }
  > h2 {
    font-weight: 400;
    margin-left: 3%;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0.1rem 1rem;

    > textArea,
    input {
      border: 1px solid #eee8e8;
      resize: none;
      border-radius: 6px;
      padding: 0.6rem 1.3rem;
      font-family: inherit;
      outline: none;
      background-color: #d8cece2e;
      backdrop-filter: blur(1px);
    }

    > button {
      padding:0.3rem 0.71rem;
      background-color: #5ac0f0;
      border: none;
      box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: white;
      width: 20%;
      font-size: 1.3rem;
      cursor: pointer;

      &:hover {
        background-color: #1689be;
      }
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000036;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  display: grid;
  place-items: center;
  font-family: inherit;
  z-index: 10;
`;
