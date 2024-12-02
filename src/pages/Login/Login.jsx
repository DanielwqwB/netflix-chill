import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import { API_ENDPOINT } from '../../Api.jsx'; 
import './Login.css'
import logo from '../../assets/logo.png'

const Login = () => {

  const [signState, setSignState] = useState("Sign In")
  const navigate = useNavigate();  

  const [user, setUser] = useState(null);  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  

  /* Verify if User In Session in LocalStorage */  
  useEffect(() => {  
    const fetchUser = async () => {  
      try {  
        const response = JSON.parse(localStorage.getItem('token'));  
        setUser(response.data);  
        navigate('/Home');  
      } catch (error) {  
        navigate('/login');  
      }  
    };  
    fetchUser();  
  }, []);  

  /* Performs Login Method */  
  const handleSubmit = async (e) => {  
    e.preventDefault();  
    try {  
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, {  
        username,  
        password,  
      });  
      localStorage.setItem("token", JSON.stringify(response));  
      setError('');  
      navigate('/Home');  
    } catch (error) {  
      setError('Invalid username or password');  
    }  
  }; 

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className="login-form">
        <h1>{signState}</h1>
         <form onSubmit={handleSubmit}>  
          <div className="form-group">  
            <label htmlFor="formUsername">Username</label>  
            <input  
              type="text"  
              id="formUsername"  
              placeholder="Enter Username"  
              value={username}  
              onChange={(e) => setUsername(e.target.value)}  
              required  
            />  
          </div>  

          <div className="form-group">  
            <label htmlFor="formPassword">Password</label>  
            <input  
              type="password"  
              id="formPassword"  
              placeholder="Enter Password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)}  
              required  
            />  
          </div>  

          {error && <p className="error-message">{error}</p>}  

          <button type="submit" className="submit-button">Sign in</button>  
        </form>
        <div className="form-switch">
          {signState==="Sign In"?<p>New to Netfix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p>Already Have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
          }
          
        
        </div>
      </div>
    </div>
  )
}

export default Login