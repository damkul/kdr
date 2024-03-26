import React, { useState, useEffect } from "react";
import { PageHeading } from './headings';
import { Select,Input } from 'antd';
import {get, post,put} from '../../context/rest';
import Popup from '../common/popup'
import { Option } from "antd/es/mentions";
import { validateEmail,validatePhoneNumber } from "../common/validations";
import {genderLabel,firstNameLabel,lastNameLabel,phoneNumberLabel,dareNumberLabel,totalLandLabel,updateMemberPopupLabel,addMemberPopupLabel,gatNumberLabel,addMemberLabel, emailLabel, usernamelabel, passwordLabel} from '../../language/marathi'

const FormContainer = ({text}) => {
    const boxStyle = {
    // height:'80vh',
    width:'30vw',
    padding:'3rem 2rem',
    // backgroundColor:'#E8F8F5',
    marginLeft:'40%',
    borderRadius:'10px', 
    background: 'rgba(232, 248, 245, 0.5)'   
}
const headingStyle = {
    width:'100%',
    backgroundColor:'#0C5546',
    padding:'3.5rem 0',
    borderTopLeftRadius:'40px',
    borderTopRightRadius:'40px',
}
const avatarStyle = {
    width:80,
     height:80,
     top:10,
     left:9,
    //  marginLeft:'43%',
     position: 'absolute'
    }

  // Form Data
  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [gender,setGender] = useState();
  const [email,setEmail] = useState();
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();

  // messages
  const [emailInvalidMsg,setEmailInvalidMessage] = useState(false)
  const [contactInvalidMsg,setContactInvalidMessage] = useState(false)

  function handleFirstNameChange(event){
      setFirstName(event.target.value)
  }
  function handleLastNameChange(event){
      setLastName(event.target.value)
  }
  function handlePhoneNumberChange(event){
    var isValidNumber = validatePhoneNumber(event.target.value);
    if (isValidNumber) {
      setPhoneNumber(event.target.value)
      setContactInvalidMessage();
    }
     else{
      setContactInvalidMessage(true);
      setPhoneNumber()
     }
  }
  function handleGenderChange(value){
      setGender(value)
  }
  function handleEmailChange(event){
    var isValidEmail = validateEmail(event.target.value)
    if (isValidEmail) {
      setEmail(event.target.value)
      setEmailInvalidMessage();
    }
     else{
      setEmailInvalidMessage(true);
      setEmail()
     }
  }
  function handleUsernameChange(event){
      setUsername(event.target.value)
  }
  function handlePasswordChange(event){
      setPassword(event.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/profile');
        setUserData(result)
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
    
    fetchData();
  }, []);

  function setUserData(userData) {
        console.log(userData);
        setEmail(userData.adminEmailId);
        setFirstName(userData.adminFirstName);
        setGender(userData.adminGender);
        setLastName(userData.adminLastName);
        setPhoneNumber(userData.adminPhoneNumber);
        setUsername(userData.adminUserName);
        setPassword(userData.adminPassword);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    var formData = {
        adminFirstName: firstName,
        adminLastName: lastName,
        adminPhoneNumber: phoneNumber,
        adminGender: gender,
        adminEmailId: email,
        adminUserName: username,
        adminPassword: 'purveshpardeshi1'
    }
    var result = await put(`admin/1/profile`,formData);
    if (result) {
        var msg = document.getElementById('success-msg');
        msg.classList.remove('msg-hide');
    }
  }
  return (
    <div className='page' style={boxStyle}>
        <div className='heading'>
            <h3>अकाउंट डिटेल्स</h3>
        </div>
        <div className='form-container'>
            <p className="success-msg msg-hide" id="success-msg">Data Updated Successfully!</p>
            <form onSubmit={(e)=> handleFormSubmit(e)}> 
            <div className="input-container">
              <label htmlFor="input2">{firstNameLabel}</label>
              <Input value={firstName} className="form-input" onChange={handleFirstNameChange}/>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{lastNameLabel}</label><br></br>
              <Input value={lastName} onChange={handleLastNameChange}></Input>
            </div>
            <div className="input-container">
            <label htmlFor="input1">{phoneNumberLabel}</label><br></br>
              <Input value={phoneNumber}  onChange={handlePhoneNumberChange}></Input>
              { contactInvalidMsg && <span>Please enter valid phone number!</span>}
            </div>
            <div className="input-container select-gender">
              <label htmlFor="input1">{genderLabel}</label>
              <Select
                    value={gender}
                    style={{ width: '100%' }}
                    onChange={handleGenderChange}
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        // { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                    />
            </div>
            <div className="input-container">
              <label htmlFor="input1">{emailLabel}</label>
              <Input type='email' value={email} onChange={handleEmailChange} />
              {
                emailInvalidMsg && <span>Please enter valid email address!</span>
              }
              
            </div>
            <div className="input-container">
              <label htmlFor="input1">{usernamelabel}</label>
              <Input type='text' value={username} onChange={handleUsernameChange}/>
            </div>
            <div className="input-container">
              <label htmlFor="input1">{passwordLabel}</label>
              <Input type='password' value={password} onChange={handlePasswordChange}/>
            </div>
            <div className="btn-container">
             <button type="submit" className="btn popup-btn">Update</button>
             <button type="submit" className="btn popup-btn-sec">Cancel</button>
          </div>
          </form>
        </div>
        </div>
  )
}

export default FormContainer