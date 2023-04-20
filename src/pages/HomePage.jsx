import react from "react";
import axios from "axios";
import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import AddPost from "../components/AddPost";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { AiFillLike, AiFillHome } from "react-icons/ai";
import { FaRegCommentDots, FaUserFriends } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { BiMessageRoundedDots } from "react-icons/bi";
import PostDetail from "./PostDetail";
import Loading from "../components/Loading";
import { GrLinkNext } from "react-icons/gr";

export default function () {
  const [user, setUser] = useState({});
  const [allusers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isBox, setIsBox] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);
  const [commentBody, setCommentBody] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const [postDetail, setPostDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [displayUser, setDisplayUsers] = useState(false);

  const { id } = useParams();

  const getComments = async (post) => {
    try {
      const comment = await axios.get(
        `http://localhost:5000/posts/${post._id}/comments`
      );
      setComments(comment.data);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);

  // get all users from the database
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const alluser = await axios.get(`http://localhost:5000/user`);
        setAllUsers(alluser.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  // get all posts
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const allPosts = await axios.get(`http://localhost:5000/posts`);
        let reverseUser = allPosts.data.reverse();
        setPosts(reverseUser);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, [isBox]);

  const isFollowing = (us) => {
    return user.following && user.following.some((u) => u._id === us._id);
  };
  const isFollower = (us) => {
    return us.followers.some((u) => u._id === user._id);
  };

  const followUser = async (us) => {
    const isAlreadyFollowing = isFollowing(us);
    const isAlreadyFollower = isFollower(us);

    if (!isAlreadyFollowing) {
      user.following.push(us);
      const followedId = us._id;
      await axios.put(
        `http://localhost:5000/user/${user._id}/updateFollowing`,
        {
          following: user.following,
          followedId,
        }
      );
    } else if (isAlreadyFollowing) {
      user.following = user.following.filter(
        (followedUser) => followedUser._id !== us._id
      );
    }

    if (!isAlreadyFollower) {
      us.followers.push(user);
      await axios.put(`http://localhost:5000/user/${us._id}/updateFollowers`, {
        followers: us.followers,
      });
    } else if (isAlreadyFollower) {
      us.followers = us.followers.filter(
        (followedUser) => followedUser._id !== user._id
      );
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const comment = await axios.post(`http://localhost:5000/posts/comment`, {
        commentBody,
        id,
        currentPostId,
      });
      setAddComment(false);
    } catch (error) {
      console.log(error);
    }
  };

  // function isAlreadyLiked(e, post, user)

  function handleLike(e, post, user) {
    const hasLiked =
      post.likes && post.likes.some((like) => like._id === user._id);
    const likeIcon = e.target;

    if (hasLiked) {
      post.likes =
        post.likes && post.likes.filter((like) => like._id !== user._id);
      likeIcon.style.color = "#666262"; // change the color to your default state
    } else {
      post.likes && post.likes.push(user);
      likeIcon.style.color = "#225dff"; // change the color to your liked state
    }

    axios
      .put(`http://localhost:5000/posts/${post._id}/liked`, {
        likes: post.likes,
        user,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {postDetail && (
        <PostDetail postId={currentPostId} setPostDetail={setPostDetail} />
      )}
      <Container>
        <MobileIcon>
          <NavLink onClick={() => setDisplayUsers(false)}>
            <AiFillHome />
          </NavLink>
          <NavLink onClick={() => setDisplayUsers(true)}>
            <FaUserFriends />
          </NavLink>
        </MobileIcon>

        <Timeline>
          <div>
            <UserProfileInfos>
              <CoverPhotot>
                <img src={user.profile} alt="" />
              </CoverPhotot>
              <UserProfilePhotot>
                <img src={user.profile} alt="" />
              </UserProfilePhotot>
              <NavLink to={`/user/${user._id}/profile`}>
                <FiEdit3 />
              </NavLink>
              <WhoiAm>
                <h5>{user.name}</h5>
                <p>{user.profession}</p>
              </WhoiAm>
            </UserProfileInfos>

            <StartMessaging>
              <div>
                <h4>Start Masseging here</h4>
                <NavLink to={`/user/${user._id}/startchat`}>
                  <BiMessageRoundedDots />
                </NavLink>
              </div>
              <div>
                <div>
                  <img src={user.profile} alt="" />
                </div>

                <div>
                  <h4>{user.name}</h4>
                  <p>{user.profession}</p>
                </div>
              </div>
            </StartMessaging>
          </div>
          <div>
            <div>
              <Stories>
                <AddStory>
                  <img src={user.profile} />
                  <div>
                    <form>
                      <label for="pic">+</label>
                      <input id="pic" type="file" hidden />
                    </form>
                  </div>
                </AddStory>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </Stories>
              <Welcome>
                <InnerWel>
                  <div>
                    <h2>
                      welcome back, <span>{user.name}</span>
                    </h2>
                  </div>
                  <div>
                    <NavLink onClick={() => setIsBox(true)}>Post</NavLink>
                  </div>
                </InnerWel>
              </Welcome>
              <AllPosts>
                {posts.map((post) => (
                  <BlogPost>
                    <Creater>
                      <div>
                        <ProfileImage>
                          <img src={post.createdBy.profile} alt="" />
                        </ProfileImage>
                        <Info>
                          <h5>{post.createdBy.name}</h5>
                          <h6>{post.createdBy.profession}</h6>
                        </Info>
                      </div>
                      <NavLink
                        onClick={() => {
                          setPostDetail(true);
                          setCurrentPostId(post._id);
                        }}
                      >
                        <GrLinkNext />
                      </NavLink>
                    </Creater>
                    <PostInfo>
                      <img src={post.photo} alt="" />
                      <div>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                      </div>
                    </PostInfo>
                    <NumberofLikes>
                      <h4>{post.likes.length} likes</h4>
                      <h4
                        onClick={() => {
                          setOpenComments(!openComments);
                          setCurrentPostId(post._id);
                          getComments(post);
                        }}
                      >
                        {post.comments.length} Comments
                      </h4>
                    </NumberofLikes>
                    {currentPostId === post._id && openComments && (
                      <Comments>
                        {comments.map((comment) => (
                          <Comment>
                            <div>
                              <div>
                                <img src={comment.user.profile} alt="" />
                              </div>
                              <div>
                                <h4>{comment.user.name}</h4>
                                <p>{comment.user.profession}</p>
                              </div>
                            </div>
                            <div>
                              <p>{comment.body}</p>
                            </div>
                          </Comment>
                        ))}
                      </Comments>
                    )}

                    {currentPostId === post._id && addComment && (
                      <AddComment>
                        <ProfileImages>
                          <img src={user.profile} alt="" />
                        </ProfileImages>
                        <form onSubmit={(e) => handleCommentSubmit(e)}>
                          <input
                            onChange={(e) => setCommentBody(e.target.value)}
                            type="text"
                            placeholder="Add comment..."
                          />
                          <button type="submit">post</button>
                        </form>
                      </AddComment>
                    )}

                    <Likes>
                      {!post.likes.some((like) => like._id === user._id) && (
                        <NavLink
                          onClick={(e) => handleLike(e, post, user)}
                          style={{ color: "#bebbbb" }}
                        >
                          <AiFillLike />
                        </NavLink>
                      )}
                      {post.likes.some((like) => like._id === user._id) && (
                        <NavLink
                          onClick={(e) => handleLike(e, post, user)}
                          style={{ color: "#0b6dff" }}
                        >
                          <AiFillLike />
                        </NavLink>
                      )}
                      <NavLink
                        onClick={() => {
                          setAddComment(!addComment);
                          setCurrentPostId(post._id);
                        }}
                      >
                        <FaRegCommentDots />
                      </NavLink>
                    </Likes>
                  </BlogPost>
                ))}
              </AllPosts>
            </div>
          </div>

          <div>
            <AllUser>
              {!allusers ? (
                <Loading />
              ) : (
                allusers.map(
                  (u) =>
                    user._id !== u._id && (
                      <NavLink to={`/user/${user._id}/friends/${u._id}`}>
                        <UserInfo>
                          <div>
                            <UserProfile>
                              <img src={u.profile} alt="" />
                            </UserProfile>
                            <Info>
                              <h5>{u.name}</h5>
                              <p>{u.profession}</p>
                            </Info>
                          </div>
                          <NavLink onClick={() => followUser(u)}>
                            {isFollowing(u) ? "Unfollow" : "Follow"}
                          </NavLink>
                        </UserInfo>
                      </NavLink>
                    )
                )
              )}
            </AllUser>
          </div>
        </Timeline>
      </Container>
      {isBox && <AddPost setIsBox={setIsBox} />}
    </>
  );
}

const AddStory = styled.div`
  position: relative;
  overflow: hidden;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    > form {
      display: grid;
      place-items: center;
      border: 3px solid #fff;
      background-color: #dddddd8f;
      backdrop-filter: blur(3px);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      label {
        color: white;
        font-size: 2rem;
      }
    }
  }
`;
const StartMessaging = styled.div`
  background: linear-gradient(45deg, #2afadf, #4c83ff);

  color: white;
  box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-top: 0.6rem;
  padding: 0.51rem 0.51rem;
  text-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
  > div:nth-child(1) {
    margin-bottom: 0;
    margin-top: 0;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    > a {
      color: white;
    }
  }
  > div:nth-child(2) {
    margin-bottom: 0;
    background-color: white;
    color: #668166;
    margin-top: 0;
    display: flex;
    justify-content: start;
    gap: 1rem;
    align-items: center;
    padding: 0.4rem 1rem;
    box-shadow: 0 7px 15px rgba(0, 0, 0, 0.1);
    margin-top: 3rem;
    border-radius: 10px;

    > div:nth-child(1) {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      align-items: start;

      > * {
        margin: 0;
      }

      > p {
        font-size: 0.6rem;
      }
      > h4 {
        color: black;
        font-size: 0.8rem;
      }
    }
  }
`;

const Stories = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 1;
  gap: 0.51rem;
  margin-bottom: 1rem;
  background-color: #fff;
  padding: 0.5rem;
  > div {
    flex: 1;
    background-color: #eee;
    width: 130px;
    height: 180px;
    border-radius: 20px;
  }
`;

const Comments = styled.div`
  display: grid;
  padding: 0.51rem;
  background-color: #f3f0f0;
  gap: 1rem;
`;
const Comment = styled.div`
  display: flex;
  padding: 0.41rem;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  > * {
    margin: 0;
  }
  > div:nth-child(2) {
    color: #585656;
    font-size: 0.71rem;
  }
  > div:nth-child(1) {
    display: flex;
    justify-content: flex-start;
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
      align-items: start;

      > h4 {
        font-size: 0.9rem;
      }
      > p {
        font-size: 0.8rem;
      }

      > * {
        margin: 0;
      }
    }
  }
`;
const AllUser = styled.div`
  height: 77vh;
  overflow-y: auto;
  background-color: #eee;

  > a {
    text-decoration: none;
    color: #333;
  }
`;
const UserInfo = styled.div`
  box-shadow: 0 8px 17px rgba(0, 0, 0, 0.01);
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  align-items: start;
  background-color: white;
  padding: 0.4rem;
  margin: 0.41rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    background: linear-gradient(45deg, #2afadf, #4c83ff);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateX(-400px);
    transition: all 0.4s ease-in-out;
    z-index: -1;
    transition-timing-function: cubic-bezier();
  }
  &:hover {
    box-shadow: 0 8px 17px rgba(0, 0, 0, 0.061);
    transform: translateX(5px);
    /* background: linear-gradient(45deg, #2afadf, #4c83ff); */
    color: #fff;

    &:after {
      transform: translateX(0px);
    }

    > a {
      background-color: #ffffff;
      color: #a3b1ff;
    }
  }
  > div:first-child {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
  }
  > a {
    padding: 0.2rem 0.41rem;
    background-color: #5aa9e6;
    color: white;
    place-self: end;
    transform: scale(0.85);
    text-decoration: none;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;
const UserProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const AllPosts = styled.div`
  background-color: #ffffff;
  padding: 1rem 3rem 3rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > a {
    text-decoration: none;
    color: #333;
  }
`;
const BlogPost = styled.div`
  max-width: 500px;
  box-shadow: 0 8px 17px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 0rem;
  > * {
    margin: 0;
  }
`;
const Creater = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  > a {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #eee;
    display: grid;
    place-items: center;
  }
`;
const ProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;

  > img {
    width: 100%;
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1rem;
  overflow: hidden;
  max-height: 100vh;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  > h6 {
    font-weight: 100;
  }
  > P {
    font-size: 0.7rem;
    color: #726e6e;
  }

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }
`;
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    padding: 1rem;

    > * {
      margin: 0;
    }
  }
  > * {
    margin: 0;
  }

  > img {
    width: 100%;
  }
  > h3 {
    text-transform: capitalize;
    font-weight: 400;
  }
  > P {
    font-size: 0.89rem;
    color: #6d6969;
  }
`;
const MobileIcon = styled.div`
  display: none;
  > * {
  }
  @media only screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 2px solid #f7f3f3;
    color: #0f748d;
    width: 100%;
    padding: 0.5rem;
  }
`;
const InnerWel = styled.div`
  background-color: #ffffff;
  width: 70%;
  display: grid;
  place-items: center;
  grid-template-columns: 50% 50%;
  margin-bottom: 1rem;
  padding: 0.1rem 1rem;
  font-size: 0.79rem;
  @media only screen and (max-width: 768px) {
    font-size: 0.5rem;
    display: none;
  }

  > div:nth-child(1) {
    > * {
      margin: 0.3rem;
      font-weight: 400;
    }
    > p {
      color: #76797a;
    }
    > h2 {
      > span {
        text-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
        padding: 0.2rem 1rem;
        background: linear-gradient(45deg, #3ba7ee, #321df3);
        color: white;
        border-radius: 5px;
      }
    }
  }

  a {
    padding: 0.4rem 2rem;
    background-color: #379bf3;
    color: white;
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    border-radius: 50px;
  }
`;

const Welcome = styled.div`
 background-color: #eee;
 display: grid;
 align-items: center;
 place-items: start;
`;

const Timeline = styled.div`
  display: grid;
  background-color: #ffffff;
  grid-template-columns: 20% 50% 30%;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    place-items: center;
    overflow-y: auto;

    > div:nth-child(1) {
      display: none;
    }
    > div:nth-child(2) {
      width: 100vw;
      height: 100%;
    }
  }

  > div:nth-child(1) {
    padding: 0.5rem;
  }
  > div:nth-child(2) {
    @media only screen and (max-width: 768px) {
      ${(props) => (props.displayUser ? "grid" : "none")};
      height: 100vh;
    }
    display: grid;
    place-items: center;
    max-height: 90vh;
    overflow-y: auto;
    margin-right: 1rem;
  }
  > div:nth-child(3) {
    background-color: #ffffff;
    padding: 1rem;
    overflow: hidden;
    @media only screen and (max-width: 768px) {
      display: none;
      height: 100vh;
    }
  }
`;

const NumberofLikes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.005rem 1rem;
  border-bottom: 1px solid #eee;

  > * {
    font-size: 0.8rem;
    cursor: pointer;
    color: #3b3a3a;
  }
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const AddComment = styled.div`
  display: flex;
  padding: 0.5rem;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  form {
    display: grid;
    grid-template-columns: 80% 20%;
    width: 100%;
    border: 1px solid #333;
    border-radius: 50px;
    padding: 0.4rem 1rem;

    > input {
      padding: 0.4rem 1rem;
      background-color: transparent;
      outline: none;
      border: none;
    }
    > button {
      padding: 0.4rem;
      border: none;
      outline: none;
      background-color: #eee;
      border-radius: 30px;
      box-shadow: 0 4px 10x rgba(0, 0, 0, 0.1);
    }
  }
`;
const ProfileImages = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
const CoverPhotot = styled.div`
  background-color: #eee;
  width: 100%;
  height: 130px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const UserProfileInfos = styled.div`
  position: relative;
  max-height: 280px;
  border-radius: 10px;
  display: flex;
  box-shadow: 0 6px 13px rgba(0, 0, 0, 0.051);
  flex-direction: column;
  background-color: white;
  align-items: center;
  padding: 0;
  overflow: hidden;
  > a {
    position: absolute;
    top: 35%;
    right: 10%;
    width: 40px;
    height: 40px;
    background-color: #c4bebebc;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: white;
    backdrop-filter: blur(10px);
  }
`;
const UserProfilePhotot = styled.div`
  position: absolute;
  top: 6rem;
  z-index: 3;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 5px solid white;
  overflow: hidden;
  display: grid;
  place-items: center;
  > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const WhoiAm = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  margin-bottom: 1rem;
  align-items: center;

  > * {
    margin: 0;
  }
  > p {
    font-weight: 300;
    font-size: 0.9rem;
    color: #5c5959;
  }
`;

const Friends = styled.div`
  display: flex;
  color: #6c9bff;
  flex-direction: column;
  > * {
    margin: 0;
  }
`;
