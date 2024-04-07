import React, { useState, useEffect } from "react";
import { AuthData } from "../../auth/AuthWrapper"
import { RenderMenu } from "../structure/RenderNavigation";
import FormContainer from '../../components/common/form-container';
import '../../css/table.css';

export const Account = () => {

     const { user } = AuthData();
     const style = {
          overflowX:'hidden',
     }

     return (
          <div className="page">
               <RenderMenu />
               {/* <h2>Your Account</h2>
               <p>Username: {user.name}</p> */}
               <FormContainer></FormContainer>
               {/* <DisplayProfileDetails></DisplayProfileDetails> */}
          </div>
     )
}