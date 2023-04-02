import { Outlet, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import Header2 from "../components/Header2";
import { toast, ToastContainer } from "react-toastify";

export default function () {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        try {
          const { data } = await axios.get(`http://localhost:5000/user/${id}`, {
            withCredentials: true,
          });
          setUser(data);
          console.log(data);
        } catch (error) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie, id]);

  return (
    <>
      <Header2 user={user} />
      <div>
        <Outlet />
      </div>
    </>
  );
}
