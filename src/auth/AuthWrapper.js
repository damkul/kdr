import { createContext, useContext, useState } from "react";
import {  RenderRoutes } from "../components/structure/RenderNavigation";
import {get,post} from '../context/rest'

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {

     const [ user, setUser ] = useState({name: "", isAuthenticated: false})

     const login = async (userName, password) => {

          var loginData = { adminUserName: 'purveshpardeshi@gmail.com', adminPassword:'purveshpardeshi' }
          
          var data = await post('admin/login',loginData)
          if(data){
               return new Promise((resolve, reject) => {
                         setUser({name: data.adminFirstName, isAuthenticated: true})
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
     }


     return (
          
               <AuthContext.Provider value={{user, login, logout}}>
                    <>
                         <RenderRoutes />
                    </>
                    
               </AuthContext.Provider>
          
     )

}