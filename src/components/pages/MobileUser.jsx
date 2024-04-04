import React, { useState, useEffect } from "react";
import { RenderMenu } from "../structure/RenderNavigation";
import DataTable from '../common/dataTable';
import {get, post,put,deleteItem} from '../../context/rest';
import { Link} from "react-router-dom";
import { Badge,Tooltip, Space,Typography, Button,Input, DatePicker,Spin,Select} from "antd";
import { FormOutlined, EditOutlined, DeleteOutlined, DownloadOutlined,FieldTimeOutlined,PrinterOutlined,SearchOutlined,CloseCircleOutlined } from "@ant-design/icons";
import Search from "antd/es/transfer/search";
import '../../css/survey.css'
import '../../css/table.css'
import Popup from '../common/popup'
import {capitalizeFirstLetter,validateNumbersOnly,validateEmail,validatePhoneNumber} from '../common/validations'
import { usernamelabel,addMobileUserPopupLabel,firstNameLabel,lastNameLabel,phoneNumberLabel,emailLabel,genderLabel,dobLabel,passwordLabel,updateMobileUserPopupLabel,addMobileUserLabel } from "../../language/marathi";
import moment from "moment";

const { Text } = Typography;

const MobileUser = () => {

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [mobileUsers, setMobileUsers] = useState(false);
  const[isDataLoaded,setIsDataLoaded] = useState(true);
  const[isEditForm,setIsEditForm] = useState(true);

  // form data

  const [firstName,setFirstName] = useState();
  const [lastName,setLastName] = useState();
  const [phoneNumber,setPhoneNumber] = useState();
  const [gender,setGender] = useState();
  const [email,setEmail] = useState();
  const [username,setUsername] = useState();
  const [password,setPassword] = useState();
  const [dob,setDob] = useState();
  const [id,setId] = useState();

  // Validations
  const [emailInvalidMsg,setEmailInvalidMessage] = useState(false)
  const [contactInvalidMsg,setContactInvalidMessage] = useState(false)

  const [searchText, setSearchText] = useState("");
  const [initialData,setInitialData] = useState([]); 

  const [isMobileUserAdded, setIsMobileUserAdded] = useState("");
  const [isMobileUserUpdated, setIsMobileUserUpdated] = useState("");

  const [errorMsg,setErrorMsg] = useState(false);

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
      setContactInvalidMessage(false);
    }
     else{
      setContactInvalidMessage(true);
      setPhoneNumber()
     }
      
  }
  function handleGenderChange(value){
    console.log(value);
      setGender(value)
  }
  function handleEmailChange(event){
    var isValidEmail = validateEmail(event.target.value)
    if (isValidEmail) {
      setEmail(event.target.value)
      setEmailInvalidMessage(false);
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
  function handleDobChange(event){
      setDob(event.toDate())
  }

  function formatDateMM(date){
    let today = new Date(date);
   
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today =yyyy + '/'   + mm  + '/' + dd  ;
    return today;
  }

  const handleOpenPopup = (mobileUSer) => {
    setFirstName(mobileUSer.mobileAppUserFirstName);
    setLastName(mobileUSer.mobileAppUserLastName);
    setPhoneNumber(mobileUSer.mobileAppUserPhoneNumber);
    setEmail(mobileUSer.mobileAppUserEmailId);
    setDob(mobileUSer.mobileAppUserDoB);
    setPassword(mobileUSer.mobileAppUserPassword);
    setUsername(mobileUSer.mobileAppUserUserName);
    setGender(mobileUSer.mobileAppUserGender);
    setId(mobileUSer.mobileAppUserId)
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsMobileUserUpdated(false)
  };

  function openPopup(){
    resetPopupForm();
    setIsAddPopupOpen(true);
   }
   function resetPopupForm(){
      setDob();
      setEmail();
      setFirstName();
      setGender();
      setLastName();
      setUsername();
      setPassword();
      setPhoneNumber();
   }
   const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
    setIsMobileUserAdded(false)
  };

  useEffect(() => {
    async function fetchData() {
      try {
       var result = await get('admin/1/mobileappuser');
       console.log("companies",result);
       setIsDataLoaded(false);
        setMobileUsers(result);
        setInitialData(result);
      } catch (error) {
        console.log(error);
        console.error(error);
      }
    }
    
    fetchData();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    var formData = {
      mobileAppUserFirstName: firstName,
      mobileAppUserLastName: lastName,
      mobileAppUserDoB : formatDateMM(dob),
      mobileAppUserGender: gender,
      mobileAppUserPhoneNumber: phoneNumber,
      mobileAppUserEmailId: email,
      mobileAppUserUserName: username,
      mobileAppUserPassword: password
  }
  var result = await put(`admin/1/mobileappuser/${id}`,formData)
      if (result) {
        setIsMobileUserUpdated(true);
        var res = await get('admin/1/mobileappuser');
        setMobileUsers(res);
      }
      else{
        setErrorMsg(true);
      }
  }

 async function handleAddFormSubmit(e) {
  e.preventDefault();
      var formData = {
        mobileAppUserFirstName: firstName,
        mobileAppUserLastName: lastName,
        mobileAppUserDoB : formatDateMM(dob),
        mobileAppUserGender: gender,
        mobileAppUserPhoneNumber: phoneNumber,
        mobileAppUserEmailId: email,
        mobileAppUserUserName: username,
        mobileAppUserPassword: password
    }
    var result = await post('admin/1/mobileappuser',formData);
   if (result) {
    setIsMobileUserAdded(true);
    var res = await get('admin/1/mobileappuser');
    setMobileUsers(res);
   }
   else{
    setErrorMsg(true);
  }
  }

  const handleSearch = (searchInput) => {
    // Perform filtering logic based on your requirements
    const filteredData = mobileUsers.filter(item =>
      item.mobileAppUserFirstName.toLowerCase().includes(searchInput.toLowerCase()) || 
      item.mobileAppUserLastName.toLowerCase().includes(searchInput.toLowerCase())  
    );
    setMobileUsers(filteredData);
  };
  const handleClear = () => {
    setSearchText('');
    setMobileUsers(initialData); // Resetting to initial data when clearing search
  };


  const FilterByFirstNameInput = (
    <Space style={{ display: "flex", justifyContent: "space-between" }}>
      <Text style={{color:'#fff'}}>नेम</Text>
      <Input.Search
        placeholder="नेम"
        // enterButton={<SearchOutlined  style={{color:'yellow'}}/>}
        // allowClear
        value={searchText}
        onSearch={handleSearch}
        onChange={(e) => setSearchText(e.target.value)}
        suffix={searchText && <CloseCircleOutlined onClick={handleClear} />}
      />
    </Space>
  );

  const columns = [
    {
      // title: FilterByNameInput,
      title:FilterByFirstNameInput,
      dataIndex: "mobileAppUserFirstName",
      key: "mobileAppUserFirstName",
      width:"20%",
      // sorter: (a, b) => a.name > b.name,
      render: (text,record) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{record.mobileAppUserFirstName + " " + record.mobileAppUserLastName}</Text>
        </Tooltip>
      ),
    },
    {
      title: "फोन नंबर",
      dataIndex: "mobileAppUserPhoneNumber",
      key: "mobileAppUserPhoneNumber",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "Birth Date",
      dataIndex: "mobileAppUserDoB",
      key: "mobileAppUserDoB",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{formatDate(text)}</Text>
        </Tooltip>
      ),
    },
    {
      title: "ई-मेल",
      dataIndex: "mobileAppUserEmailId",
      key: "mobileAppUserEmailId",
      width: "15%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    {
      title: "जेन्डर",
      dataIndex: "mobileAppUserGender",
      key: "mobileAppUserGender",
      width: "8%",
      // sorter: (a, b) => a.name > b.name,
      render: (text) => (
        <Tooltip title={text}>
          <Text ellipsis={true}>{text}</Text>
        </Tooltip>
      ),
    },
    // {
    //   title: "स्टेटस",
    //   dataIndex: "mobileAppUserIsActive",
    //   key: "mobileAppUserIsActive",
    //   width: "5%",
    //   // sorter: (a, b) => a.name > b.name,
    //   render: (text) => (
    //     <Tooltip title={text}>
    //       {/* <Text ellipsis={true}>{text}</Text> */}
    //       { text == 1 ?  <Badge status="success" text="Active" /> :  <Badge status="error" text="In-active" />}
    //     </Tooltip>
    //   ),
    // },
    {
      title: "ऍक्शन",
      dataIndex: "actions",
      key: "actions",
      width: "5%",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
          <a href="javascript:;" onClick={() => handleOpenPopup(record)}>
           <EditOutlined></EditOutlined>
          </a>
          </Tooltip>
          <Tooltip title="Delete company">
          <a href="javascript:;" onClick={() => deleteRecord(record)}>
          <DeleteOutlined/>
          </a>
          </Tooltip>
        </Space>
      ),
    }
  ];

  async function deleteRecord(mobileUser){
    var result = await deleteItem(`admin/1/mobileappuser/${mobileUser.mobileAppUserId}`);
    var res = await get('admin/1/mobileappuser');
    setMobileUsers(res);
  }

  function formatDate(date){
    let today = new Date(date);
   
    let dd = today.getDate();
    let mm = today.getMonth() + 1;

    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }

  const handleAddPopupCancel = () => {
    setIsAddPopupOpen(false);
  }
  const handleCancel = () => {
    setIsPopupOpen(false);
  }

  const addMobileUser = () =>{
    return(
      <div>
      <form onSubmit={(e)=> handleAddFormSubmit(e)}> 
          <div className="popup-header">
          <label>{addMobileUserPopupLabel}</label>
          <button onClick={handleCloseAddPopup} className="btn popup-close-btn">X</button>
          </div>
          <div className="popup-body">
          { isMobileUserAdded && <div className="long-msg">मोबाईल युजर ऍड झाला आहे!</div>}
          { errorMsg && <div className="long-msg error-msg">मोबाईल युजर ऍड होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
            <div className="rate-container first">
            <div className="input-container mobile-user-input">
              <label htmlFor="input2">{firstNameLabel}</label>
              <Input value={firstName} className="form-input" onChange={handleFirstNameChange}/>
            </div>
            <div className="input-container mobile-user-input">
            <label htmlFor="input1">{lastNameLabel}</label>
              <Input value={lastName} className="form-input" onChange={handleLastNameChange}></Input>
            </div>
              </div>
              <div className="rate-container">
              <div className="input-container mobile-user-input">
            <label htmlFor="input1">{phoneNumberLabel}</label>
              <Input value={phoneNumber} className="form-input" onChange={handlePhoneNumberChange}></Input>
              { contactInvalidMsg && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{emailLabel}</label>
              <Input type='text' value={email}  id="input1" onChange={handleEmailChange} />
              { emailInvalidMsg && <span className="validation-msg">बरोबर ई-मेल आयडी लिहा!</span>}
            </div>
              </div>
            <div className="rate-container">
            <div className="input-container mobile-user-input mb-usr-flx">
              <label htmlFor="input1">{genderLabel}</label>
              <Select 
                    value={gender}
                    onChange={handleGenderChange}
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' }
                    ]}
                    />
            </div>
            <div className="input-container mobile-user-input mb-usr-flx">
              <label htmlFor="input1">{dobLabel}</label>
              <DatePicker htmlFor="input1"  onChange={handleDobChange} className="date"></DatePicker>
              </div>
            </div>
            
            <div className="rate-container">
            
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{usernamelabel}</label>
              <Input type='text' value={username}  id="input1" onChange={handleUsernameChange}/>
            </div>
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{passwordLabel}</label>
              <Input type='password' value={password}  id="input1" onChange={handlePasswordChange}/>
            </div>
            </div>
           
            <p id="success-message" className="success-message"></p>
            <div className="btn-container">
             <button type="submit" className="btn popup-btn">Save</button>
             <button type="submit" className="btn popup-btn-sec" onClick={handleAddPopupCancel}>Cancel</button>
          </div>
          </div>
     </form>
    </div>
    )
  }

  function updateMobileUser(){
    return(
      <div>
      <form onSubmit={(e)=> handleFormSubmit(e)}> 
          <div className="popup-header">
          <label>{updateMobileUserPopupLabel}</label>
          <button onClick={handleClosePopup} className="btn popup-close-btn">X</button>
          </div>
          <div className="popup-body">
          { isMobileUserUpdated && <div className="long-msg">मोबाईल युजर अपडेट झाला आहे!</div>}
          { errorMsg && <div className="long-msg error-msg">मोबाईल युजर अपडेट होऊ शकत नाही. कृपया थोड्या वेळाने प्रयत्न करा!!</div>}
            <div className="rate-container first">
            <div className="input-container mobile-user-input">
              <label htmlFor="input2">{firstNameLabel}</label>
              <Input value={firstName} className="form-input" onChange={handleFirstNameChange}/>
            </div>
            <div className="input-container mobile-user-input">
            <label htmlFor="input1">{lastNameLabel}</label>
              <Input value={lastName} className="form-input" onChange={handleLastNameChange}></Input>
            </div>
              </div>
              <div className="rate-container">
              <div className="input-container mobile-user-input">
            <label htmlFor="input1">{phoneNumberLabel}</label>
              <Input value={phoneNumber} className="form-input" onChange={handlePhoneNumberChange}></Input>
              { contactInvalidMsg && <span className="validation-msg">फक्त अंक लिहा!</span>}
            </div>
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{emailLabel}</label>
              <Input type='text' value={email}  id="input1" onChange={handleEmailChange} />
              { emailInvalidMsg && <span className="validation-msg">बरोबर ई-मेल आयडी लिहा!</span>}
            </div>
              </div>
            <div className="rate-container">
            <div className="input-container mobile-user-input mb-usr-flx">
              <label htmlFor="input1">{genderLabel}</label>
              <Select 
                    value={gender}
                    onChange={handleGenderChange}
                    options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' }
                    ]}
                    />
            </div>
            <div className="input-container mobile-user-input mb-usr-flx">
              <label htmlFor="input1">{dobLabel}</label>
              <DatePicker htmlFor="input1"  onChange={handleDobChange} className="date" defaultValue={moment(dob)}></DatePicker>
              </div>
            </div>
            
            <div className="rate-container">
            
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{usernamelabel}</label>
              <Input type='text' value={username}  id="input1" onChange={handleUsernameChange}/>
            </div>
            <div className="input-container mobile-user-input">
              <label htmlFor="input1">{passwordLabel}</label>
              <Input type='password' value={password}  id="input1" onChange={handlePasswordChange}/>
            </div>
            </div>
            <div className="btn-container">
             <button type="submit" className="btn popup-btn">Save</button>
             <button type="submit" className="btn popup-btn-sec" onClick={handleCancel}>Cancel</button>
          </div>
          </div>
     </form>
    </div>
    )
  }

  return (
    <div className="page">
    <RenderMenu />
    <div className="header-container" style={{marginLeft:'20%'}}>
        <div>
            <h3 style={{color:'white'}}>मोबाईल यूजर  लिस्ट</h3>
        </div>
            <div className="btn-container">
              {/* <button className="btn"><i className="fa-solid fa-hourglass-half"></i> Generate Minutes</button> */}
                <Link onClick={openPopup}><button className="btn"><i className="fa-solid fa-plus icon"></i>{addMobileUserLabel}</button></Link>
            </div>
        </div>
    <DataTable dataSource={mobileUsers} columns={columns}></DataTable>
    {isAddPopupOpen  && (
             <div className="popup-overlay">
             <Popup  generateForm={addMobileUser}/>
         </div>
           
          )}
          {isPopupOpen  && (
             <div className="popup-overlay">
             <Popup generateForm={updateMobileUser}/>
         </div>
           
          )}
</div>
  )
}

export default MobileUser