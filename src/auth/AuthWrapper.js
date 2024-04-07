import { createContext, useContext, useState } from "react";
import React, { useEffect } from "react";
import {  RenderRoutes } from "../components/structure/RenderNavigation";
import { useNavigate } from "react-router-dom";
import {get,post} from '../context/rest'

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
     const navigate = useNavigate();
     const [ user, setUser ] = useState({id:"",name: "", isAuthenticated: false})

     const login = async (userName, password) => {

          // var loginData = { adminUserName: 'purveshpardeshi@gmail.com', adminPassword:'purveshpardeshi' }
          var loginData = { adminUserName: userName, adminPassword:password }
          
          var data = await post('admin/login',loginData);
          console.log(data);
          if(data){
               return new Promise((resolve, reject) => {
                         setUser({id:data.adminId,name: data.adminFirstName, isAuthenticated: true})
                         localStorage.setItem('user', JSON.stringify({id:data.adminId,name: data.adminFirstName, isAuthenticated: true}));
                         resolve("success");
               })
          }
          else{
               return new Promise((resolve, reject) => {
                    reject("Failed");
          })
          }
     }
     const logout = () => {
          setUser({...user, isAuthenticated: false})
          localStorage.removeItem('user');
          navigate("/");
     }

     useEffect(() => {
          // Check if user data exists in localStorage
          const storedUser = localStorage.getItem('user');
          console.log("user",user);
          if (storedUser) {
            // If user data exists, set it in state
            setUser(JSON.parse(storedUser));
          }
        }, []);

     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
          
     )

}