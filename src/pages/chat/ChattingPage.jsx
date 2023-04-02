import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import StartChatting from './StartChatting'
import axios from 'axios'
import styled from 'styled-components'
import Loading from "../../components/Loading";


export default function ChattingPage() {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 


  useEffect(() =>{
    const getAllUsers = async () =>{
      try {
        const users = await axios.get("http://localhost:5000/user");
        setUsers(users.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  },[])


  console.log(users)

  return (
    <Container>
      {isLoading? <Loading/>:<SideBar users = {users}/>}
      <StartChatting/>
    </Container>
  )
}

// styled components

const Container = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
`