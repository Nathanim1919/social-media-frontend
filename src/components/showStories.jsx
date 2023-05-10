import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLaugh, faHeart, faSadTear } from "@fortawesome/free-solid-svg-icons";

export default function ShowStories(props) {
  return (
    <Container>
      <CloseButton onClick={() => props.setdisplayStories(false)}>
        <AiOutlineClose />
      </CloseButton>

      <Stories
        options={{
          arrows: true,
          type: "slide",
          perPage: 1,
          perMove: 1,
          gap: "2rem",
          pagination: true,
        }}
      >
        {props.stories.map((story) => (
          <Story key={story.id}>
            <img src={story.image} alt="" />
            <Userinfo>
              <div>
                <img src={story.user.profile} alt="" />
              </div>
              <div>
                <h5>{story.user.name}</h5>
              </div>
            </Userinfo>

            <div>
              {/* <FontAwesomeIcon icon={faLaugh} />
              <FontAwesomeIcon icon={faHeart} />
              <FontAwesomeIcon icon={faSadTear} /> */}
            </div>
          </Story>
        ))}
      </Stories>
    </Container>
  );
}

const Userinfo = styled.div`
border-bottom: 1px solid #fff;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.81),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.00003)
  );
  padding:.1rem 1rem;
  color: white;
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
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(NavLink)`
  position: absolute;
  top: 1rem;
  right: 3rem;
  color: #fff;
  font-size: 2rem;
`;

const Stories = styled(Splide)`
  width: 30%;
  height: 90vh;

  .splide__arrow {
    display: none;
  }

  .splide__pagination {
    bottom: 2rem;
  }

  .splide__pagination__page.is-active button {
    background-color: #fff;
  }
`;

const Story = styled(SplideSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 90vh;
  border-radius: 20px;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
