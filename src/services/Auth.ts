import { settings } from "./settings";
import axios from 'axios';

const  setAuthToken = (token:string) =>{
  return  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};


const AuthService = {
  async login(payload:any){
    try {
      const response = await axios.post(`${settings.url}/auth/login`, {
        ...payload,
      });
      const { accessToken, refreshToken } = await response.data;
      localStorage.setItem('accessToken', accessToken );
      localStorage.setItem('refreshToken', refreshToken);
      setAuthToken(accessToken);
      return response.data
    } catch (error) {
      console.log("error -> ", error)
      return false; 
    }
  },
 
  async refreshAccessToken() {
    try {
      let token = localStorage.getItem('refreshToken');
      const response = await axios.get(`${settings.url}/auth/refresh`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const { accessToken, refreshToken } = await response.data;
      localStorage.setItem('accessToken', accessToken );
      localStorage.setItem('refreshToken', refreshToken);
      setAuthToken(accessToken);
      return response.data
    } catch (error) {
      return error
    }
  },
  async signup(payload:any){
    
    const response = await fetch(`${settings.url}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload
      }),
    });
    const data = await response.json();
    if(response.status >= 200 &&  response.status <= 299){
      return data
    }
    return data
  },
  
  removeAuthToken(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = "/"
  }
}

export default AuthService;