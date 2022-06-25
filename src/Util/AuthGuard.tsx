
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthGuard = () => {
  let  auth = localStorage.getItem("auth");
  useEffect(()=>{
    auth = localStorage.getItem("auth");  
  })
  return (
    auth === "true" ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default AuthGuard