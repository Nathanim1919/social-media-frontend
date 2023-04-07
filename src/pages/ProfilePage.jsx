import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import Loading from "../components/Loading";
import { FiEdit3 } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayFollowers, setDisplayFollowers] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      const Singleuser = await axios.get(`http://localhost:5000/user/${id}`);
      setUser(Singleuser.data);
      setIsLoading(false);
    };
    getUser();
  }, [id]);

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
            <p>{user.profesion}</p>
          </UserInfo>
          <Buttons>
            <NavLink to={`/user/${user._id}/startchat`}>start message</NavLink>
          </Buttons>
          <Editprofile>
            <NavLink>
              edit profile <FiEdit3 />
            </NavLink>
          </Editprofile>
        </ProfileUser>

        <Infos>
          <UserPosts>
            {user.blogPosts.length > 0 ? (
              user.blogPosts.map((post) => (
                <NavLink>
                  <Post>
                    <img src={post.photo} alt="" />
                    <h1>{post.title}</h1>
                  </Post>
                </NavLink>
              ))
            ) : (
              <p>Empty blogPosts</p>
            )}
          </UserPosts>
          <Followers>
            <Links>
              <NavLink
                onClick={() => setDisplayFollowers(true)}
                activeClassName="activeLink"
              >
                Followers
              </NavLink>
              <NavLink onClick={() => setDisplayFollowers(false)}>
                Following
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
                          <p>{user.profesion}</p>
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
                          <p>{user.profesion}</p>
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

const Editprofile = styled.div`
  margin-top: 2rem;

  > a {
    padding: 0.4rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    text-decoration: none;
    background: linear-gradient(45deg, #ff8a00, #e52e71);
    color: white;
    border-radius: 50px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    transition: 0.4s ease;
    text-shadow:0 10px 10px rgba(0,0,0,.2);

    &:hover {
      background: linear-gradient(45deg, #e52e71, #ff8a00);
      color: #ffffff;
    }
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  background-color: #82abf7;
  > * {
    text-decoration: none;
    color: #fffefe;

    .activeLink {
      background-color: red;
    }
  }
`;
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
    height: 300px;
  }
`;
const Userinf = styled.div`
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
      height:100%;
      object-fit:cover;
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
const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
`;
const ProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 0rem;
  background-color: #f4faea;
  max-height: 300px;
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
    width: 150px;
    height: 150px;
    object-fit: cover;

  }
`;
const UserInfo = styled.div`
  margin-top: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  > * {
    margin: 0;
  }
  > p {
    color: #494747;
  }
`;

const Buttons = styled.div`
  > * {
    font-size: 0.9rem;
    padding: 0.3rem 0.5rem;
    text-decoration: none;
    background:#ffffff;
    color: #252525;
    border-radius: 20px;

    display: grid;
    place-items: center;

    &:hover{
      background-color: #43abff;
      color:white;
    }
  }
`;
const CoverImage = styled.div`
  background-color: #eee;
  width: 100%;
  overflow: hidden;
  height: 100px;

  > img {
    width: 100%;
    height:100%;
    object-fit:cover;
  }
`;

const Infos = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 50% 50%;
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
