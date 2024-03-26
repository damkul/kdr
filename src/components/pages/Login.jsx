import React from 'react'
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Link from '@mui/material/Link';
import image from "../../images/login_image.png";
import '../../css/login.css'
import { email,password,loginWord,forgotPassword } from "../../language/marathi";
import { Button } from 'antd';

export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();
     const { user } = AuthData();
     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)
     const [showPassword, setShowPassword] = React.useState(false);

     const handleClickShowPassword = () => setShowPassword((show) => !show);
   
     const handleMouseDownPassword = (event) => {
       event.preventDefault();
     };
     const doLogin = async () => {

          try {
               
               await login(formData.userName, formData.password)
          
               navigate("/home")

          } catch (error) {

               setErrorMessage(error)
               
          }
          
     }

     return (

          <div className='login-card-container'>
          <div className="login-card">
            <div   className='login-form-container'>
              <h2>{loginWord}</h2>
              <p>Welcome to application name</p>
              <div  className='login-form'>
               <TextField id="outlined-basic" label={email} variant="outlined" sx={{marginTop:3,marginBottom:3,width: '38ch' }}  value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) }/>
                <FormControl sx={{marginTop:3,marginBottom:3,width: '38ch' }} variant="outlined" value={formData.password} onChange={(e) => setFormData({password: e.target.value}) }>
                  <InputLabel htmlFor="outlined-adornment-password">{password}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                <Link href="#" underline="hover" className='forgot-password-link' sx={{fontWeight:'bold',textAlign:"right"}}>
                  {forgotPassword}
                </Link>
                <button className="login-button" onClick={doLogin} >{loginWord}</button>
              </div>
            
            </div>
            <div className='login-image-container'>
              <img src={image} alt="" className='login-image'/>
            </div>
          </div>
        </div>


          // <div className="page">
          //      <h2>Login page</h2>
          //      <div className="inputs">
          //           <div className="input">
          //                <input value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) } type="text"/>
          //           </div>
          //           <div className="input">
          //                <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password"/>
          //           </div>
          //           <div className="button">
          //                <button onClick={doLogin}>Log in</button>
          //           </div>
          //           {errorMessage ?
          //           <div className="error">{errorMessage}</div>
          //           : null }
          //      </div>
          // </div>
     )
}