import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePicture } from "react-icons/ai";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function Story(props) {
  const [stories, setStories] = useState([]);
  const [isStoryAddBoxOpen, setOpenBox] = useState(false);
  const [image, setImageurl] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const createStory = async () => {
    const profilepic = await toBase64(image);
    const { data } = await axios.post(
      `http://localhost:5000/posts/${props.user._id}/createStory`,
      {
        profilepic,
      },
      {
        withCredentials: true,
      }
    );
    setOpenBox(false);
  };
  useEffect(() => {
    const getStories = async () => {
      const stories = await axios.get(
        `http://localhost:5000/posts/${props.user._id}/getStories`
      );
      const story = stories.data.reverse();
      setStories(story);
    };
    getStories();
  }, [image]);

  return (
    <>
      {isStoryAddBoxOpen && (
        <>
          <Backdrop></Backdrop>
          <PostStory>
            <form>
              <p>Choose a picture to add as a story</p>
              <label htmlFor="pic">
                {" "}
                Choose
                <AiOutlinePicture />
              </label>
              <input
                onChange={(e) => setImageurl(e.target.files[0])}
                id="pic"
                type="file"
                hidden
              />
            </form>
            <Buttons>
              <button onClick={() => setOpenBox(false)}>cancle</button>
              <button onClick={() => createStory()}>post</button>
            </Buttons>
          </PostStory>
        </>
      )}
      <Stories>
        <AddStory>
          <img src={props.user.profile} />
          <Circle>
            <button onClick={() => setOpenBox(true)}>+</button>
          </Circle>
        </AddStory>

        {stories.map((story) => (
          <div>
            <img src={story.image} alt="" />
            <UserInfo>
              <Info>
                <h6>{story.user.name}</h6>
                <p>{story.user.profession}</p>
              </Info>
            </UserInfo>
          </div>
        ))}
        {/* <div></div> */}
      </Stories>
    </>
  );
}

const Info = styled.div`
  display: flex;
  flex-direction: column;

  P {
    font-size: 0.6rem;
  }

  > * {
    margin: 0;
  }
`;
const UserInfo = styled.div`
  position: absolute;
  bottom: 0rem;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  background-color: #413f3fb2;
  backdrop-filter: blur(5px);
  padding: 0.3rem 0.71rem;
`;

const Backdrop = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: #33333313;
  z-index: 10;
  backdrop-filter: blur(5px);
`;
const PostStory = styled.div`
  background-color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 13;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  > form {
    border: 1px solid #eee;
    display: grid;
    place-items: center;
    margin: 1rem;
    padding: 1rem;

    > label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      gap: 0.5rem;
      border: 1px solid #969393;
      cursor: pointer;

      &:hover {
        background-color: #ddd;
      }
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  align-items: center;
  > button {
    padding: 0.4rem 1rem;
    background-color: #6a6adf;
    border: 1px solid #c7c4c4;
    box-shadow: 0 4px 8px #eee;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
  > button:nth-child(1) {
    background-color: #ffffff;
    color: #333;
  }
`;

const Stories = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 1;
  width: 650px;
  gap: 0.51rem;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 0.5rem;
  overflow-x: auto;
  > div {
    flex: 1;
    background-color: #eee;
    width: 130px;
    height: 180px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    position: relative;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;
const AddStory = styled.div`
  position: relative;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Circle = styled.div`
  display: grid;
  place-items: center;
  border: 3px solid #fff;
  background-color: #dddddd8f;
  backdrop-filter: blur(3px);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > button {
    color: white;
    font-size: 2rem;
    background-color: transparent;
    border: none;
    outline-color: transparent;
  }
`;
