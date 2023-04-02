import React from "react";
import styled from "styled-components";
import signin from "../images/b2.jpg";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login() {

  const [show, setShow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (data){
        if (data.errors){
          const { email, password } = data.errors;
            if (email) {
              generateError(email);
               console.log(data);
            } else if (password) {
              generateError(password);
            } else {
              toast.error("An error occurred while Login in");
               console.log(data);
            }
          } else{
             console.log(data)
             toast.success("User successfully Logged", {
              onClose: () => {
                setTimeout(() => {
                  navigate(`/user/${data.user}`)
                }, 3000);
              },
            });
          }
        }
    } catch (error) {
      toast.error("An error occurred while Loging in");
    }
  };
  return (
    <>
    <Container
      animate={{ opacity: show ? 1 : 0 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 2 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 2 } }}
    >
      <Image>
        <NavLink to={"/"}>
          <BiArrowBack />
        </NavLink>
        <img src={signin} alt="" />

        <IMagecontents>
          <div>
            <h1>Welcome Back</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem sequi architecto nemo aut blanditiis dicta quis
              adipisci maiores mollitia perferendis.
            </p>
          </div>
        </IMagecontents>
      </Image>
      <Formcontent>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
          <button type="submit">Log in</button>
        </form>
        <p>
          dont't you have account?{" "}
          <NavLink to={"/register"}>create account</NavLink>
        </p>
      </Formcontent>
    </Container>
      <ToastContainer />
      </>
  );
}

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  place-items: center;
  width: 100vw;
  gap: 2rem;
  height: 97vh;
  padding: 0rem;

  > * {
    width: 100%;
    height: 100%;
  }

  form {
    display: grid;
    place-items: start;
    font-family: inherit;
    padding: 1rem;
    gap: 1rem;
    border-radius: 10px;
    background-color: #fff;

    input {
      width: 70%;
      padding: 1rem;
      background-color: #c9c3c392;
      border: none;
      border-left: 7px solid #3cb8e9;
      border-radius: 5px;
      outline: none;
    }

    button {
      background-color: #3cb8e9;
      padding: 0.5rem 2rem;
      outline-color: transparent;
      border: none;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      color: white;
      font-family: inherit;
    }
  }

  img {
    width: 100%;
  }
`;

const Image = styled.div`
  background-color: #19a8a8;
  position: relative;
  > a {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 40px;
    height: 40px;
    color: white;
    font-size: 1.5rem;
    z-index: 3;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const Formcontent = styled.div`
  display: grid;
  place-items: center;
  padding: 0;
  height: 60%;
  > * {
    width: 90%;
  }
  gap: 0;
`;

const IMagecontents = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  display: grid;
  place-items: center;
  left: 0;
  position: absolute;
  background-color: #00000049;

  > div {
    width: 70%;
    h1 {
      color: #e5e2e2;
      letter-spacing: 15px;
      font-weight: 100;
    }

    p {
      color: #c4bdbd;
      font-weight: 100;
    }
  }
`;
