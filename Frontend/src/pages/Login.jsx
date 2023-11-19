import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isUser } = useSelector((state) => state.user);

  useEffect(() => {
    if(isUser === true){
      navigate("/");
    }
  }, [])
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;