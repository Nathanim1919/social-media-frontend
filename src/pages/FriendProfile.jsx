import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../components/Loading";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayFollowers, setDisplayFollowers] = useState(false);
  const { f_id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const Singleuser = await axios.get(`http://localhost:5000/user/${f_id}`);
      setUser(Singleuser.data);
      setIsLoading(false);
    };
    getUser();
  }, [f_id]);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <CoverImage>
        <img src={user.profile} alt="" />
      </CoverImage>

      <ProfileSection>
        <ProfileUser>
          <ProfileImage>
            <img src={user.profile} alt="" />
          </ProfileImage>
          <UserInfo>
            <h3>{user.name}</h3>
            <p>{user.profession}</p>
          </UserInfo>
          <Info>
            <p>
              {user.followers.length} <span>followers</span>
            </p>
            <p>
              {user.following.length} <span>following</span>
            </p>
          </Info>
          <Buttons>
            <NavLink>message</NavLink>
          </Buttons>
        </ProfileUser>

        <Infos>
          <UserPosts>
            {user.blogPosts ? (
              user.blogPosts.map((post) => (
                <NavLink>
                  <Post>
                    <img src={post.photo} alt="" />
                    <h1>{post.title}</h1>
                  </Post>
                </NavLink>
              ))
            ) : (
              <p>Loading posts...</p>
            )}
          </UserPosts>
          <Followers>
            <Links>
              <NavLink
                className={displayFollowers ? "active" : "notactive"}
                onClick={() => setDisplayFollowers(true)}
              >
                Followers ({user.followers && user.followers.length})
              </NavLink>
              <NavLink
                className={!displayFollowers ? "active" : "notactive"}
                onClick={() => setDisplayFollowers(false)}
              >
                Following ({user.following && user.following.length})
              </NavLink>
            </Links>

            <Friends>
              {displayFollowers ? (
                user.followers.map((user) => (
                  <NavLink>
                    <Follow>
                      <Userinf>
                        <div>
                          <img src={user.profile} alt="" />
                        </div>
                        <div>
                          <h4>{user.name}</h4>
                          <p>{user.profession}</p>
                        </div>
                      </Userinf>
                      <NavLink>message</NavLink>
                    </Follow>
                  </NavLink>
                ))
              ) : user.following ? (
                user.following.map((user) => (
                  <NavLink>
                    <Follow>
                      <Userinf>
                        <div>
                          <img src={user.profile} alt="" />
                        </div>
                        <div>
                          <h4>{user.name}</h4>
                          <p>{user.profession}</p>
                        </div>
                      </Userinf>
                      <NavLink>message</NavLink>
                    </Follow>
                  </NavLink>
                ))
              ) : (
                <p>Loading posts...</p>
              )}
            </Friends>
          </Followers>
        </Infos>
      </ProfileSection>
    </div>
  );
}

const UserPosts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.1rem;
  height: 70vh;
  width: 500px;
  place-self: center;
  padding: 0.4rem;
  padding-bottom: 4rem;
  overflow: auto;
`;
const Follow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.51rem;
  border-radius: 10px;
  padding: 0.5rem;
  background-color: #fff;
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.1);
  > {
    margin: 0;
  }
  h4 {
    font-size: 0.9rem;
  }
  p {
    font-size: 0.7rem;
  }
  > a {
    background-color: #fff;
    color: blue;
    border-radius: 30px;
    padding: 0.1rem 0.51rem;
    font-size: 0.8rem;
    border: 2px solid blue;
    text-decoration: none;
  }
`;
const Post = styled.div`
  align-items: center;
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  padding: 0.5rem;
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.1);
  > {
    margin: 0;
  }

  h1 {
    font-size: 0.9rem;
    font-weight: 400;
    padding: 1rem;
    margin-bottom: 0;
  }
  > img {
    width: 100%;
    object-fit: cover;
    /* height: 300px; */
  }
`;
const Userinf = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  > div:nth-child(1) {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;

    > h4 {
      font-size: 0.69rem;
      font-weight: 400;
    }
    p {
      font-size: 0.6rem;
      font-weight: 100;
    }

    > * {
      margin: 0;
    }
  }
`;
const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: #f7f3f3;
`;
const ProfileUser = styled.div`
  height: 100%;
  align-items: center;
  max-width: 400px;
  background-color: #ffffff;
  padding: 2rem;
  display: grid;
  place-items: center;

  >*{
    margin: 0;
  }
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #ffffff;
  position: absolute;
  z-index: 2;
  top: 7rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const UserInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  text-transform: capitalize;
  flex-direction: column;
  align-items: center;
  > * {
    margin: 0;
  }
  > p {
    color: #494747;
  }
`;
const Info = styled.div`
  position: relative;
  top: -6rem;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  color: #ffffff;
  background-color: #43a1ee;
  text-transform: capitalize;
  padding: .5rem;
  border-radius: 5px;
  box-shadow: 0 7px 15px rgba(0,0,0,0.15);
  width: 100%;
  > * {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 0;
  }
`;
const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  > * {
    font-size: 0.9rem;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    background-color: transparent;
    color: blue;
    border-radius: 20px;
    width: 70px;
    border: 1px solid blue;
    display: grid;
    place-items: center;
  }
`;
const CoverImage = styled.div`
  background-color: #eee;
  width: 100%;
  overflow: hidden;
  height: 100px;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Infos = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
`;
const Friends = styled.div`
  background-color: #fcfafa;
  height: 65vh;
  overflow: scroll;
  > * {
    background-color: white;
    text-decoration: none;
  }
`;
const Followers = styled.div`
  background-color: #fcf9f9;
  padding: 1rem;
`;
const Following = styled.div`
  background-color: red;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  border-bottom: 1px solid #ada9a981;
  > * {
    text-decoration: none;
    color: #08569e;
    font-size: 0.8rem;
    transition: 0.41s ease-in-out;
  }
  .active {
    background-color: #129fd6;
    padding: 0.3rem 0.5rem;
    color: white;
    border-radius: 5px;
    text-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
  }
  .notactive {
    color: blue;
    background-color: transparent;
    text-shadow: 0 0px 0px rgba(0, 0, 0, 0.4);
  }
`;
