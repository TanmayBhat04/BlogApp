import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials: 'include'
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  },[setUserInfo]);

  function logout() {
    fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST'
    });
    setUserInfo(null);
    alert('You have successfully logged out');
  };

  const username=userInfo?.username;

    return (
        <header>
        <Link to={"/"} className="logo">MyBlog</Link>
        <nav>
          {username?
          <>
          <span className="hello">Hello, {username}!</span>
          <Link to={"/create"}>Create New Post</Link>
          <Link onClick={logout}>Logout</Link>
          </> : 
          <>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
          </>}
        </nav>
      </header>
    );
}
