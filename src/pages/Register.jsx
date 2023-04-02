import React from "react";
import styled from "styled-components";
import signin from "../images/b1.jpg";
import { BiArrowBack } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profesion, setProfesion] = useState("");
  const [profile, setProfile] = useState("");

  const navigate = useNavigate();

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const profilepic = await toBase64(profile);
      const { data } = await axios.post(
        "http://localhost:5000/auth/register",
        {
          name,
          password,
          email,
          profesion,
          profilepic,
        },
        {
          withCredentials: true,
        }
      );

      if (data) {
        if (data.errors) {
          const { name, email, password, profesion, profilepic } = data.errors;

          if (name) {
            generateError(name);
          } else if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          } else if (profilepic) {
            generateError(profilepic);
          } else if (profesion) {
            generateError(profesion);
          } else {
            toast.error("An error occured while creating user!");
          }
        } else {
          toast.success("User successfully created", {
            onClose: () => {
              setTimeout(() => {
                navigate("/login");
              }, 3000);
            },
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred while creating user");
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
        </Image>
        <Formcontent>
          <form onSubmit={handleSubmit}>
            <label htmlFor="profile"></label>
            <input
              type="file"
              id="profile"
              hidden
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              name="profesion"
              type="text"
              id="profesion"
              placeholder="Profesion"
              onChange={(e) => setProfesion(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
          <p>
            already have an account?
            <NavLink to={"/login"}>log in</NavLink>
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
  place-items: start;
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
    width: 60%;
    gap: 1rem;
    border-radius: 10px;
    background-color: #fff;

    label {
      width: 100px;
      height: 100px;
      background-color: #eee;
      border-radius: 50%;
      place-self: center;
      margin-bottom: 2rem;
      cursor: pointer;
    }

    input {
      width: 100%;
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
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const Formcontent = styled.div`
  margin-top: 3rem;
  display: grid;
  place-items: start;
  padding: 0;
  height: 60%;
  > * {
    width: 90%;
  }
  gap: 0;
`;
