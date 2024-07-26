import { useEffect, useState } from 'react'
import AuthService from '@/services/Auth';
import { useNavigate } from 'react-router-dom';

import { userAction } from './redux/actions/user.action';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import Home from './pages/Home';


function ProtectedRoute({children}: any) {
  const [isAuth, setIsAuth] = useState(1);
  const [rolUsers, setrolUsers] = useState(localStorage.getItem('rol'));
  let dispatch:any = useDispatch();
  let nevigate = useNavigate();

  const validSession = () => {
    AuthService.refreshAccessToken()
    .then((e:any) => {
      let decode = jwtDecode(e.accessToken);
      dispatch(userAction(decode))
      setIsAuth(2);
    })
    .catch(error => nevigate('/') )
  };

  useEffect( () => {
    validSession();
  }, [] )

  if(isAuth === 1) return <div className=" h-screen w-screen flex items-center justify-center"> <h2>Cargando...</h2> </div>
  if(isAuth === 2) return <Home />
}

export default ProtectedRoute