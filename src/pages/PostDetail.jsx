import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail(props) {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [commentBody, setComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        
        // fetch the information of the target post
        const { data } = await axios.get(
          `http://localhost:5000/posts/${props.postId}`
        );
        setPost(data);

        // fetch comments which are specific to this post
        const id = props.postId;
        const comment = await axios.get(
          `http://localhost:5000/posts/${id}/comments`
        );
        setComments(comment.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [props.postId, comments]);


  // add comment
  const {id} = useParams();
  const currentPostId = props.postId;

   const handleCommentSubmit = async (e) => {
     e.preventDefault();
     try {
       const comment = await axios.post(`http://localhost:5000/posts/comment`, {
         commentBody,
         id,
         currentPostId,
       });
     } catch (error) {
       console.log(error);
     }
   };

  return (
    post &&
    post.createdBy && (
      <>
        <Backdrop></Backdrop>
        <Container>
          <NavLink onClick={() => props.setPostDetail(false)}>
            <AiOutlineClose />
          </NavLink>
          <PostInfo>
            <CreaterInfo>
              <div>
                <img src={post.createdBy.profile} alt="" />
              </div>
              <div>
                <h3>{post.createdBy.name}</h3>
                <p>{post.createdBy.profesion}</p>
              </div>
            </CreaterInfo>
            <Infos>
              <Postedpic>
                <img src={post.photo} alt="" />
              </Postedpic>
              <div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            </Infos>
          </PostInfo>
          <Comments>
            <Header>Comments ({comments.length})</Header>
            <div>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <Comment>
                    <UserProfile>
                      <img src={comment.user.profile} alt="" />
                    </UserProfile>
                    <CommentBody>
                      <User>
                        <h4>{comment.user.name}</h4>
                        <h5>{comment.user.profesion}</h5>
                      </User>
                      <Body>
                        <p>{comment.body}</p>
                      </Body>
                    </CommentBody>
                  </Comment>
                ))
              ) : (
                <EmptyComment>
                  <p>be the first to write a comment...</p>
                </EmptyComment>
              )}
            </div>
            <WriteComment>
              <form onSubmit={(e) => handleCommentSubmit(e)}>
                <input
                  type="text"
                  placeholder="add comment..."
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit">post</button>
              </form>
            </WriteComment>
          </Comments>
        </Container>
      </>
    )
  );
}
const Infos = styled.div`
  position: relative;
  top: 4rem;
`;
const EmptyComment = styled.div`
  background-color: transparent;
  position: relative;
  top: 40%;
  padding: 1rem;
  text-transform: capitalize;
  font-weight: 100;
  > h3 {
    font-size: 1.2rem;
  }
`;
const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: #ddd; */
  width: 100%;
  padding: 0.4rem;
  > * {
    margin: 0;
  }
`;
const User = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.2rem;
  > h4 {
    font-size: 0.9rem;
  }
  > h5 {
    font-size: 0.65rem;
    color: #535151;
  }
  > * {
    margin: 0;
  }
`;
const Body = styled.div`
  > p {
    font-size: 0.7rem;
    color: #504c4c;
  }
`;
const UserProfile = styled.div`
  width: 70px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  > img {
    width: 100%;
  }
`;
const Comment = styled.div`
  display: flex;
  justify-content: start;
  gap: 1rem;
  background-color: #fffefe;
  padding: 0.5rem;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 5px 13px rgba(0, 0, 0, 0.1);
`;
const Comments = styled.div`
  background-color: #f8f4f4;
  display: grid;
  grid-template-rows: 50px 1fr 50px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;
const Header = styled.div`
  background-color: #ffffff;
  width: 100%;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
`;
const WriteComment = styled.div`
  background-color: #ffffff;
  display: grid;
  border: 1px solid #d6d2d2;

  > form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > input {
      padding: 0.3rem 2rem;
      border: none;
      outline: none;
    }
    > button {
      padding: 0.3rem 2rem;
      background-color: #ffffff;
      border: none;
      color: #1a1919;
      outline: none;
      cursor: pointer;
      border-radius: 30px;
      &:hover {
        background-color: #eee;
      }
    }
  }
`;
const Postedpic = styled.div`
  position: relative;
  > img {
    width: 100%;
  }
`;
const PostInfo = styled.div`
  height: 100%;
  position: relative;
  overflow-y: auto;
  padding: 1rem;
  > * {
    margin: 0;
  }
`;
const CreaterInfo = styled.div`
  width: 56%;
  display: flex;
  padding: 1rem;
  align-items: center;
  gap: 1rem;
  position: fixed;
  z-index: 10;
  backdrop-filter: blur(15px);
  background-color: #ffffff26;
  left: 0;
  top: 0;

  > div:first-child {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;

    > img {
      width: 100%;
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

const Container = styled.div`
  position: relative;
  display: grid;
  padding: 1rem;
  grid-template-columns: 60% 40%;
  width: 70vw;
  height: 90vh;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  position: fixed;
  backdrop-filter: blur(10px);
  z-index: 13;
  top: 50%;
  left: 50%;
  overflow: hidden;
  transform: translate(-50%, -50%);

  > a {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.2rem;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 13;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 63, 0.3);
`;
