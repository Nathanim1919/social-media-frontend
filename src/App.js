import {
  Route,
  Routes
} from 'react-router-dom';
import AddNewPost from './pages/AddNewPost';
import AllFriends from './pages/AllFriends';
import FriendProfile from './pages/FriendProfile';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PostDetail from './pages/PostDetail';
import ProfilePage from './pages/ProfilePage';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import styled from 'styled-components';
import Parentpage from './pages/Parentpage';
import ChattingPage from './pages/chat/ChattingPage';


function App() {
  return ( 
    <Container >
    <Routes>
        <Route path = "/" element = {  < Welcome/>}/>
        <Route path = "/login" element = {  < Login/>}/>
        <Route path = "/register" element = {  < Register/>}/>
        <Route path = "user/:id/startchat" element ={<ChattingPage/>}/>
        <Route Route path = "/" element = {< Parentpage/>} >
            <Route Route path = "user/:id" element = {< HomePage />} />
            <Route path = "user/:id/posts/:post_id" element = {  < PostDetail/>}/>
            <Route path = "user/:id/friends" element = {  < AllFriends/>}/>
            <Route path = "user/:id/friends/:friend_id" element = {  < FriendProfile/>}/>
            <Route path = "user/:id/addpost" element = {  < AddNewPost/>}/>
            <Route path = "user/:id/profile" element = {  < ProfilePage/>}/>
        </Route>
        <Route path = "*" element = {  < NotFound/>}/>
    </Routes>
    </Container>
  );
}
export default App;


const Container = styled.div`
    display: grid;
    place-items: center;
    margin: 0;
    overflow: hidden;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    overflow: hidden;
    max-height: 97vh;
    background-color: #fff;

    >*{
      width: 100%;
    }
`