import React, { useState } from 'react'
import styled from 'styled-components'
import {NavLink, useNavigate, useParams} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'


export default function SideBar(props) {
   
  const {id} = useParams()
  return (
    <SideBars>
        <NavLink to={`/user/${id}`}>
            <BiArrowBack/>
        </NavLink>
        <div>
            <input type="text" placeholder='Search...'/>
        </div>

        <UserContainer>
            {props.users?props.users.map(user=>(
                <NavLink>
                <UserProfile>
                    <div>
                        <img src={user.profile} alt="" />
                    </div>
                    <div>
                        <h5>{user.name}</h5>
                    </div>
                </UserProfile>
                </NavLink>
            )):"Loading..."}
        </UserContainer>
    </SideBars>
  )
}

// styled styles for the above component

const SideBars = styled.div`
background-color: #f2f8f7;
width: 100%;
height: 100vh;

>a:first-child
{
    margin: 1rem;
    font-size: 1.5rem;
}

>div:nth-child(2){
    width: 90%;
   margin-left: .21rem;
   padding: 0.5rem;
   border-bottom: 1px solid #fff;
    >input{
        padding: .7rem;
        width: 100%;
        background-color: #eee;
        border: none;
        outline: none;
    }
}
`

const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: .41rem;
    width: 91%;
    padding: 1rem;
`

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    background-color: white;
    padding: 0.3rem;
    border-radius: 5px;
    box-shadow: 0 5px 10px rgba(0,0,0,.1);

    >div:nth-child(1){
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;

        >img{
            width: 100%;
        }
    }
    >div:nth-child(2){
        display: flex;
        flex-direction: column;
        >*{
            margin: 0;
        }
        >h5{
            font-size: .79rem;
        }
        >p{
            font-size: .75rem;
            color: #5e6061;
        }
    }
`